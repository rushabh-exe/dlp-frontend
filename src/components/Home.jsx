import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import GenerateAlloc from './dashboard/GenerateAlloc';
import ImportSdata from './dashboard/ImportSdata';
import GenSalloc from './dashboard/GenSalloc';
import Takeattendance from './dashboard/Takeattendance';
import Uploadpaper from './dashboard/Uploadpaper';
import Ttgenration from './dashboard/Ttgenration';

function Home() {
  return (
    <>
      <div className='bg-white flex'>
        <NavLink to="/GenerateAlloc">GenerateAlloc</NavLink>
        <NavLink to="/ImportStudentdata">ImportStudentdata</NavLink>
        <NavLink to="/GenrateStudentAllocation">GenrateStudentAllocation</NavLink>
        <NavLink to="/Uploadpaper">Uploadpaper</NavLink>
        <NavLink to="/TakeAttendance">TakeAttendance</NavLink>
      </div>
      <Routes>
        <Route path="/" exact element={<HomeComponent/>} />
        <Route path="/GenerateAlloc" element={<GenerateAlloc/>} />
        <Route path="/ImportStudentdata" element={<ImportSdata/>} />
        <Route path="/GenrateStudentAllocation" element={<GenSalloc/>} />
        <Route path="/Uploadpaper" element={<Uploadpaper/>} />
        <Route path="/TakeAttendance" element={<Takeattendance/>} />
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
    <Link to={to} className={` ${isActive ? 'text-red-800 bg-slate-200 p-2' : 'hover:bg-slate-200 p-2'}`} >
      {children}
    </Link>
  );
}

export default Home;
