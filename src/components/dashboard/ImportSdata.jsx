import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TimetableComponent() {
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
        <div>
            {Object.entries(timetables).map(([year, timetableList]) => (
                <div key={year}>
                    <h2>{year} Timetable</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Subject</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timetableList.map((timetable, index) => (
                                <tr key={index}>
                                    <td>{timetable.date}</td>
                                    <td>{timetable.subject}</td>
                                    <td>{timetable.start_time}</td>
                                    <td>{timetable.end_time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default TimetableComponent;
