// import React from "react";
// import PrintButton from "../../utils/PrintButton";
// function StudentAttendance({ year }) {
//   // Dummy data for 10 students
//   const students = [
//     { rollNo: 1, name: "John Doe", sign: "", supplement: "", remark: "" },
//     { rollNo: 2, name: "Jane Smith", sign: "", supplement: "", remark: "" },
//     { rollNo: 3, name: "Alice Johnson", sign: "", supplement: "", remark: "" },
//     { rollNo: 4, name: "Bob Williams", sign: "", supplement: "", remark: "" },
//     { rollNo: 5, name: "Emily Davis", sign: "", supplement: "", remark: "" },
//     { rollNo: 6, name: "Michael Brown", sign: "", supplement: "", remark: "" },
//     { rollNo: 7, name: "Olivia Wilson", sign: "", supplement: "", remark: "" },
//     { rollNo: 8, name: "James Taylor", sign: "", supplement: "", remark: "" },
//     { rollNo: 5, name: "Emily Davis", sign: "", supplement: "", remark: "" },
//     { rollNo: 6, name: "Michael Brown", sign: "", supplement: "", remark: "" },
//     { rollNo: 7, name: "Olivia Wilson", sign: "", supplement: "", remark: "" },
//   ];

//   return (
//     <div id="atnreport" className="atnreport flex gap-5">
//       <div className=" w-60 flex flex-col gap-2">
//         <div className="w-full bg-white">StudentAttendance{year}</div>
//         <select className='w-full p-2' name="year-divison" id="year-division">
//           <option value="sya">SYA</option>
//           <option value="tya">TYA</option>
//         </select>
//         <PrintButton contentId='atnreport' />
//       </div>
//       <div className="transcripts hidden flex-col items-center">
//         <h2>KJ Somaiya Institure of Technology, Sion Mumbai - 400022</h2>
//         <h2>Department of Electronics and Telecommunication Engineering</h2>
//         <h2>Even Semester 2024-25</h2>
//         <h2>Class Test 1 Attendance Report</h2>
//       </div>
//       <div className="transcripts hidden flex-col">
//         <div className="flex">
//           <p>YEAR:</p>
//           <h2>LY</h2>
//         </div>
//         <div className="flex">
//           <p>Semester:</p>
//           <h2>VIII</h2>
//         </div>
//         <div className="flex gap-5">
//           <p>SUBJECT : ARTIFICIAL INTELLIGENCE AND ML</p>
//           <p>CLASSROOM: 101</p>
//           <p>DATE : 03/05/2025</p>
//         </div>
//       </div>
//       <div className="table mx-auto bg-white   max-w-4xl w-full overflow-hidden">
//         <section className="table_body bg-gray-100">
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th className="p-2 border border-gray-400">Roll No.</th>
//                 <th className="p-2 border border-gray-400">Name Of Student</th>
//                 <th className="p-2 border border-gray-400">Sign</th>
//                 <th className="p-2 border border-gray-400">Supplement</th>
//                 <th className="p-2 border border-gray-400">Remark</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student, index) => (
//                 <tr
//                   key={index}
//                   className="hover:bg-gray-300 transition-all duration-500"
//                 >
//                   <td className="p-2 border border-gray-400 text-center">
//                     {student.rollNo}
//                   </td>
//                   <td className="p-2 border border-gray-400">{student.name}</td>
//                   <td className="p-2 border border-gray-400 w-32">
//                     {student.sign}
//                   </td>
//                   <td className="p-2 border border-gray-400">
//                     {student.supplement}
//                   </td>
//                   <td className="p-2 border border-gray-400 w-32">
//                     {student.remark}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//       </div>
//       <div className="transcripts hidden justify-between">
//         <p>TOTAL STUDENTS: 18</p>
//         <p>PRESENT: 18</p>
//         <p>ABSENT: 0</p>
//       </div>
//       <div className="transcripts hidden justify-between">
//         <p>NAME OF SUPERVISOR: _________________</p>
//         <p>SIGN: _____________</p>
//       </div>
//       <div className="transcripts hidden justify-between">
//         <div className="">
//           <h3>TEST COORDINATOR:</h3>
//           <p>JONH HON</p>
//           <p>JHON NOH</p>
//           <p>HONJ OHN</p>
//         </div>
//         <div>
//           <h3>HOD EXTC</h3>
//           <p>Dr. Jayashree Kanapuri </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StudentAttendance;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentAttendance({ year }) {
  const [subject, setSubject] = useState('');
  const [classRoom, setClassRoom] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchAttendanceData();
  }, [year]);
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/admin/${year}/${subject}/${classRoom}`);
      console.log('GET Response:', response.data);
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const subjects = ['Math', 'Science', 'History'];
  const classrooms = ['Class A', 'Class B', 'Class C'];

  const handleGetRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/admin/${year}/${subject}/${classRoom}`);
      console.log('GET Response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePutRequest = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/admin/${year}/${subject}/${classRoom}`);
      console.log('PUT Response:', response.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/admin/${year}/${subject}/${classRoom}`);
      console.log('DELETE Response:', response.data);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className='flex gap-5'>
      <div className='w-66 p-1 flex flex-col gap-1 bg-gray-50'>
        <h2 className='w-full'>Select Subject and Class</h2>
        <div className='w-full'>
          <select className='w-full' id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">Select Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div className='w-full'>
          <select className='w-full' id="class" value={classRoom} onChange={(e) => setClassRoom(e.target.value)}>
            <option value="">Select Class</option>
            {classrooms.map((classRoom, index) => (
              <option key={index} value={classRoom}>{classRoom}</option>
            ))}
          </select>
        </div>
        <div className='w-full flex flex-col gap-1'>
          <button className='w-full bg-white' onClick={handleGetRequest}>Get Data</button>
          <button className='w-full bg-white' onClick={handlePutRequest}>Update Data</button>
          <button className='w-full bg-white' onClick={handleDeleteRequest}>Delete Data</button>
        </div> 
      </div>
      <div>
        <h2>Attendance Data</h2>
        <table>
          <thead className='bg-red-700 text-white'>
            <tr>
              <th className='p-1 border-red-800 border-2'>Date</th>
              <th className='p-1 border-red-800 border-2'>Name</th>
              <th className='p-1 border-red-800 border-2'>Roll No</th>
              <th className='p-1 border-red-800 border-2'>Class</th>
              <th className='p-1 border-red-800 border-2'>Present</th>
            </tr>
          </thead>
          <tbody className='bg-white text-white'>
            {attendanceData.map((data, index) => (
              <tr key={index}>
                <td className='p-1 border-2' >{data.Date}</td>
                <td className='p-1 border-2'>{data.Name}</td>
                <td className='p-1 border-2'>{data.RollNo}</td>
                <td className='p-1 border-2'>{data.Class}</td>
                <td className='p-1 border-2'>{data.IsPresent ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentAttendance;
