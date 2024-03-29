import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Gettt() {
    const [timetables, setTimetables] = useState({});

    useEffect(() => {
        const fetchTimetables = async () => {
            try {
                const response = await axios.get('http://localhost:9876/getTT');
                const { timetables } = response.data;
                // Organize timetables based on year
                const organizedTimetables = timetables.reduce((acc, timetable) => {
                    const { year } = timetable;
                    if (!acc[year]) {
                        acc[year] = [];
                    }
                    acc[year].push(timetable);
                    return acc;
                }, {});
                setTimetables(organizedTimetables);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchTimetables();
    }, []);

    return (
        <div className="container mx-auto">
            {Object.entries(timetables).map(([year, timetableList]) => (
                <div key={year} className="my-8">
                    <h2 className="text-xl font-bold mb-4">{year} Timetable</h2>
                    <table className="w-full border-collapse border bg-white border-gray-300">
                        <thead className="bg-red-700 text-white">
                            <tr>
                                <th className="p-3 border border-gray-300">Date</th>
                                <th className="p-3 border border-gray-300">Subject</th>
                                <th className="p-3 border border-gray-300">Start Time</th>
                                <th className="p-3 border border-gray-300">End Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timetableList.map((timetable, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="p-3 border border-gray-300">{timetable.date}</td>
                                    <td className="p-3 border border-gray-300">{timetable.subject}</td>
                                    <td className="p-3 border border-gray-300">{timetable.start_time}</td>
                                    <td className="p-3 border border-gray-300">{timetable.end_time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default Gettt;
