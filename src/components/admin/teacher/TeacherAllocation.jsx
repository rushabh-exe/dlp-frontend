import { useState, useEffect } from 'react';
import axios from 'axios';
import CNavlink from '../../utils/CNavlink';
import toast, { Toaster } from 'react-hot-toast';
import PrintButton from '../../utils/PrintButton';

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
  const {  error, isLoading, setResponse, setError } = useApiCall(apiUrl, 'POST');

  const handleCreateAllocation = async () => {
    try {
      await axios.post(apiUrl);
      toast.success("Teacher Allocation has been created",{position: 'bottom-right',});
      setTimeout(() => {
        window.location.href = "/admin/teacher/Allocation/getAllocation";
      }, 2000);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to create teacher allocation",{position: 'bottom-right',});
    } finally {
      setResponse(null); // Reset response to avoid automatic reload
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
  const { response, error, isLoading, setResponse } = useApiCall(apiUrl, 'GET');
  const [deleteError, setDeleteError] = useState(null);
  const [loading, setLoading] = useState(false);

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
              <td className="px-4 text-center py-2">{item?.main_teacher}</td>
              <td className="px-4 text-center py-2">{item?.co_teacher}</td>
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
      <PrintButton contentId={'table_body'} />
      <input
  type="file"
  accept="application/pdf"
  onChange={(e) => handleSendMail(e.target.files[0])}
  className="mb-4"
/>


      <button
        onClick={handleSendMail}
        className="pntbtn fixed bottom-5 left-40 bg-red-800 text-white w-fit p-2"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Mail'}
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
