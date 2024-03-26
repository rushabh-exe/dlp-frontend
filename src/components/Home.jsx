import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import GenerateAlloc from './dashboard/GenerateAlloc';
import ImportSdata from './dashboard/ImportSdata';
import Uploadpaper from './dashboard/Uploadpaper';
import Ttgeneration from './dashboard/Ttgenration';
import GenSalloc from './allocations/StudentAlloc';
import AttendanceReport from './printables/AttendanceReport';
import SupervisionReport from './printables/SupervisionReport';

function Home() {
  return (
    <>
      <div className='bg-white flex flex-wrap'>
        <NavLink to="/ttgen">Time Table Generation</NavLink>
        <NavLink to="/GenerateAlloc">Generate Teachers Allocation</NavLink>
        <NavLink to="/gensalloc">Generate Student Allocation</NavLink>
        <NavLink to="/Uploadpaper">Upload paper</NavLink>
        <NavLink to="/ImportStudentdata">Import Student data</NavLink>
        <NavLink to='/repoattendance'>Attendance Report</NavLink>
        <NavLink to='/reposupervision'>Supervision Report</NavLink>
      </div>
      <Routes>
        <Route path="/" exact element={<HomeComponent/>} />
        <Route path="/GenerateAlloc" element={<GenerateAlloc/>} />
        <Route path="/ImportStudentdata" element={<ImportSdata/>} />
        <Route path="/Uploadpaper" element={<Uploadpaper/>} />
        <Route path="/ttgen" element={<Ttgeneration/>} />
        <Route path="/gensalloc" element={<GenSalloc/>} />
        <Route path='/repoattendance' element={<AttendanceReport/>}/>
        <Route path='/reposupervision' element={<SupervisionReport/>}/>
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

function NavLink({ to, children }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link to={to} className={` ${isActive ? 'text-red-800 bg-slate-200 p-2 border-r-2 border-gray-200' : 'hover:bg-slate-200 p-2 border-r-2 border-gray-200'}`} >
      {children}
    </Link>
  );
}

export default Home;
