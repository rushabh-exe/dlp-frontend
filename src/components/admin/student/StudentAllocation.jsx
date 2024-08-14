import { Outlet } from 'react-router-dom';
import React from 'react';
import CNavlink from '../../utils/CNavlink';

function StudentAllocation() {
  return (
    <div className='flex flex-col w-full pt-5 gap-5'>
      <div><CNavlink to="/admin/student/">back</CNavlink></div>
      <div className='w-full flex justify-center items-center'>
      <Outlet/>
      </div>
    </div>
  );
}

export default StudentAllocation;