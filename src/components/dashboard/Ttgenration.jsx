import React, { useState } from 'react';

function Ttgeneration() {
    const [selectedYear, setSelectedYear] = useState('SY');
    const [newEntry, setNewEntry] = useState({
        date: '',
        subject: '',
        startTime: '',
        endTime: ''
    });
    const [timetable, setTimetable] = useState([]);

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEntry(prevEntry => ({
            ...prevEntry,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        setTimetable(prevTimetable => [...prevTimetable, newEntry]);
        setNewEntry({
            date: '',
            subject: '',
            startTime: '',
            endTime: ''
        });
    };

    const handleReset = () => {
        setNewEntry({
            date: '',
            subject: '',
            startTime: '',
            endTime: ''
        });
    };

    return (
        <div>
            <div className="Yeartab flex bg-white m-5">
                <button onClick={() => handleYearChange('SY')} className={selectedYear === 'SY' ? 'bg-red-800 text-white pt-2 pb-2 flex-1' : ' hover:bg-red-300 transition-all flex-1'}>Sy</button>
                <button onClick={() => handleYearChange('TY')} className={selectedYear === 'TY' ? 'bg-red-800 text-white pt-2 pb-2 flex-1' : ' hover:bg-red-300 transition-all flex-1'}>Ty</button>
                <button onClick={() => handleYearChange('LY')} className={selectedYear === 'LY' ? 'bg-red-800 text-white pt-2 pb-2 flex-1' : ' hover:bg-red-300 transition-all flex-1'}>Ly</button>
            </div>
            <Timetable timetable={timetable} />
            <div className='inputbox absolute bottom-5 bg-white'>
                <input type="text" name="date" value={newEntry.date} onChange={handleInputChange} placeholder='Date' />
                <input type="text" name="subject" value={newEntry.subject} onChange={handleInputChange} placeholder='Subject' />
                <input type="text" name="startTime" value={newEntry.startTime} onChange={handleInputChange} placeholder='Start Time' />
                <input type="text" name="endTime" value={newEntry.endTime} onChange={handleInputChange} placeholder='End Time' />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleReset}>  \\\Reset</button>
            </div>
        </div>
    );
}

function Timetable({ timetable }) {
    return (
        <section className="table_body bg-gray-100 max-w-2xl mx-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2 border border-gray-400">Date</th>
                        <th className="p-2 border border-gray-400">Subject</th>
                        <th className="p-2 border border-gray-400">Start Time</th>
                        <th className="p-2 border border-gray-400">End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((entry, index) => (
                        <tr key={index} className="hover:bg-gray-300 transition-all duration-500">
                            <td className="p-2 border border-gray-400">{entry.date}</td>
                            <td className="p-2 border border-gray-400">{entry.subject}</td>
                            <td className="p-2 border border-gray-400">{entry.startTime}</td>
                            <td className="p-2 border border-gray-400">{entry.endTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Ttgeneration;
