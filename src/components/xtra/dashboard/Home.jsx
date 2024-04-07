import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavLink from '../utils/Navlink'; // Import the NavLink component
import GenExamtt from './GenExamtt';
import MailAllocTeachers from './MailAllocTeachers';
import GenStudentAlloc from './GenStudentAlloc';
import UploadPaper from '../underconstruction/UploadPaper';
import ImportStudentData from '../underconstruction/ImportStudentData';
import StudentAttendance from '../teacheraccess/StudentAttendance';

function Home() {
  return (
    <>
      <div className='bg-white flex flex-wrap'>
        <NavLink to="/GenExamtt">Time Table Generation</NavLink>
        <NavLink to="/MailAllocTeachers">Generate Teachers Allocation</NavLink>
        <NavLink to="/GenStudentAlloc">Generate Student Allocation</NavLink>
        <NavLink to="/UploadPaper">Upload paper</NavLink>
        <NavLink to="/ImportStudentData">Import Student data</NavLink>
        <NavLink to="/StudentAttendance">StudentAttendance</NavLink>
      </div>
      <Routes>
        <Route path="/" exact element={<HomeComponent/>} />
        <Route path="/GenExamtt" element={<GenExamtt/>} />
        <Route path="/MailAllocTeachers" element={<MailAllocTeachers/>} />
        <Route path="/GenStudentAlloc" element={<GenStudentAlloc/>} />
        <Route path="/UploadPaper" element={<UploadPaper/>} />
        <Route path="/ImportStudentData" element={<ImportStudentData/>} />
        <Route path="/StudentAttendance" element={<StudentAttendance/>} />
      </Routes>
    </>
  );
}

function HomeComponent() {
  return (
    <div className='flex-1 bg-white'>
    </div>
  );
}

export default Home;
