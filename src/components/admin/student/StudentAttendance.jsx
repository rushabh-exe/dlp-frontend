import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const StudentAttendance = () => {
    const [year, setYear] = useState('SY');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedClass, setSelectedClass] = useState('SYA');
    const [attendanceData, setAttendanceData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        // Fetch subjects based on the selected year
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`http://localhost:5051/admin/create/vitals/${year}`);
                setSubjects(response.data || []);  // assuming the API returns an array of subjects
                setSelectedSubject('');  // Reset subject selection
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchSubjects();
    }, [year]);

    const handleFetchAttendance = async () => {
        try {
            const response = await axios.get(`http://localhost:5051/admin/${year}/${selectedSubject}/${selectedClass}`);
            setAttendanceData(response.data.response);
            console.log(response.data.response);
            if (response.data.response.length === 0) {
                toast.success("No data",{position: "bottom-right"})
            } else {
                toast.success("fetch successfully",{position: "bottom-right"})
            }
        } catch (error) {
            console.error('Error fetching attendance:', error);
            toast.error("error fetching attendance",{position: "bottom-right"})

        }
    };

    const handleEditAttendance = (student) => {
        setEditMode(true);
        setSelectedStudent({ ...student });
    };

    const handleSaveAttendance = async () => {
        try {
            await axios.put(`http://localhost:5051/admin/${year}/${selectedSubject}/${selectedClass}`, [selectedStudent]);
            // Update the attendance data after saving
            setAttendanceData((prev) =>
                prev.map((item) => (item.ID === selectedStudent.ID ? selectedStudent : item))
            );
            setEditMode(false);
            setSelectedStudent(null);
            toast.success("Attendance Updated Successfully",{position: "bottom-right"})
        } catch (error) {
            console.error('Error saving attendance:', error);
            toast.error("Error saving attendance",{position: "bottom-right"})

        }
    };

    const handleDeleteClass = async () => {
        try {
            await axios.delete(`http://localhost:5051/admin/${year}/${selectedSubject}/${selectedClass}`);
            // Clear the attendance data after deletion
            setAttendanceData([]);
            toast.success("attendance Deleted Successfully",{position: "bottom-right"})
        } catch (error) {
            console.error('Error deleting class data:', error);
            toast.error("Error Deleting attendance",{position: "bottom-right"})
        }
    };

    return (
        <div className="container">
            <Toaster/>
            <div className="selection">
                <label>
                    Select Year:
                    <select value={year} onChange={(e) => setYear(e.target.value)}>
                        <option value="SY">SY</option>
                        <option value="TY">TY</option>
                        <option value="LY">LY</option>
                    </select>
                </label>

                <label>
                    Select Subject:
                    <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        <option value="">Select a Subject</option>
                        {subjects.map((subject) => (
                            <option key={subject.ID} value={subject.name}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Select Class:
                    <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                        <option value={`${year}A`}>{`${year}A`}</option>
                        <option value={`${year}B`}>{`${year}B`}</option>
                    </select>
                </label>

                <button onClick={handleFetchAttendance}>Fetch Attendance</button>
                <button onClick={handleDeleteClass}>Delete Class Data</button>
            </div>

            <div className="attendance-data bg-red-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-red-700 mb-4 text-center">Attendance Data:</h3>
                {attendanceData.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b-2 border-red-200 p-3 text-red-800">Name</th>
                                <th className="border-b-2 border-red-200 p-3 text-red-800">Roll No</th>
                                <th className="border-b-2 border-red-200 p-3 text-red-800">Status</th>
                                <th className="border-b-2 border-red-200 p-3 text-red-800">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData
                                .slice()
                                .sort((a, b) => parseInt(a.roll_no, 10) - parseInt(b.roll_no, 10))
                                .map((entry) => (
                                    <tr key={entry.ID} className="odd:bg-red-100 even:bg-red-50">
                                        <td className="p-3">
                                            {editMode && selectedStudent?.ID === entry.ID ? (
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border border-red-300 rounded-md"
                                                    value={selectedStudent.name}
                                                    onChange={(e) =>
                                                        setSelectedStudent((prev) => ({ ...prev, name: e.target.value }))
                                                    }
                                                />
                                            ) : (
                                                entry.name
                                            )}
                                        </td>
                                        <td className="p-3">{entry.roll_no}</td>
                                        <td className="p-3">
                                            {editMode && selectedStudent?.ID === entry.ID ? (
                                                <select
                                                    className="w-full p-2 border border-red-300 rounded-md"
                                                    value={selectedStudent.is_present}
                                                    onChange={(e) =>
                                                        setSelectedStudent((prev) => ({
                                                            ...prev,
                                                            is_present: e.target.value === 'true',
                                                        }))
                                                    }
                                                >
                                                    <option value="true">Present</option>
                                                    <option value="false">Absent</option>
                                                </select>
                                            ) : (
                                                entry.is_present ? 'Present' : 'Absent'
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {editMode && selectedStudent?.ID === entry.ID ? (
                                                <button
                                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                                                    onClick={handleSaveAttendance}
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                                                    onClick={() => handleEditAttendance(entry)}
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-red-700 italic text-center mt-4">No data available.</p>
                )}
            </div>


        </div>
    );
};

export default StudentAttendance;
