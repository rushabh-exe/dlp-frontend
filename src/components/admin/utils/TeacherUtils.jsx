import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeacherUtils() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [teachers, setTeachers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/admin/create/teacher', {
        name,
        email,
        phone,
        type
      });
      console.log('Success:', response.data);
      clearInputs();
      fetchTeachers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (teacherId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/admin/delete/teacher/${teacherId}`);
      console.log('Deleted:', response.data);
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/admin/get/teachers');
      console.log('Response:', response.data);
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const clearInputs = () => {
    setName('');
    setEmail('');
    setPhone('');
    setType('');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Teacher Utils</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-wrap mb-4">
          <label htmlFor="name" className="mr-3">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full sm:w-1/2 p-2 rounded border border-gray-300" />
        </div>
        <div className="flex flex-wrap mb-4">
          <label htmlFor="email"  className="mr-3">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full sm:w-1/2 p-2 rounded border border-gray-300" />
        </div>
        <div className="flex flex-wrap mb-4">
          <label htmlFor="phone"  className="mr-3">Phone:</label>
          <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full sm:w-1/2 p-2 rounded border border-gray-300" />
        </div>
        <div className="flex flex-wrap mb-4">
          <label htmlFor="type"  className="mr-3">Type:</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full sm:w-1/2 p-2 rounded border border-gray-300">
            <option value="">Select Type</option>
            <option value="Teaching">Teaching</option>
            <option value="Non Teaching">Non Teaching</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
      </form>

      <div>
        <h3 className="text-xl font-bold mb-4">Teacher Data</h3>
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2">ID</th>
              <th className="border border-gray-400 p-2">Name</th>
              <th className="border border-gray-400 p-2">Email</th>
              <th className="border border-gray-400 p-2">Phone</th>
              <th className="border border-gray-400 p-2">Type</th>
              <th className="border border-gray-400 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-all duration-500">
                <td className="border border-gray-400 p-2">{teacher.ID}</td>
                <td className="border border-gray-400 p-2">{teacher.Name}</td>
                <td className="border border-gray-400 p-2">{teacher.Email}</td>
                <td className="border border-gray-400 p-2">{teacher.Phone}</td>
                <td className="border border-gray-400 p-2">{teacher.Type}</td>
                <td className="border border-gray-400 p-2">
                  <button onClick={() => handleDelete(teacher.ID)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherUtils;
