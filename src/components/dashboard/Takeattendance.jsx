import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TakeAttendance() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/attendance')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  const handleCheckboxChange = (id, newIsPresent) => {
    setStudents(prevStudents => {
      return prevStudents.map(student => {
        if (student.id === id) {
          return { ...student, isPresent: newIsPresent };
        }
        return student;
      });
    });
    axios.put(`http://localhost:5000/api/attendance/${id}`, { isPresent: newIsPresent })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error updating attendance:', error);
      });
  };

  return (
    <div className="table mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-5 max-w-5xl w-full">
      <section className="table_header bg-red-700 text-white text-center py-3">
        <h1>Student Attendance SY</h1>
      </section>
      <section className="table_body bg-gray-100">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 border border-gray-400">Sr.no.</th>
              <th className="p-2 border border-gray-400">Rollno</th>
              <th className="p-2 border border-gray-400">Student Name</th>
              <th className="p-2 border border-gray-400">IsPresent</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className="hover:bg-gray-300 transition-all duration-500">
                <td className="p-2 border border-gray-400">{index + 1}</td>
                <td className="p-2 border border-gray-400">{student.rollno}</td>
                <td className="p-2 border border-gray-400">{student.studentName}</td>
                <td className="p-2 border border-gray-400">
                  <input
                    type="checkbox"
                    checked={student.isPresent}
                    onChange={() => handleCheckboxChange(student.id, !student.isPresent)}
                    className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default TakeAttendance;
