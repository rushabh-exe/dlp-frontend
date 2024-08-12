import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function StudentAttendance({ firstSelect, secondSelect, thirdSelect, fourthSelect, onBack }) {
  // return (
  //   <div>
  //     <button onClick={() => onBack()}>Back</button>
  //     <div>
  //       This is your selected {firstSelect} and {secondSelect} and {thirdSelect}
  //     </div>
  //   </div>
  // );
  const [subject, setSubject] = useState('');
  const [classRoom, setClassRoom] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchAttendanceData();
  }, [secondSelect]);
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`${apikey}/admin/${secondSelect}/${thirdSelect}/${fourthSelect}`);
      console.log('GET Response:', response.data);
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const subjects = ['Math', 'Science', 'History'];
  const classrooms = ['Class A', 'Class B', 'Class C'];

  const handleGetRequest = async () => {
    try {
      const response = await axios.get(`${apikey}admin/${secondSelect}/${thirdSelect}/${fourthSelect}`);
      console.log('GET Response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePutRequest = async () => {
    try {
      const response = await axios.put(`${apikey}admin/${secondSelect}/${thirdSelect}/${fourthSelect}`);
      console.log('PUT Response:', response.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      const response = await axios.delete(`${apikey}admin/${secondSelect}/${thirdSelect}/${fourthSelect}`);
      console.log('DELETE Response:', response.data);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };



  return (
    <div className='flex gap-5'>
      <button onClick={() => onBack()}>Back</button>
      <div>
        This is your selected {firstSelect} and {secondSelect} and {thirdSelect} and {fourthSelect}
      </div>
      {/* <div className='w-66 p-1 flex flex-col gap-1 bg-gray-50'>
        <h2 className='w-full'>Select Subject and Class</h2>
        <div className='w-full'>
          <select className='w-full' id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">Select Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div className='w-full'>
          <select className='w-full' id="class" value={classRoom} onChange={(e) => setClassRoom(e.target.value)}>
            <option value="">Select Class</option>
            {classrooms.map((classRoom, index) => (
              <option key={index} value={classRoom}>{classRoom}</option>
            ))}
          </select>
        </div>
        <div className='w-full flex flex-col gap-1'>
          <button className='w-full bg-white' onClick={handleGetRequest}>Get Data</button>
          <button className='w-full bg-white' onClick={handlePutRequest}>Update Data</button>
          <button className='w-full bg-white' onClick={handleDeleteRequest}>Delete Data</button>
        </div>
      </div>
      <div className='atn-btn'>
        <h2>Attendance Data</h2>
        <table>
          <thead className='bg-red-700 text-white'>
            <tr>
              <th className='p-1 border-red-800 border-2'>Date</th>
              <th className='p-1 border-red-800 border-2'>Name</th>
              <th className='p-1 border-red-800 border-2'>Roll No</th>
              <th className='p-1 border-red-800 border-2'>Class</th>
              <th className='p-1 border-red-800 border-2'>Present</th>
            </tr>
          </thead>
          <tbody className='bg-white text-white'>
            {attendanceData.map((data, index) => (
              <tr key={index}>
                <td className='p-1 border-2' >{data.Date}</td>
                <td className='p-1 border-2'>{data.Name}</td>
                <td className='p-1 border-2'>{data.RollNo}</td>
                <td className='p-1 border-2'>{data.Class}</td>
                <td className='p-1 border-2'>{data.IsPresent ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
function StudentAttendanece({year}) {

  const apikey = import.meta.env.VITE_API_URL;


  const [subjects, setSubjects] = useState([]);
  const fetchSubjectData = async () => {
    try {
      const response = await axios.get(`${apikey}admin/create/vitals/${year}`);
      console.log('Response:', response.data);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subject data:', error);
    }
  };
  useEffect(() => {
    fetchSubjectData();
  }, [year]);
  console.log(subjects.map((subject) => subject.name));

  return (
    <div>
      <select name="subject" value={newEntry.subject} onChange={handleInputChange}>
        <option value="" disabled>Select Subject</option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject.name}>{subject.name}</option>
        ))}
      </select>
    </div>
  )
}
