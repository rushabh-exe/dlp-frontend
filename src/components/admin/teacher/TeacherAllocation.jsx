import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CNavlink from '../../utils/CNavlink';
import PrintButton from '../../utils/PrintButton';

// Base API URL
const apikey = import.meta.env.VITE_API_URL;

// Utility hook for API calls
const useApiCall = (apiUrl, method, data = null) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = method === 'GET'
          ? await axios.get(apiUrl)
          : await axios.post(apiUrl, data);
        setResponse(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiUrl, method, data]);

  return { response, error, isLoading };
};

// Main Component
function TeacherAllocation() {
  return (
    <div className='flex flex-wrap w-fit gap-5'>
      <CNavlink to='/admin/teacher/Allocation/createAllocation'>Create Allocation</CNavlink>
      <CNavlink to='/admin/teacher/Allocation/getAllocation'>Get Allocation</CNavlink>
    </div>
  );
}

// Create Teacher Allocation Component
export function CreateTeacherAllocation() {
  const apiUrl = `${apikey}admin/create/teacher/allocation`;
  const { response, error, isLoading } = useApiCall(apiUrl, 'POST');

  const handleCreateAllocation = () => {
    if (!isLoading && !error) {
      window.location.href = "/teacher/allocation";
    }
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className='bg-yellow-200 p-1'>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>Click Create Allocation</>
        )}
      </div>
      <div
        className="bg-white text-black p-2 rounded-lg shadow-lg cursor-pointer h-fit"
        onClick={handleCreateAllocation}
      >
        <h2 className="text-2xl font-bold">Create Allocation</h2>
        <p>This creates teacher allocation</p>
      </div>
    </div>
  );
}

// Get Teacher Allocation Component
export function GetTeacherAllocation() {
  const apiUrl = `${apikey}admin/get/teacher/allocation`;
  const { response, error, isLoading } = useApiCall(apiUrl, 'GET');

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Classroom</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2">Main Teacher</th>
            <th className="px-4 py-2">Co-Teacher</th>
          </tr>
        </thead>
        <tbody>
          {response?.map((item, index) => (
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
