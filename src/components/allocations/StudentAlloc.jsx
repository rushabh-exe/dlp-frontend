import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentAlloc() {
  const [studentAllocations, setStudentAllocations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/studentallocations')
      .then(response => {
        setStudentAllocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching student allocations:', error);
      });
  }, []);

  return (
    <div className="table mx-auto bg-white shadow-md rounded-lg max-w-4xl w-full overflow-hidden">
      <section className="table_header bg-red-700 text-white  text-xl text-center py-3">
        <h1>Student Allocation SY</h1>
      </section>
      <section className="table_body bg-gray-100">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 border border-gray-400">Sr.no.</th>
              <th className="p-2 border border-gray-400">Classroom</th>
              <th className="p-2 border border-gray-400">Exam Date</th>
              <th className="p-2 border border-gray-400">Exam Time</th>
              <th className="p-2 border border-gray-400">Start RollNo</th>
              <th className="p-2 border border-gray-400">End RollNo</th>
            </tr>
          </thead>
          <tbody>
            {studentAllocations.map((allocation, index) => (
              <tr key={index} className="hover:bg-gray-300 transition-all duration-500">
                <td className="p-2 border border-gray-400">{index + 1}</td>
                <td className="p-2 border border-gray-400">{allocation.classroom}</td>
                <td className="p-2 border border-gray-400">{allocation.examDate}</td>
                <td className="p-2 border border-gray-400">{allocation.examTime}</td>
                <td className="p-2 border border-gray-400">{allocation.startRollNo}</td>
                <td className="p-2 border border-gray-400">{allocation.endRollNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default StudentAlloc;
