import React from 'react'
import CNavlink from '../../utils/CNavlink'
import axios from 'axios';
import { useState, useEffect } from 'react';
import PrintButton from '../../utils/PrintButton';

function TeacherAllocation() {
  const apikey = import.meta.env.VITE_API_URL;

  return (
    <div className='flex flex-wrap w-fit gap-5'>
      <CNavlink to='/admin/teacher/Allocation/createAllocation'>createAllocation</CNavlink>
      <CNavlink to='/admin/teacher/Allocation/getAllocation'>getAllocation</CNavlink>
    </div>
  )
}
export function CreateTeacherAllocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleCreateAllocation = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${apikey}admin/create/teacher/allocation`);
      window.location.href = "/teacher/allocation";
    } catch (error) {
      setError('Error creating teacher allocation: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='flex flex-col gap-5'>
      <div className=' bg-yellow-200 p-1'>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>Click Create Allocation</>
        )}
      </div>
    <div className="bg-white text-black p-2 rounded-lg shadow-lg cursor-pointer h-fit" onClick={handleCreateAllocation}>
      <h2 className="text-2xl font-bold">Create Allocation</h2>
      <p>This creates teacher allocation</p>
    </div>
    </div>
  )
}
export function GetTeacherAllocation() {
  const [scheduleData, setScheduleData] = useState([
    {
      ID: 1,
      Classroom: "Room A",
      Date: "2024-04-12",
      Start_Time: "09:00 AM",
      End_Time: "11:00 AM",
      Main_Teacher: "John Doe",
      Co_Teacher: "Jane Smith"
    },
    {
      ID: 2,
      Classroom: "Room B",
      Date: "2024-04-12",
      Start_Time: "10:00 AM",
      End_Time: "12:00 PM",
      Main_Teacher: "Alice Johnson",
      Co_Teacher: "Bob Anderson"
    },
    // Add more dummy data here
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apikey}admin/get/teacher/allocation`);
      setScheduleData(response.data || []);
    } catch (error) {
      setError('Error fetching schedule data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-white">
            <th className="px-4 py-2">Classroom</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2">Main Teacher</th>
            <th className="px-4 py-2">Co-Teacher</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((item, index) => (
            <tr key={index} className="bg-white">
              <td className="px-4 text-center py-2">{item?.classroom}</td>
              <td className="px-4 text-center py-2">{item?.date}</td>
              <td className="px-4 text-center py-2">{item?.start_time}</td>
              <td className="px-4 text-center py-2">{item?.end_time}</td>
              <td className="px-4 text-center py-2">{item?.main_teacher}</td>
              <td className="px-4 text-center py-2">{item?.co_teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default TeacherAllocation;

