import CNavlink from '../../utils/CNavlink';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StudentAttendance } from './StudentAttendance';
import TimeTable from './Timetable';
function Student() {
  const [firstSelect, setFirstSelect] = useState('');
  const [secondSelect, setSecondSelect] = useState('');
  const [thirdSelect, setthirdSelect] = useState('');
  const [fourthSelect, setfourthSelect] = useState('');
  const apikey = import.meta.env.VITE_API_URL;

  const handleBack = () => {
    setSecondSelect('');
  };
  const handleBackA = () => {
    setfourthSelect('');
  };
  const fetchSubjectData = async () => {
    try {
      const response = await axios.get(`${apikey}admin/create/vitals/${secondSelect}`);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error fetching subject data:', error);
    }
  };

  return (
    <div>
      {!firstSelect && !secondSelect && (
        <div className="firstselect flex gap-5">
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setFirstSelect('Attendance')}>Attendance</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setFirstSelect('Timetable')}>Timetable</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setFirstSelect('Allocation')}>Allocation</button>
        </div>
      )}
      {firstSelect && !secondSelect && firstSelect === 'Attendance' && (
        <div className="secondselect flex gap-5">
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setFirstSelect('')}>Back</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => {setSecondSelect('SY'); fetchSubjectData('SY');}}>SY</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => {setSecondSelect('TY'); fetchSubjectData('TY');}}>TY</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => {setSecondSelect('LY'); fetchSubjectData('LY');}}>LY</button>
        </div>
      )}
      {secondSelect && firstSelect === 'Attendance' && !thirdSelect && (
        <div className="thirdselect flex gap-5">
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setSecondSelect('')}>Back</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setthirdSelect('SYe')}>SYe</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setthirdSelect('TYe')}>TYe</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setthirdSelect('LYe')}>LYe</button>
        </div>
      )}
      {secondSelect && firstSelect === 'Attendance' && thirdSelect && !fourthSelect && (
        <div className="fourthselect flex gap-5">
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setthirdSelect('')}>Back</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setfourthSelect('SYe')}>SYwdwe</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setfourthSelect('TYe')}>TwdwdwdYe</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setfourthSelect('LYe')}>LwYe</button>
        </div>
      )}
      
      {firstSelect === 'Attendance' && secondSelect && thirdSelect && fourthSelect && (
        <StudentAttendance
          firstSelect={firstSelect}
          secondSelect={secondSelect}
          thirdSelect={thirdSelect}
          fourthSelect={fourthSelect}
          onBack={handleBackA}
        />
      )}
      {firstSelect === 'Timetable' && !secondSelect && (
        <div className="secondselect flex gap-5">
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setFirstSelect('')}>Back</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setSecondSelect('SY')}>SY</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setSecondSelect('TY')}>TY</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setSecondSelect('LY')}>LY</button>
        </div>
      )}
      {firstSelect === 'Timetable' && secondSelect && (
        <TimetableSelection
          firstSelect={firstSelect}
          secondSelect={secondSelect}
          onBack={handleBack}
        />
      )}
      {firstSelect && !secondSelect && firstSelect === 'Allocation' && (
        <div className="secondselect flex gap-5">
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setFirstSelect('')}>Back</button>
          <CNavlink to='/admin/student/Allocation/createSingle'>Single Allocation</CNavlink>
          <CNavlink to='/admin/student/Allocation/createDual'>Dual Allocation</CNavlink>
          <CNavlink to='/admin/student/Allocation/getAllocation'>Get Allocation</CNavlink>
        </div>
      )}
    </div>
  );
}
export function TimetableSelection({ firstSelect, secondSelect, onBack }) {
  return (
    <div className='flex gap-5'>
      <button  className='h-fit px-4 py-2 border-2 border-gray-200 rounded-full bg-white text-xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => onBack()}>Back</button>
      <TimeTable year={secondSelect}/>
    </div>
  );
}




export default Student;



