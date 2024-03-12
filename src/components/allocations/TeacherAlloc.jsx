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

  return (
    <div className="table mx-auto bg-white shadow-md rounded-lg max-w-4xl w-full overflow-hidden">
      <section className="table_header bg-red-700 text-white  text-xl text-center py-3">
        <h1>Classroom Allocation SY</h1>
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
    </div>
  );
}

export default TeacherAlloc;
