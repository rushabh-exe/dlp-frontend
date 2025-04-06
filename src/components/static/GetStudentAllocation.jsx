import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

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
        toast.error('Error fetching student allocations', {position:"bottom-right"});
      });
  };

  return (
    <div className="tableee mx-auto bg-white shadow-md rounded-lg max-w-4xl w-full overflow-hidden">
      <Toaster/>
      <section className="table_header bg-white text-xl text-center py-3">
        <h1>Student Allocation SY</h1>
      </section>
      <section id='table_body' className="table_body bg-white">
        <table className="w-full">
          <thead>
            <tr className="text-center">
              <th className="p-2 border border-gray-400">Sr.no.</th>
              <th className="p-2 border border-gray-400">Classroom</th>
              <th className="p-2 border border-gray-400">Start RollNo</th>
              <th className="p-2 border border-gray-400">End RollNo</th>
              <th className="p-2 border border-gray-400">Classname</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default GetAllocation;
