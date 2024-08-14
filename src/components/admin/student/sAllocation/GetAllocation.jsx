import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetAllocation() {
  const [studentAllocations, setStudentAllocations] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchStudentAllocations();
  }, []);

  const fetchStudentAllocations = () => {
    axios.get(`${apikey}admin/get/student/allocation`)
      .then(response => {
        setStudentAllocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching student allocations:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${apikey}admin/get/student/allocation/${id}`)
      .then(response => {
        console.log('Allocation deleted successfully');
        fetchStudentAllocations(); // Refresh the allocation list
      })
      .catch(error => {
        console.error('Error deleting student allocation:', error);
      });
  };

  return (
    <div className="tableee mx-auto bg-white shadow-md rounded-lg max-w-4xl w-full overflow-hidden">
      <section className="table_header bg-white text-xl text-center py-3">
        <h1>Student Allocation SY</h1>
      </section>
      <section className="table_body bg-white">
        <table className="w-full">
          <thead>
            <tr className="text-center">
              <th className="p-2 border border-gray-400">Sr.no.</th>
              <th className="p-2 border border-gray-400">Classroom</th>
              <th className="p-2 border border-gray-400">Start RollNo</th>
              <th className="p-2 border border-gray-400">End RollNo</th>
              <th className="p-2 border border-gray-400">Classname</th>
              <th className="p-2 border border-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentAllocations.map((allocation, index) => (
              <tr key={index} className="text-center hover:bg-gray-300 transition-all duration-500">
                <td className="p-2 border border-gray-400">{index + 1}</td>
                <td className="p-2 border border-gray-400">{allocation.classroom}</td>
                <td className="p-2 border border-gray-400">{allocation.start}</td>
                <td className="p-2 border border-gray-400">{allocation.end}</td>
                <td className="p-2 border border-gray-400">{allocation.classname}</td>
                <td className="p-2 border border-gray-400">
                  <button onClick={() => handleDelete(allocation.ID)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default GetAllocation;
