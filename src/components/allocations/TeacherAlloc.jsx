import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeacherAlloc() {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:9876/getTeacherAlloc')
      .then((response) => {
        setAllocations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const printTable = () => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(`
      body * {
        visibility: hidden;
      }
      
      .table, .table * {
        visibility: visible;
      }
      
      .table {
        position: absolute;
        left: 0;
        top: 0;
      }
      .pntbtn {
        display: none;
      }
    `));
    document.head.appendChild(style);
    window.print();
  
    // Remove the style element after printing
    document.head.removeChild(style);
  };
  

  return (
    <div className="table mx-auto bg-white shadow-md rounded-lg max-w-4xl w-full overflow-hidden">
      <section className="table_header bg-red-700 text-white  text-xl text-center py-3">
        <h1>Teachers Allocation SY</h1>
      </section>
      <section className="table_body bg-gray-100">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 border border-gray-400">Sr.no.</th>
              <th className="p-2 border border-gray-400">Classroom</th>
              <th className="p-2 border border-gray-400">Teachers</th>
              <th className="p-2 border border-gray-400">Co Teachers</th>
              <th className="p-2 border border-gray-400">Date</th>
              <th className="p-2 border border-gray-400">Time</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((allocation, index) => (
              <tr key={index} className="hover:bg-gray-300 transition-all duration-500">
                <td className="p-2 border border-gray-400">{index + 1}</td>
                <td className="p-2 border border-gray-400">{allocation.classroom}</td>
                <td className="p-2 border border-gray-400">{allocation.main_teacher}</td>
                <td className="p-2 border border-gray-400">{allocation.co_teacher}</td>
                <td className="p-2 border border-gray-400">{allocation.date}</td>
                <td className="p-2 border border-gray-400">{`${allocation.start_time} - ${allocation.end_time}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <button className='pntbtn' onClick={printTable}>Print Table</button>
    </div>
  );
}

export default TeacherAlloc;

  // import React, { useState, useEffect } from 'react';
  // import * as XLSX from 'xlsx';
  // import * as XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';


  // function TeacherAlloc() {
  //   const [allocations, setAllocations] = useState([]);

  //   useEffect(() => {
  //     // Dummy data
  //     const dummyData = [
  //       {
  //         classroom: "Room A",
  //         main_teacher: "John Doe",
  //         co_teacher: "Jane Smith",
  //         date: "2024-03-23",
  //         start_time: "09:00 AM",
  //         end_time: "10:30 AM"
  //       },
  //       {
  //         classroom: "Room B",
  //         main_teacher: "Alice Johnson",
  //         co_teacher: "Bob Williams",
  //         date: "2024-03-24",
  //         start_time: "10:00 AM",
  //         end_time: "11:30 AM"
  //       },
  //       // Add more dummy data as needed
  //     ];

  //     // Setting dummy data to state
  //     setAllocations(dummyData);
  //   }, []);

  //   const handleExport = () => {
  //     const title = ['Teacher Allocations', ''];
  //     const headers = ['Sr.no.', 'Classroom', 'Main Teacher', 'Co Teacher', 'Date', 'Time'];
    
  //     const data = allocations.map((allocation, index) => [
  //       index + 1,
  //       allocation.classroom,
  //       allocation.main_teacher,
  //       allocation.co_teacher,
  //       allocation.date,
  //       `${allocation.start_time} - ${allocation.end_time}`
  //     ]);
    
  //     const worksheetData = [title, headers, ...data];
    
  //     const sheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
  //     // Set column widths
  //     sheet['!cols'] = [{ width: 10 }, { width: 20 }, { width: 20 }, { width: 20 }, { width: 15 }, { width: 15 }];
    
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, sheet, 'teacher_allocations');
    
  //     // Convert workbook to blob
  //     const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array', compression: true });
  //     const blob = new Blob([wbout], { type: 'application/octet-stream' });
    
  //     return blob;
  //   };
    


  //   const workbook2blob = workbook => {
  //     const wopts = {
  //       bookType: 'xlsx',
  //       bookSST: false,
  //       type: 'binary'
  //     };

  //     const wbout = XLSX.write(workbook, wopts);

  //     const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

  //     return blob;
  //   };

  //   const s2ab = s => {
  //     const buf = new ArrayBuffer(s.length);
  //     const view = new Uint8Array(buf);
  //     for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i);
  //     return buf;
  //   };

  //   const addStyle = async (workbookBlob) => {
  //     try {
  //       const XlsxPopulate = await import('xlsx-populate/browser/xlsx-populate'); // Import XlsxPopulate library
  //       const workbook = await XlsxPopulate.fromDataAsync(workbookBlob); // Initialize XlsxPopulate and load workbook
    
  //       workbook.sheets().forEach(sheet => {
  //         sheet.usedRange().style({
  //           fontFamily: 'Arial',
  //           verticalAlignment: 'center',
  //           horizontalAlignment: 'center',
  //           bold: true,
  //         });
  //       });
    
  //       const updatedWorkbookBlob = await workbook.outputAsync(); // Generate updated workbook blob
    
  //       return URL.createObjectURL(updatedWorkbookBlob); // Return object URL for the updated workbook
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
    

  //   const createDownloadData = () => {
  //     const blob = handleExport();
  //     const url = URL.createObjectURL(blob);
    
  //     const downloadAnchorNode = document.createElement('a');
  //     downloadAnchorNode.setAttribute('href', url);
  //     downloadAnchorNode.setAttribute('download', 'teacher_allocations.xlsx');
  //     downloadAnchorNode.click();
  //     downloadAnchorNode.remove();
  //   };
    

  //   return (
  //     <div className="table mx-auto bg-white shadow-md rounded-lg max-w-4xl w-full overflow-hidden">
  //       <section className="table_header bg-red-700 text-white  text-xl text-center py-3">
  //         <h1>Classroom Allocation SY</h1>
  //       </section>
  //       <section className="table_body bg-gray-100">
  //         <table className="w-full">
  //           <thead>
  //             <tr>
  //               <th className="p-2 border border-gray-400">Sr.no.</th>
  //               <th className="p-2 border border-gray-400">Classroom</th>
  //               <th className="p-2 border border-gray-400">Teachers</th>
  //               <th className="p-2 border border-gray-400">Co Teachers</th>
  //               <th className="p-2 border border-gray-400">Date</th>
  //               <th className="p-2 border border-gray-400">Time</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {allocations.map((allocation, index) => (
  //               <tr key={index} className="hover:bg-gray-300 transition-all duration-500">
  //                 <td className="p-2 border border-gray-400">{index + 1}</td>
  //                 <td className="p-2 border border-gray-400">{allocation.classroom}</td>
  //                 <td className="p-2 border border-gray-400">{allocation.main_teacher}</td>
  //                 <td className="p-2 border border-gray-400">{allocation.co_teacher}</td>
  //                 <td className="p-2 border border-gray-400">{allocation.date}</td>
  //                 <td className="p-2 border border-gray-400">{`${allocation.start_time} - ${allocation.end_time}`}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </section>
  //       <button onClick={createDownloadData}>Download</button>
  //     </div>
  //   );
  // }

  // export default TeacherAlloc;

//   import React, { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import * as XlsxPopulate from 'xlsx-populate';

// // Polyfill for Buffer
// if (typeof window !== 'undefined') {
//   window.Buffer = window.Buffer || require('buffer').Buffer;
// }

// function TeacherAlloc() {
//   const [allocations, setAllocations] = useState([]);

//   useEffect(() => {
//     // Dummy data
//     const dummyData = [
//       {
//         classroom: "Room A",
//         main_teacher: "John Doe",
//         co_teacher: "Jane Smith",
//         date: "2024-03-23",
//         start_time: "09:00 AM",
//         end_time: "10:30 AM"
//       },
//       {
//         classroom: "Room B",
//         main_teacher: "Alice Johnson",
//         co_teacher: "Bob Williams",
//         date: "2024-03-24",
//         start_time: "10:00 AM",
//         end_time: "11:30 AM"
//       },
//       // Add more dummy data as needed
//     ];

//     // Setting dummy data to state
//     setAllocations(dummyData);
//   }, []);

//   const handleExport = async () => {
//     const title = ['Teacher Allocations', ''];
//     const headers = ['Sr.no.', 'Classroom', 'Main Teacher', 'Co Teacher', 'Date', 'Time'];
  
//     const data = allocations.map((allocation, index) => [
//       index + 1,
//       allocation.classroom,
//       allocation.main_teacher,
//       allocation.co_teacher,
//       allocation.date,
//       `${allocation.start_time} - ${allocation.end_time}`
//     ]);
  
//     const worksheetData = [title, headers, ...data];
  
//     const sheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
//     // Set column widths
//     sheet['!cols'] = [{ width: 10 }, { width: 20 }, { width: 20 }, { width: 20 }, { width: 15 }, { width: 15 }];

//     // Create workbook
//     const workbook = XlsxPopulate.fromBlankAsync();
//     workbook.sheet("Sheet1").cell("A1").value(worksheetData);

//     // Apply styles
//     workbook.sheets().forEach(sheet => {
//       sheet.usedRange().style({
//         fontFamily: 'Arial',
//         verticalAlignment: 'center',
//         horizontalAlignment: 'center',
//         bold: true,
//       });
//     });

//     // Convert workbook to blob
//     const workbookBlob = await workbook.outputAsync();
//     const blob = new Blob([workbookBlob], { type: 'application/octet-stream' });
  
//     return blob;
//   };
  
//   const createDownloadData = async () => {
//     const blob = await handleExport();
//     const url = URL.createObjectURL(blob);
  
//     const downloadAnchorNode = document.createElement('a');
//     downloadAnchorNode.setAttribute('href', url);
//     downloadAnchorNode.setAttribute('download', 'teacher_allocations.xlsx');
//     downloadAnchorNode.click();
//     downloadAnchorNode.remove();
//   };

//   return (
//     <div className="table mx-auto bg-white shadow-md rounded-lg max-w-4xl w-full overflow-hidden">
//       <section className="table_header bg-red-700 text-white  text-xl text-center py-3">
//         <h1>Classroom Allocation SY</h1>
//       </section>
//       <section className="table_body bg-gray-100">
//         <table className="w-full">
//           <thead>
//             <tr>
//               <th className="p-2 border border-gray-400">Sr.no.</th>
//               <th className="p-2 border border-gray-400">Classroom</th>
//               <th className="p-2 border border-gray-400">Teachers</th>
//               <th className="p-2 border border-gray-400">Co Teachers</th>
//               <th className="p-2 border border-gray-400">Date</th>
//               <th className="p-2 border border-gray-400">Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allocations.map((allocation, index) => (
//               <tr key={index} className="hover:bg-gray-300 transition-all duration-500">
//                 <td className="p-2 border border-gray-400">{index + 1}</td>
//                 <td className="p-2 border border-gray-400">{allocation.classroom}</td>
//                 <td className="p-2 border border-gray-400">{allocation.main_teacher}</td>
//                 <td className="p-2 border border-gray-400">{allocation.co_teacher}</td>
//                 <td className="p-2 border border-gray-400">{allocation.date}</td>
//                 <td className="p-2 border border-gray-400">{`${allocation.start_time} - ${allocation.end_time}`}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//       <button onClick={createDownloadData}>Download</button>
//     </div>
//   );
// }

// export default TeacherAlloc;
