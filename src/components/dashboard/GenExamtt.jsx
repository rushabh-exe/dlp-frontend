import React, { useState } from 'react';
import axios from 'axios';

function GenExamtt() {
    const [selectedYear, setSelectedYear] = useState('SY');
    const [newEntry, setNewEntry] = useState({
        date: '',
        subject: '',
        start_time: '',
        endTime_time: ''
    });

    const [timetableSY, setTimetableSY] = useState([]);
    const [timetableTY, setTimetableTY] = useState([]);
    const [timetableLY, setTimetableLY] = useState([]);

    const handleYearChange = (year) => {
        setSelectedYear(year);
        setNewEntry(prevEntry => ({
            ...prevEntry,
            year: year 
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEntry(prevEntry => ({
            ...prevEntry,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        if (!newEntry.date || !newEntry.subject || !newEntry.start_time || !newEntry.end_time) {
            alert('Please fill in all fields');
            return; 
        }
    
        const startTime = new Date(`2022-01-01T${newEntry.start_time}`);
        const formattedStartTime = startTime.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        const endTime = new Date(`2022-01-01T${newEntry.end_time}`);
        const formattedEndTime = endTime.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        switch (selectedYear) {
            case 'SY':
                setTimetableSY(prevTimetable => [...prevTimetable, {
                    ...newEntry,
                    start_time: formattedStartTime,
                    end_time: formattedEndTime
                }]);
                break;
            case 'TY':
                setTimetableTY(prevTimetable => [...prevTimetable, {
                    ...newEntry,
                    start_time: formattedStartTime,
                    end_time: formattedEndTime
                }]);
                break;
            case 'LY':
                setTimetableLY(prevTimetable => [...prevTimetable, {
                    ...newEntry,
                    start_time: formattedStartTime,
                    end_time: formattedEndTime
                }]);
                break;
            default:
                break;
        }
        setNewEntry({
            date: '',
            subject: '',
            start_time: '',
            end_time: ''
        });
    };
    


    const handleReset = () => {
        switch (selectedYear) {
            case 'SY':
                setTimetableSY(prevTimetable => prevTimetable.slice(0, -1));
                break;
            case 'TY':
                setTimetableTY(prevTimetable => prevTimetable.slice(0, -1)); 
                break;
            case 'LY':
                setTimetableLY(prevTimetable => prevTimetable.slice(0, -1)); 
                break;
            default:
                break;
        }
    
        setNewEntry({
            date: '',
            subject: '',
            start_time: '',
            end_time: ''
        });
    };
    


    const handleSubmit = async () => {
        try {
            let requestBody;
            setNewEntry(prevEntry => ({
                ...prevEntry,
                year: selectedYear
            }));
            switch (selectedYear) {
                case 'SY':
                    requestBody = { reqAll: timetableSY, year: selectedYear };
                    break;
                case 'TY':
                    requestBody = { reqAll: timetableTY, year: selectedYear };
                    break;
                case 'LY':
                    requestBody = { reqAll: timetableLY, year: selectedYear };
                    break;
                default:
                    break;
            }
            console.log('Post Request Body:', requestBody);
            const response = await axios.post('http://localhost:9876/createTT', requestBody);
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    


    let selectedTimetable;
    switch (selectedYear) {
        case 'SY':
            selectedTimetable = timetableSY;
            break;
        case 'TY':
            selectedTimetable = timetableTY;
            break;
        case 'LY':
            selectedTimetable = timetableLY;
            break;
        default:
            break;
    }

    return (
        <div>
            <div className="Yeartab flex bg-white m-5">
                <button onClick={() => handleYearChange('SY')} className={selectedYear === 'SY' ? 'bg-red-800 text-white pt-2 pb-2 flex-1' : ' hover:bg-red-300 transition-all flex-1'}>Sy</button>
                <button onClick={() => handleYearChange('TY')} className={selectedYear === 'TY' ? 'bg-red-800 text-white pt-2 pb-2 flex-1' : ' hover:bg-red-300 transition-all flex-1'}>Ty</button>
                <button onClick={() => handleYearChange('LY')} className={selectedYear === 'LY' ? 'bg-red-800 text-white pt-2 pb-2 flex-1' : ' hover:bg-red-300 transition-all flex-1'}>Ly</button>
            </div>
            <div className=' m-5'>
                <div className='inputbox flex justify-between mb-5'>
                    <input type="date" name="date" value={newEntry.date} onChange={handleInputChange} placeholder='Date' />
                    <input type="text" name="subject" value={newEntry.subject} onChange={handleInputChange} placeholder='Subject' />
                    <input type="time" name="start_time" value={newEntry.start_time} onChange={handleInputChange} placeholder='Start Time' />
                    <input type="time" name="end_time" value={newEntry.end_time} onChange={handleInputChange} placeholder='End Time' />
                    <div className="">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleUpdate}>Update</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleReset}>Reset</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Confirm</button>
                    </div>

                </div>
                <Timetable timetable={selectedTimetable} />
                
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

export default GenExamtt;