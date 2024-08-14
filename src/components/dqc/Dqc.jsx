import React from 'react';
import CNavlink from '../utils/CNavlink';
function Teacher() {

  return (
    <div className='flex flex-wrap w-fit gap-5'>
      <CNavlink to='/dqc/getPapers'>Get Papers</CNavlink>
      <CNavlink to='/dqc/postPapers'>Post Papers</CNavlink>
    </div>

  );
}

export default Teacher;
