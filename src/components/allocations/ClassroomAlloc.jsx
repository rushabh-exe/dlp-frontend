import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClassroomAlloc() {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:9876/getAttend')
      .then((response) => {
        setAttendances(response.data);
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
              <th className="p-2 border border-gray-400">Class Name</th>
              <th className="p-2 border border-gray-400">Subject</th>
              <th className="p-2 border border-gray-400">Main teacher</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance, index) => (
              <tr key={index} className="hover:bg-gray-300 transition-all duration-500">
                <td className="p-2 border border-gray-400">{index + 1}</td>
                <td className="p-2 border border-gray-400">{attendance.class_name}</td>
                <td className="p-2 border border-gray-400">{attendance.subject}</td>
                <td className="p-2 border border-gray-400">
                {attendance.main_teacher}
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
