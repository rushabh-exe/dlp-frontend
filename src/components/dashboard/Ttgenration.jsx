import React, { useState } from 'react';
import axios from 'axios';

function Ttgeneration() {
    const [selectedYear, setSelectedYear] = useState('SY');
    const [newEntry, setNewEntry] = useState({
        date: '',
        subject: '',
        start_time: '',
        end_time: ''
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
        const updatedEntry = {
            ...newEntry,
            year: selectedYear
        };
        setTimetable(prevTimetable => [...prevTimetable, updatedEntry]);
        setNewEntry({
            date: '',
            subject: '',
            start_time: '',
            end_time: ''
        });
    };
    

    const handleReset = () => {
        setNewEntry({
            date: '',
            subject: '',
            start_time: '',
            end_time: ''
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:9876/createTT', {
                reqAll: timetable
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
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
                <input type="text" name="start_time" value={newEntry.start_time} onChange={handleInputChange} placeholder='Start Time' />
                <input type="text" name="end_time" value={newEntry.end_time} onChange={handleInputChange} placeholder='End Time' />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleSubmit}>Confirm</button>
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
                            <td className="p-2 border border-gray-400">{entry.start_time}</td>
                            <td className="p-2 border border-gray-400">{entry.end_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Ttgeneration;