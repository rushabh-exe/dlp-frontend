import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrintButton from '../utils/PrintButton';

function ClassroomAlloc() {
  const [allocations, setallocations] = useState([
    { class_name: 'Class A', subject: 'Mathematics', main_teacher: 'Mr. Smith' },
    { class_name: 'Class B', subject: 'Science', main_teacher: 'Ms. Johnson' },
    { class_name: 'Class C', subject: 'English', main_teacher: 'Mr. Brown' },
  ]);

  useEffect(() => {
    axios
      .get('http://localhost:9876/getAttend')
      .then((response) => {
        setallocations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div id='claalooc' className="mx-auto flex flex-col gap-1 shadow-md w-full overflow-hidden">
      <PrintButton contentId='claalooc'/>
      <div className="transcripts hidden flex-col items-center">
        <h2>KJ Somaiya Institure of Technology, Sion Mumbai - 400022</h2>
        <h2>Department of Electronics and Telecommunication Engineering</h2>
        <h2>Even Semester 2024-25</h2>
        <h2>Class Test 1 Attendance Report</h2>
      </div>
      <section className="table_header bg-red-700 text-white  text-xl text-center py-3">
        <h1>Classroom Allocation SY</h1>
      </section>
      <section className="table_body bg-gray-100">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 border border-gray-400">Sr.no.</th>
              <th className="p-2 border border-gray-400">Class Name</th>
              <th className="p-2 border border-gray-400">Subject</th>
              <th className="p-2 border border-gray-400">Main teacher</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((allocation, index) => (
              <tr key={index} className="hover:bg-gray-300 transition-all duration-500">
                <td className="p-2 text-center border border-gray-400">{index + 1}</td>
                <td className="p-2 border text-center border-gray-400">{allocation.class_name}</td>
                <td className="p-2 border text-center border-gray-400">{allocation.subject}</td>
                <td className="p-2 border text-center border-gray-400">
                {allocation.main_teacher}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default ClassroomAlloc;
