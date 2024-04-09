import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TeacherAllocation = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/admin/get/teacher/allocation');
      setScheduleData(response.data.reqAll);
    } catch (error) {
      setError('Error fetching schedule data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAllocation = async () => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:3001/admin/create/teacher/allocation');
      window.location.href = "/teacher/allocation";
    } catch (error) {
      setError('Error creating teacher allocation: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container w-full flex gap-4">
      <div className="flex max-w-60">
        <div className="bg-white text-black p-2 rounded-lg shadow-lg cursor-pointer h-fit" onClick={handleCreateAllocation}>
          <h2 className="text-2xl font-bold">Create Allocation</h2>
          <p>This creates teacher allocation</p>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
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
              {scheduleData && scheduleData.map((item) => (
                <tr key={item?.ID} className="bg-white text-red-500">
                  <td className="border border-red-500 px-4 py-2">{item?.Classroom}</td>
                  <td className="border border-red-500 px-4 py-2">{item?.Date}</td>
                  <td className="border border-red-500 px-4 py-2">{item?.Start_Time}</td>
                  <td className="border border-red-500 px-4 py-2">{item?.End_Time}</td>
                  <td className="border border-red-500 px-4 py-2">{item?.Main_Teacher}</td>
                  <td className="border border-red-500 px-4 py-2">{item?.Co_Teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

};

export default TeacherAllocation;
