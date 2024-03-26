// import React from 'react'
// import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
// import AttendanceReport from './AttendanceReport'
// import GenerateAlloc from '../dashboard/GenerateAlloc';
// function Report() {
//     return (
//         <>
//           <div className='bg-white flex'>
//             <NavLinkl to="/reportattendance">AttendanceReport</NavLinkl>
//             <NavLinkl to="/GenerateAlloc">Generate Teachers Allocation</NavLinkl>
//           </div>
//           <Routes>
//           <Route path="/reportattendance" element={<AttendanceReport/>} />
//             <Route path="/GenerateAlloc" element={<GenerateAlloc/>} />
           
//           </Routes>
//         </>
//       );
//     }
    
//     function ReportComponent() {
//       return (
//         <div className='flex-1 bg-white'>
//         </div>
//       );
//     }
    
//     function NavLinkl({ to, children }) {
//       const { pathname } = useLocation();
//       const isActive = pathname === to;
    
//       return (
//         <Link to={to} className={` ${isActive ? 'text-red-800 bg-slate-200 p-2 border-r-2 border-gray-200' : 'hover:bg-slate-200 p-2 border-r-2 border-gray-200'}`} >
//           {children}
//         </Link>
//       );
//     }

// export default Report
import React from 'react'
import AttendanceReport from './AttendanceReport'

function Report() {
  return (
    <div>
        <p>report</p>
        <AttendanceReport/>
    </div>
  )
}

export default Report