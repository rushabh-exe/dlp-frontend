import React from 'react';

interface YearSelectionProps {
  onYearSelect: (year: string) => void;
}

function YearSelection({ onYearSelect }: YearSelectionProps) {
  return (
    <div className="firstselect flex gap-5">
      <button 
        className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' 
        onClick={() => onYearSelect('SY')}
      >
        SY
      </button>
      <button 
        className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' 
        onClick={() => onYearSelect('TY')}
      >
        TY
      </button>
      <button 
        className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' 
        onClick={() => onYearSelect('LY')}
      >
        LY
      </button>
    </div>
  );
}

export default YearSelection;
