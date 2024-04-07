import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetTimeTable = ( { year } ) => {
    const [fetchedTimetables, setFetchedTimetables] = useState([]);
    const [selectYear, setSelectYear] = useState(year); // Default value for selectYear

    // Function to fetch timetables from the backend
    const fetchTimetables = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/admin/get/timetable/${selectYear}`);
            setFetchedTimetables(response.data.timetables);
        } catch (error) {
            console.error('Error fetching timetables:', error);
        }
    };

    // Use useEffect to fetch timetables when the component mounts or when selectYear changes
    useEffect(() => {
        fetchTimetables();
    }, [selectYear]);

    const handleSelectYearChange = (e) => {
        setSelectYear(e.target.value);
    };

    return (
        <div>
            <select className='p-2' name="selectYear" id="selectYear" value={selectYear} onChange={handleSelectYearChange}>
                <option value="sy">sy</option>
                <option value="ty">ty</option>
                <option value="ly">ly</option>
            </select>
            <section className="table_body bg-gray-100 max-w-2xl mx-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="p-2 border border-gray-400">Date</th>
                            <th className="p-2 border border-gray-400">Subject</th>
                            <th className="p-2 border border-gray-400">Start Time</th>
                            <th className="p-2 border border-gray-400">End Time</th>
                            <th className="p-2 border border-gray-400">Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchedTimetables.map((entry, index) => (
                            <tr key={index} className="hover:bg-gray-300 transition-all duration-500">
                                <td className="p-2 border border-gray-400">{entry.date}</td>
                                <td className="p-2 border border-gray-400">{entry.subject}</td>
                                <td className="p-2 border border-gray-400">{entry.start_time}</td>
                                <td className="p-2 border border-gray-400">{entry.end_time}</td>
                                <td className="p-2 border border-gray-400">{entry.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default GetTimeTable;
