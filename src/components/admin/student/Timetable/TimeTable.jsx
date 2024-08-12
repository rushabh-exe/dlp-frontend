import React, { useState, useEffect } from 'react';
import GetTimeTable from './GetTimetable';
import CreateTimeTable from './CreateTimetable';

function TimeTable({ year }) {

    const [showGetTimetable, setShowGetTimetable] = useState(null);

    useEffect(() => {
        setShowGetTimetable(true);
    }, []);

    const handleGetTimetable = () => {
        setShowGetTimetable(true);
    };

    const handleCreateTimetable = () => {
        setShowGetTimetable(false);
    };

    return (
        <div className='flex gap-5 w-full'>
            <div className='flex flex-col gap-3'>
                <button className='px-4 text-nowrap py-2 border-2 border-gray-200 rounded-full bg-white text-xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={handleGetTimetable}>Get Timetable {year}</button>
                <button className='px-4 text-nowrap py-2 border-2 border-gray-200 rounded-full bg-white text-xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={handleCreateTimetable}>Create Timetable {year}</button>
            </div>
            {showGetTimetable === true && (
                <GetTimeTable year={year} />
            )}
            {showGetTimetable === false && (
                <CreateTimeTable year={year} />
            )}
        </div>
    );
}

export default TimeTable;
