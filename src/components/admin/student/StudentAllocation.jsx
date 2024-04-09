import { Outlet } from 'react-router-dom';
import CNavlink from '../../utils/CNavlink';
import React from 'react';

function StudentAllocation() {
  return (
    <div>
      <div className='bg-white flex flex-wrap w-fit'>
        <CNavlink to='/admin/student/Allocation/createSingle'>Single Allocation</CNavlink>
        <CNavlink to='/admin/student/Allocation/createDual'>Dual Allocation</CNavlink>
        <CNavlink to='/admin/student/Allocation/getAllocation'>Get Allocation</CNavlink>
      </div>
      <div className='mt-5'>
      <Outlet/>
      </div>
    </div>
  );
}

export default StudentAllocation;
