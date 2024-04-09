import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubjectUtils() {
  const [year, setYear] = useState('');
  const [sem, setSem] = useState(0);
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(sem)
      const response = await axios.post(`http://localhost:3001/admin/create/vitals/${year}`, {
        year,
        sem,
        subject
      });
     
      console.log('Success:', response.data);
      setSubject('');
      fetchSubjectData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (subjectname) => {
    try {
      const response = await axios.delete(`http://localhost:3001/admin/create/vitals/${year}/${subjectname}`);
      console.log('Deleted:', response.data);
      fetchSubjectData();
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const fetchSubjectData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/admin/create/vitals/${year}`);
      console.log('Response:', response.data);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subject data:', error);
    }
  };

  useEffect(() => {
    fetchSubjectData();
  }, [year]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Subject Utils</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-wrap mb-4">
          <label htmlFor="year"  className="mr-3">Year:</label>
          <select id="year" value={year} onChange={(e) => setYear(e.target.value)} className="p-2 rounded border border-gray-300">
            <option value="">Select Year</option>
            <option value="SY">SY</option>
            <option value="TY">TY</option>
            <option value="LY">LY</option>
          </select>
        </div>
        <div className="flex flex-wrap mb-4">
          <label htmlFor="sem"  className="mr-3">Semester:</label>
          <input type="number" id="sem" value={sem} onChange={(e) => setSem(e.target.value)} className=" p-2 rounded border border-gray-300" />
        </div>
        <div className="flex flex-wrap mb-4">
          <label htmlFor="subject"  className="mr-3">Subject:</label>
          <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className=" p-2 rounded border border-gray-300" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
      </form>

      <div>
        <h3 className="text-xl font-bold mb-4">Subject Data</h3>
        <table className="w-full border-collapse mb-4 bg-white">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2">ID</th>
              <th className="border border-gray-400 p-2">Year</th>
              <th className="border border-gray-400 p-2">Semester</th>
              <th className="border border-gray-400 p-2">Name</th>
              <th className="border border-gray-400 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-all duration-500">
                <td className="border border-gray-400 p-2">{subject.ID}</td>
                <td className="border border-gray-400 p-2">{subject.year}</td>
                <td className="border border-gray-400 p-2">{subject.Sem}</td>
                <td className="border border-gray-400 p-2">{subject.name}</td>
                <td className="border border-gray-400 p-2">
                  <button onClick={() => handleDelete(subject.name)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubjectUtils;
