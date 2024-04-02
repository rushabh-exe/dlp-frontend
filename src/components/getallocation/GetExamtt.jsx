// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function GetExamtt() {
//     const [timetables, setTimetables] = useState({
//         2022: [
//             { date: '2022-01-01', subject: 'Math', start_time: '09:00 AM', end_time: '10:30 AM' },
//             { date: '2022-01-02', subject: 'Science', start_time: '10:00 AM', end_time: '11:30 AM' },
            
//             // Add more timetable data for the year 2022 if needed
//         ],
//         2023: [
//             { date: '2023-01-01', subject: 'English', start_time: '09:00 AM', end_time: '10:30 AM' },
//             { date: '2023-01-02', subject: 'History', start_time: '10:00 AM', end_time: '11:30 AM' },
//             // Add more timetable data for the year 2023 if needed
//         ],
//         // Add more years and timetable data as needed
//     });

//     useEffect(() => {
//         const fetchTimetables = async () => {
//             try {
//                 const response = await axios.get('http://localhost:9876/getTT');
//                 const { timetables } = response.data;
//                 // Organize timetables based on year
//                 const organizedTimetables = timetables.reduce((acc, timetable) => {
//                     const { year } = timetable;
//                     if (!acc[year]) {
//                         acc[year] = [];
//                     }
//                     acc[year].push(timetable);
//                     return acc;
//                 }, {});
//                 setTimetables(organizedTimetables);
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };

//         fetchTimetables();
//     }, []);

//     return (
//         <div className="container mx-auto">
//             {Object.entries(timetables).map(([year, timetableList]) => (
//                 <div key={year} className="my-8">
//                     <h2 className="text-xl font-bold mb-4">{year} Timetable</h2>
//                     <table className="w-full border-collapse border bg-white border-gray-300">
//                         <thead className="bg-red-700 text-white">
//                             <tr>
//                                 <th className="p-3 border border-gray-300">Date</th>
//                                 <th className="p-3 border border-gray-300">Subject</th>
//                                 <th className="p-3 border border-gray-300">Start Time</th>
//                                 <th className="p-3 border border-gray-300">End Time</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {timetableList.map((timetable, index) => (
//                                 <tr key={index} className="hover:bg-gray-100">
//                                     <td className="p-3 border border-gray-300">{timetable.date}</td>
//                                     <td className="p-3 border border-gray-300">{timetable.subject}</td>
//                                     <td className="p-3 border border-gray-300">{timetable.start_time}</td>
//                                     <td className="p-3 border border-gray-300">{timetable.end_time}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default GetExamtt;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetExamtt = () => {
    const [fetchedTimetables, setFetchedTimetables] = useState([]);
    // const year = "SY"
    // Function to fetch timetables from the backend
    const fetchTimetables = async () => {
        try {
            const response = await axios.get('http://localhost:3001/admin/get/timetable');
            setFetchedTimetables(response.data.timetables);
        } catch (error) {
            console.error('Error fetching timetables:', error);
        }
    };

    // Use useEffect to fetch timetables when the component mounts
    useEffect(() => {
        fetchTimetables();
    }, []);

    return (
        <div>
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

export default GetExamtt;