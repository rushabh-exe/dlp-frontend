import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {leftimage} from '../../../../assets/leftimageData'
import {rightimage} from '../../../../assets/rightimageData'
// Initialize pdfmake
pdfmake.vfs = pdfFonts.vfs;

function GetAllocation() {
  const [studentAllocations, setStudentAllocations] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchStudentAllocations();
  }, []);

  const fetchStudentAllocations = () => {
    axios.get(`${apikey}admin/get/student/allocation`)
      .then(response => {
        setStudentAllocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching student allocations:', error);
        toast.error('Error fetching student allocations', {position:"bottom-right"});
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${apikey}admin/get/student/allocation/${id}`)
      .then(response => {
        console.log('Allocation deleted successfully');
        toast.success('Allocation Deleted Successfully', {position:"bottom-right"});
        fetchStudentAllocations(); // Refresh the allocation list
      })
      .catch(error => {
        console.error('Error deleting student allocation:', error);
        toast.error('Error Deleting student allocations', {position:"bottom-right"});
      });
  };

  const createPdf = () => {
    if (!studentAllocations || studentAllocations.length === 0) {
      toast.error("No data available to generate PDF");
      return;
    }

    const docDefinition = {
      content: [
        {
          columns: [
            {
              image: `${leftimage}`, // Add your college logo base64 string here
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
              image: `${rightimage}`, // Add your department logo base64 string here
              width: 50,
              height: 50,
              alignment: 'center'
            }
          ]
        },
        {
          text: 'Department of Electronics and Telecommunication Engineering',
          alignment: 'center',
          fontSize: 13,
          margin: [0, 15, 0, 5]
        },
        {
          text: 'Student Allocation Details',
          alignment: 'center',
          fontSize: 12,
          margin: [0, 0, 0, 15]
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', '*'],
            body: [
              [
                { text: 'Sr.No.', style: 'tableHeader', alignment: 'center' },
                { text: 'Classroom', style: 'tableHeader', alignment: 'center' },
                { text: 'Start RollNo', style: 'tableHeader', alignment: 'center' },
                { text: 'End RollNo', style: 'tableHeader', alignment: 'center' },
                { text: 'Classname', style: 'tableHeader', alignment: 'center' }
              ],
              ...studentAllocations.map((allocation, index) => [
                { text: (index + 1).toString(), alignment: 'center' },
                { text: allocation.classroom || '', alignment: 'center' },
                { text: allocation.start || '', alignment: 'center' },
                { text: allocation.end || '', alignment: 'center' },
                { text: allocation.classname || '', alignment: 'center' }
              ])
            ]
          },
          layout: {
            hLineWidth: function(i, node) { return 1; },
            vLineWidth: function(i, node) { return 1; },
            hLineColor: function(i, node) { return '#ddd'; },
            vLineColor: function(i, node) { return '#ddd'; },
            paddingLeft: function(i) { return 10; },
            paddingRight: function(i) { return 10; },
            paddingTop: function(i) { return 5; },
            paddingBottom: function(i) { return 5; }
          }
        }
      ],
      styles: {
        headerLarge: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        headerSmall: {
          fontSize: 10,
          margin: [0, 0, 0, 3]
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          fillColor: '#f3f4f6'
        }
      },
      defaultStyle: {
        fontSize: 10
      },
      pageMargins: [40, 40, 40, 40],
      pageSize: 'A4'
    };

    try {
      const pdfGenerator = pdfmake.createPdf(docDefinition);
      pdfGenerator.getBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Student_Allocation.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });

      toast.success("PDF generated successfully");
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <div className="tableee mx-auto bg-white shadow-md rounded-lg max-w-4xl w-full overflow-hidden">
      <Toaster/>
      <section className="table_header bg-white text-xl text-center py-3">
        <h1>Student Allocation SY</h1>
        <button 
          onClick={createPdf}
          className="bg-red-500 absolute bottom-5 right-5 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
        >
          Download PDF
        </button>
      </section>
      <section id='table_body' className="table_body bg-white">
        <table className="w-full">
          <thead>
            <tr className="text-center">
              <th className="p-2 border border-gray-400">Sr.no.</th>
              <th className="p-2 border border-gray-400">Classroom</th>
              <th className="p-2 border border-gray-400">Start RollNo</th>
              <th className="p-2 border border-gray-400">End RollNo</th>
              <th className="p-2 border border-gray-400">Classname</th>
              <th className="p-2 border border-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentAllocations.map((allocation, index) => (
              <tr key={index} className="text-center hover:bg-gray-300 transition-all duration-500">
                <td className="p-2 border border-gray-400">{index + 1}</td>
                <td className="p-2 border border-gray-400">{allocation.classroom}</td>
                <td className="p-2 border border-gray-400">{allocation.start}</td>
                <td className="p-2 border border-gray-400">{allocation.end}</td>
                <td className="p-2 border border-gray-400">{allocation.classname}</td>
                <td className="p-2 border border-gray-400">
                  <button onClick={() => handleDelete(allocation.ID)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
     
    </div>
  );
}

export default GetAllocation;
