import CNavlink from '../../utils/CNavlink';
import React from 'react';
function Teacher() {

  return (
    <div className='flex flex-wrap w-fit gap-5'>
      <CNavlink to='/admin/teacher/Allocation'>Allocation</CNavlink>
      <CNavlink to='/admin/teacher/Papers'>Papers</CNavlink>
    </div>

  );
}

export default Teacher;
