import React, { useState, useEffect } from 'react';
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

            <div className="attendance-data">
                <h3>Attendance Data:</h3>
                {attendanceData.length > 0 ? (
                    <ul>
                        {attendanceData.map((entry) => (
                            <li key={entry.ID}>
                                {editMode && selectedStudent?.ID === entry.ID ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={selectedStudent.name}
                                            onChange={(e) =>
                                                setSelectedStudent((prev) => ({ ...prev, name: e.target.value }))
                                            }
                                        />
                                        <select
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
                                        <button onClick={handleSaveAttendance}>Save</button>
                                    </div>
                                ) : (
                                    <div>
                                        {entry.name} ({entry.roll_no}) - {entry.is_present ? 'Present' : 'Absent'}
                                        <button onClick={() => handleEditAttendance(entry)}>Edit</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </div>
    );
};

export default StudentAttendance;
