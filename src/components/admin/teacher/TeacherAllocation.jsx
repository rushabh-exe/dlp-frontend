import { useState, useEffect } from 'react';
import axios from 'axios';
import CNavlink from '../../utils/CNavlink';
import toast, { Toaster } from 'react-hot-toast';
import pdfmake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {leftimage} from '../../../assets/leftimageData'
import {rightimage} from '../../../assets/rightimageData'
pdfmake.vfs = pdfFonts.vfs;
// Base API URL
const apikey = import.meta.env.VITE_API_URL;


// Utility hook for API calls
const useApiCall = (apiUrl, method, data = null) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (method === 'POST' && !data) return; // Prevent POST request from being sent automatically

      setIsLoading(true);
      try {
        const result = method === 'GET'
          ? await axios.get(apiUrl)
          : await axios.post(apiUrl, data);
        setResponse(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiUrl, method, data]);

  return { response, error, isLoading, setResponse, setError };
};

// Main Component
function TeacherAllocation() {
  return (
    <div className='flex flex-wrap w-fit gap-5'>
      <CNavlink to='/admin/teacher/Allocation/createAllocation'>Create Allocation</CNavlink>
      <CNavlink to='/admin/teacher/Allocation/getAllocation'>Get Allocation</CNavlink>
    </div>
  );
}

// Create Teacher Allocation Component
export function CreateTeacherAllocation() {
  const apiUrl = `${apikey}admin/create/teacher/allocation`;
  const { error, isLoading, setResponse, setError } = useApiCall(apiUrl, 'POST');

  const handleCreateAllocation = async () => {
    try {
      await axios.post(apiUrl);
      toast.success("Teacher Allocation has been created", { position: 'bottom-right', });
      setTimeout(() => {
        window.location.href = "/admin/teacher/Allocation/getAllocation";
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error(
        err.response?.data?.error ||
        "Failed to create teacher allocation. Please check the console for more details.",
        { position: "bottom-right" }
      );
    } finally {
      setResponse(null);
    }
  };

  return (
    <div className='flex flex-col gap-5'>
      <Toaster />
      <div className='bg-yellow-200 p-1'>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>Click below to Create Allocation</>
        )}
      </div>
      <div
        className="bg-white text-black p-2 rounded-lg shadow-lg cursor-pointer h-fit"
        onClick={handleCreateAllocation}
      >
        <h2 className="text-2xl font-bold">Create Allocation</h2>
        <p>This creates teacher allocation</p>
      </div>
    </div>
  );
}

