import React, { useState, useEffect } from 'react';
import axios from 'axios';

const T_Alloc = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/admin/get/teacher/allocation')
      .then((response) => setScheduleData(response.data))
      .catch((error) => console.error('Error fetching schedule data:', error));
  }, []);

  return (
    <div className="container mx-auto">
      <table className="table-auto w-full border-collapse border border-red-500">
        <thead>
          <tr className="bg-red-500 text-white">
            <th className="border border-red-500 px-4 py-2">Classroom</th>
            <th className="border border-red-500 px-4 py-2">Date</th>
            <th className="border border-red-500 px-4 py-2">Start Time</th>
            <th className="border border-red-500 px-4 py-2">End Time</th>
            <th className="border border-red-500 px-4 py-2">Main Teacher</th>
            <th className="border border-red-500 px-4 py-2">Co-Teacher</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((item) => (
            <tr key={item.ID} className="bg-white text-red-500">
              <td className="border border-red-500 px-4 py-2">{item.classroom}</td>
              <td className="border border-red-500 px-4 py-2">{item.date}</td>
              <td className="border border-red-500 px-4 py-2">{item.start_time}</td>
              <td className="border border-red-500 px-4 py-2">{item.end_time}</td>
              <td className="border border-red-500 px-4 py-2">{item.main_teacher}</td>
              <td className="border border-red-500 px-4 py-2">{item.co_teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default T_Alloc;
