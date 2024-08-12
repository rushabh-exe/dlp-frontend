import React from 'react'

function TimetableC({ timetable, onDelete }) {
    return (
        <section className="table_body bg-gray-100 max-w-2xl mx-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2 border border-gray-400">Date</th>
                        <th className="p-2 border border-gray-400">Subject</th>
                        <th className="p-2 border border-gray-400">Start Time</th>
                        <th className="p-2 border border-gray-400">End Time</th>
                        <th className="p-2 border border-gray-400">Actions</th> {/* Add Actions column */}
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((entry, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 p-2">{entry.date.slice(0, 10)}</td>
                            <td className="border border-gray-400 p-2">{entry.subject}</td>
                            <td className="border border-gray-400 p-2">{entry.start_time}</td>
                            <td className="border border-gray-400 p-2">{entry.end_time}</td>
                            <td className="border border-gray-400 p-2">
                                <button onClick={() => onDelete(index)}>Delete</button> {/* Add Delete button */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
export default TimetableC