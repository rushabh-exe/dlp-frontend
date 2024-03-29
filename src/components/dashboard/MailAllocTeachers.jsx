import React, { useState } from 'react';

const AllocationTable = ({ data }) => {
  return (
    <div className="table mx-auto bg-white shadow-md rounded-lg overflow-hidden max-w-4xl w-full">
      <section className="table_header bg-red-700 text-white text-center py-3 text-xl w-full">
        <h1>Teachers Allocation SY</h1>
      </section>
      <section className="table_body bg-gray-100">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 border border-gray-400">Sr.no.</th>
              <th className="p-2 border border-gray-400">Classroom</th>
              <th className="p-2 border border-gray-400">Teacher</th>
              <th className="p-2 border border-gray-400">Subteachers</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const [classroom, teacher, subteachers] = item.split(" ");
              return (
                <tr key={index} className="hover:bg-gray-300 transition-all duration-500">
                  <td className="p-2 border text-center border-gray-400">{index + 1}</td>
                  <td className="p-2 border text-center border-gray-400">{classroom}</td>
                  <td className="p-2 border border-gray-400">{teacher}</td>
                  <td className="p-2 border border-gray-400">{subteachers}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

const MailAllocTeachers = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/allotment');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const saveData = async () => {
    try {
      const response = await fetch('http://localhost:5555/storage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('Data saved successfully.');
      } else {
        console.error('Failed to save data.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className='mt-5'>
      <div className=' absolute bottom-12 z-10'>
        <button onClick={fetchData} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md mr-2">
          Fetch Data
        </button>
        <button onClick={saveData} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md mr-2">
          Save Data
        </button>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
          Mail Teachers
        </button>
      </div>
      <AllocationTable data={data} />
    </div>
  );
};

export default MailAllocTeachers;
