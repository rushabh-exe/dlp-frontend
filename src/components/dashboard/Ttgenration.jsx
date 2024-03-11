import React, { useState } from 'react';
import axios from 'axios';

function Ttgeneration() {
    const [selectedYear, setSelectedYear] = useState('SY');
    const [newEntry, setNewEntry] = useState({
        date: '',
        subject: '',
        startTime: '',
        endTime: ''
    });

    // Separate state variables for each year's timetable
    const [timetableSY, setTimetableSY] = useState([]);
    const [timetableTY, setTimetableTY] = useState([]);
    const [timetableLY, setTimetableLY] = useState([]);

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
        // Check if any of the fields are empty
        if (!newEntry.date || !newEntry.subject || !newEntry.startTime || !newEntry.endTime) {
            alert('Please fill in all fields');
            return; // Exit function if any field is empty
        }

        // Update the timetable based on the selected year
        switch (selectedYear) {
            case 'SY':
                setTimetableSY(prevTimetable => [...prevTimetable, newEntry]);
                break;
            case 'TY':
                setTimetableTY(prevTimetable => [...prevTimetable, newEntry]);
                break;
            case 'LY':
                setTimetableLY(prevTimetable => [...prevTimetable, newEntry]);
                break;
            default:
                break;
        }
        // Reset the new entry form fields
        setNewEntry({
            date: '',
            subject: '',
            startTime: '',
            endTime: ''
        });
    };


    const handleReset = () => {
        // Reset the new entry form fields
        setNewEntry({
            date: '',
            subject: '',
            startTime: '',
            endTime: ''
        });

        // Reset the corresponding timetable based on the selected year
        switch (selectedYear) {
            case 'SY':
                setTimetableSY([]);
                break;
            case 'TY':
                setTimetableTY([]);
                break;
            case 'LY':
                setTimetableLY([]);
                break;
            default:
                break;
        }
    };


    const handleSubmit = async () => {
        try {
            let requestBody;
            // Determine the timetable based on the selected year
            switch (selectedYear) {
                case 'SY':
                    requestBody = { reqAll: timetableSY };
                    break;
                case 'TY':
                    requestBody = { reqAll: timetableTY };
                    break;
                case 'LY':
                    requestBody = { reqAll: timetableLY };
                    break;
                default:
                    break;
            }
            // Log the request body
            console.log('Post Request Body:', requestBody);
            // Make the axios post request
            const response = await axios.post('http://localhost:3000/api/creatett', requestBody);
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    let selectedTimetable;
    // Select the timetable based on the selected year
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
                    <input type="text" name="date" value={newEntry.date} onChange={handleInputChange} placeholder='Date' />
                    <input type="text" name="subject" value={newEntry.subject} onChange={handleInputChange} placeholder='Subject' />
                    <input type="text" name="startTime" value={newEntry.startTime} onChange={handleInputChange} placeholder='Start Time' />
                    <input type="text" name="endTime" value={newEntry.endTime} onChange={handleInputChange} placeholder='End Time' />
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