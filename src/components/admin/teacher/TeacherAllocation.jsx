import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TeacherAllocation = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/admin/get/teacher/allocation')
      .then((response) => setScheduleData(response.data.reqAll))
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
              <td className="border border-red-500 px-4 py-2">{item.Classroom}</td>
              <td className="border border-red-500 px-4 py-2">{item.Date}</td>
              <td className="border border-red-500 px-4 py-2">{item.Start_Time}</td>
              <td className="border border-red-500 px-4 py-2">{item.End_Time}</td>
              <td className="border border-red-500 px-4 py-2">{item.Main_Teacher}</td>
              <td className="border border-red-500 px-4 py-2">{item.Co_Teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherAllocation;