// Get Teacher Allocation Component with Delete functionality
export function GetTeacherAllocation() {
  const apiUrl = `${apikey}admin/get/teacher/allocation`;
  const { response, error, isLoading, setResponse } = useApiCall(apiUrl, "GET");
  const [deleteError, setDeleteError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [coTeachers, setCoTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const mainTeachers = await axios.get(
          `${apikey}admin/create/vitals/teachers/teachingStaff`
        );
        setTeachers(mainTeachers.data);

        const nonTeachingStaff = await axios.get(
          `${apikey}admin/create/vitals/teachers/nonteachingStaff`
        );
        setCoTeachers(nonTeachingStaff.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };

    fetchTeachers();
  }, []);



  const handleEditAllocation = (allocation) => {
    setEditMode(true);
    const selected = response.find((item) => item.ID === allocation.ID);
    setSelectedAllocation({ ...selected });
  };

  const handleSaveAllocation = async () => {
    setLoading(true);
    try {
      await axios.put(
        `${apikey}admin/create/teacher/allocation/${selectedAllocation.ID}`,
        selectedAllocation,
        {
          withCredentials: true,
        }
      );
      setResponse((prev) =>
        prev.map((item) =>
          item.ID === selectedAllocation.ID ? selectedAllocation : item
        )
      );
      setEditMode(false);
      setSelectedAllocation(null);
      toast.success("Allocation updated successfully", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error saving allocation:", error);
      toast.error("Error saving allocation", { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedAllocation(null);
  };

  // Function to delete a teacher allocation
  const deleteTeacherAllocation = async (id) => {
    try {
      await axios.delete(`${apikey}admin/get/teacher/allocation/${id}`);
      toast.success("Teacher Allocation has been deleted", { position: 'bottom-right' });
      // Refresh the list after deletion
      setResponse(response.filter(item => item.ID !== id));
      setDeleteError(null);
    } catch (err) {
      setDeleteError('Failed to delete teacher allocation', { position: 'bottom-right' });
      toast.error("Failed to delete teacher allocation");
    }
  };

  const handleSendMail = async (file) => {
    setLoading(true); // Set loading to true when the request starts

    const formData = new FormData();
    formData.append("file", file); // Attach file to the formData

    try {
      const response = await axios.post(`${apikey}admin/create/teacher/allocation/sendmail`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });
      console.log('Mail sent successfully:', response.data);
      toast.success("Email Sent Successfully", { position: "bottom-right" });
    } catch (error) {
      console.error('Error sending mail:', error);
      toast.error("Error Sending mail", { position: "bottom-right" });
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  const [url, setUrl] = useState(null)

  const createPdf = () => {
    if (!response || response.length === 0) {
      toast.error("No data available to generate PDF");
      return;
    }

    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 40, 40, 40],
      content: [
        {
          columns: [
            {
              image: `${leftimage}`,
              width: 50,
              height: 50,
              alignment: 'center'
            },
            {
              stack: [
                {
                  text: 'K. J. Somaiya Institute of Technology Sion, Mumbai-22',
                  style: 'headerLarge',
                  alignment: 'center'
                },
                {
                  text: 'An Autonomous Institute permanently affiliated to University of Mumbai',
                  style: 'headerSmall',
                  alignment: 'center'
                },
                {
                  text: 'Accredited by NAAC and NBA, Approved by AICTE, New Delhi',
                  style: 'headerSmall',
                  alignment: 'center'
                }
              ],
              alignment: 'center'
            },
            {
              image: `${rightimage}`,
              width: 50,
              height: 50,
              alignment: 'center'
            }
          ],
          columnGap: 10
        },
        {
          stack: [
            {
              text: 'Department of Electronics and Telecommunication Engineering',
              style: 'departmentHeader',
              alignment: 'center'
            },
            {
              text: `Even Semester ${new Date().getFullYear()}`,
              style: 'subHeader',
              alignment: 'center'
            },
            {
              text: 'Duty Chart For CLASS TEST - I',
              style: 'subHeader',
              alignment: 'center'
            }
          ],
          margin: [0, 20, 0, 20]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', '*', '*'],
            body: [
              [
                { text: 'Classroom', style: 'tableHeader', alignment: 'center' },
                { text: 'Date', style: 'tableHeader', alignment: 'center' },
                { text: 'Start Time', style: 'tableHeader', alignment: 'center' },
                { text: 'End Time', style: 'tableHeader', alignment: 'center' },
                { text: 'Main Teacher', style: 'tableHeader', alignment: 'center' },
                { text: 'Co-Teacher', style: 'tableHeader', alignment: 'center' }
              ],
              ...response.map(item => [
                { text: item.classroom || '', alignment: 'center' },
                { text: item.date || '', alignment: 'center' },
                { text: item.start_time || '', alignment: 'center' },
                { text: item.end_time || '', alignment: 'center' },
                { text: item.main_teacher || '', alignment: 'center' },
                { text: item.co_teacher || '', alignment: 'center' }
              ])
            ]
          },
          layout: {
            hLineWidth: function(i, node) { return 1; },
            vLineWidth: function(i, node) { return 1; },
            hLineColor: function(i, node) { return '#aaa'; },
            vLineColor: function(i, node) { return '#aaa'; },
            paddingLeft: function(i) { return 10; },
            paddingRight: function(i) { return 10; },
            paddingTop: function(i) { return 8; },
            paddingBottom: function(i) { return 8; }
          }
        },
        {
          text: '*All Invigilators are required to report in Lab 603 before 20 minutes of commencement of examination',
          style: 'noteText',
          margin: [0, 20, 0, 20]
        },
        {
          columns: [
            {
              stack: [
                { text: 'Test Coordinator:', style: 'signatureHeader' },
                { text: 'Ms. S', margin: [10, 5, 0, 0] },
                { text: 'Mr. A', margin: [10, 2, 0, 0] },
                { text: 'Ms. C', margin: [10, 2, 0, 0] }
              ]
            },
            {
              stack: [
                { text: 'HOD EXTC', style: 'signatureHeader', alignment: 'right' },
                { text: 'Dr. J', alignment: 'right', margin: [0, 5, 0, 0] }
              ]
            }
          ],
          margin: [0, 30, 0, 0]
        }
      ],
      styles: {
        headerLarge: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        headerSmall: {
          fontSize: 10,
          margin: [0, 0, 0, 3]
        },
        departmentHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subHeader: {
          fontSize: 12,
          margin: [0, 0, 0, 5]
        },
        tableHeader: {
          fontSize: 11,
          bold: true,
          fillColor: '#f3f4f6',
          margin: [0, 5, 0, 5]
        },
        noteText: {
          fontSize: 11,
          italics: true
        },
        signatureHeader: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 5]
        }
      },
      defaultStyle: {
        fontSize: 10
      }
    };

    try {
      const pdfGenerator = pdfMake.createPdf(docDefinition);
      pdfGenerator.getBlob((blob) => {
        const url = URL.createObjectURL(blob);
        setUrl(url);

        const link = document.createElement('a');
        link.href = url;
        const fileName = `Teacher_Allocation_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(url), 100);
      });

      toast.success("PDF generated successfully");
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <div id='table_body' className="overflow-x-auto relative">
      <Toaster />
      <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Classroom</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2">Main Teacher</th>
            <th className="px-4 py-2">Co-Teacher</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {response?.map((item, index) => (
            <tr key={index} className="bg-white">
              <td className="px-4 text-center py-2">{item?.classroom}</td>
              <td className="px-4 text-center py-2">{item?.date}</td>
              <td className="px-4 text-center py-2">{item?.start_time}</td>
              <td className="px-4 text-center py-2">{item?.end_time}</td>
              <td className="px-4 text-center py-2">
                {editMode && selectedAllocation?.ID === item.ID ? (
                  <select
                    value={selectedAllocation.Main_Teacher}
                    onChange={(e) =>
                      setSelectedAllocation((prev) => ({
                        ...prev,
                        Main_Teacher: e.target.value,
                      }))
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="">Select Main Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.ID} value={teacher.name}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  item?.main_teacher
                )}
              </td>
              <td className="px-4 text-center py-2">
                {editMode && selectedAllocation?.ID === item.ID ? (
                  <select
                    value={selectedAllocation.Co_Teacher}
                    onChange={(e) =>
                      setSelectedAllocation((prev) => ({
                        ...prev,
                        Co_Teacher: e.target.value,
                      }))
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="">Select Co-Teacher</option>
                    {coTeachers.map((teacher) => (
                      <option key={teacher.ID} value={teacher.name}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  item?.co_teacher
                )}
              </td>
              <td className="px-4 text-center py-2">
                {editMode && selectedAllocation?.ID === item.ID ? (
                  <>
                    <button
                      onClick={handleSaveAllocation}
                      className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                      disabled={loading}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white py-1 px-2 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEditAllocation(item)}
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => deleteTeacherAllocation(item?.ID)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {deleteError && <div>Error: {deleteError}</div>}
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => handleSendMail(e.target.files[0])}
        className="mb-4"
      />


      <button
        onClick={handleSendMail}
        className="pntbtn fixed bottom-5 right-10 bg-red-800 text-white w-fit p-2"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Mail'}
      </button>
      {/* <Generatepdf/> */}
      <button
        onClick={createPdf}
        className="pntbtn fixed bottom-5 right-40 bg-red-800 text-white w-fit p-2"
      >
        Generate PDF
      </button>

      {/* Fullscreen Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg">Processing...</div>
        </div>
      )}
    </div>
  );
}
export default TeacherAllocation;
