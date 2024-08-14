import React from 'react';

interface SubjectRowProps {
  subject: { name: string };
  onDelete: (subjectName: string) => void;
}

function SubjectRow({ subject, onDelete }: SubjectRowProps) {
  return (
    <div className='border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:text-red-900 transition duration-300 flex items-center justify-between overflow-hidden mb-2'>
      <p className='flex-grow p-2'>{subject.name}</p>
      <button 
        className='px-4 py-2 bg-slate-400 text-white rounded hover:bg-red-500 transition duration-300' 
        onClick={() => onDelete(subject.name)}
      >
        Delete
      </button>
    </div>
  );
}

export default SubjectRow;
