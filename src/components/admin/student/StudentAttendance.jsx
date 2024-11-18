import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import PrintButton from '../../utils/PrintButton';

const StudentAttendance = () => {
    const [year, setYear] = useState('SY');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedClass, setSelectedClass] = useState('SYA');
    const [attendanceData, setAttendanceData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const apikey = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`${apikey}admin/create/vitals/${year}`);
                setSubjects(response.data || []);
                setSelectedSubject('');
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchSubjects();
    }, [year]);

    const handleFetchAttendance = async () => {
        try {
            const response = await axios.get(`${apikey}admin/${year}/${selectedSubject}/${selectedClass}`);
            setAttendanceData(response.data.response);
            if (response.data.response.length === 0) {
                toast.success("No data", { position: "bottom-right" });
                console.log(response.data)
            } else {
                toast.success("Fetched successfully", { position: "bottom-right" });
            }
        } catch (error) {
            console.error('Error fetching attendance:', error);
            toast.error("Error fetching attendance", { position: "bottom-right" });
        }
    };

    const handleEditAttendance = (student) => {
        setEditMode(true);
        setSelectedStudent({ ...student });
    };

    const handleSaveAttendance = async () => {
        try {
            await axios.put(`${apikey}admin/${year}/${selectedSubject}/${selectedClass}`, [selectedStudent]);
            setAttendanceData((prev) =>
                prev.map((item) => (item.ID === selectedStudent.ID ? selectedStudent : item))
            );
            setEditMode(false);
            setSelectedStudent(null);
            toast.success("Attendance Updated Successfully", { position: "bottom-right" });
        } catch (error) {
            console.error('Error saving attendance:', error);
            toast.error("Error saving attendance", { position: "bottom-right" });
        }
    };

    const handleDeleteClass = async () => {
        try {
            await axios.delete(`${apikey}admin/${year}/${selectedSubject}/${selectedClass}`);
            setAttendanceData([]);
            toast.success("Attendance Deleted Successfully", { position: "bottom-right" });
        } catch (error) {
            console.error('Error deleting class data:', error);
            toast.error("Error deleting attendance", { position: "bottom-right" });
        }
    };

    return (
        <div className="container">
            <Toaster />
            <div className="selection flex gap-5 mb-5">
                {/* Select Year */}
                <label className='bg-white p-2'>
                    Select Year:
                    <select className='px-2' value={year} onChange={(e) => setYear(e.target.value)}>
                        <option value="SY">SY</option>
                        <option value="TY">TY</option>
                        <option value="LY">LY</option>
                    </select>
                </label>

                {/* Select Subject */}
                <label className='bg-white p-2'>
                    Select Subject:
                    <select className='px-2' value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        <option value="">Select a Subject</option>
                        {subjects.map((subject) => (
                            <option key={subject.ID} value={subject.name}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Select Class */}
                <label className='bg-white p-2'>
                    Select Class:
                    <select className='px-2' value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                        <option value={`${year}A`}>{`${year}A`}</option>
                        <option value={`${year}B`}>{`${year}B`}</option>
                    </select>
                </label>

                <button className='p-2 bg-red-700 text-white active:bg-red-400' onClick={handleFetchAttendance}>Fetch Attendance</button>
                <button className='p-2 bg-red-700 text-white active:bg-red-400' onClick={handleDeleteClass}>Delete Class Data</button>
            </div>

            {/* Attendance Data */}
            <div id='table_body' className="table_body attendance-data bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-red-700 mb-4">Attendance Data:</h3>
                {attendanceData.length > 0 ? (
                    <table  className=" w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b-2 border-black p-3 text-red-800 text-center ">Roll No</th>
                                <th className="border-b-2 border-black p-3 text-red-800 text-center">Name</th>
                                <th className="border-b-2 border-black p-3 text-red-800 text-center">Status</th>
                                <th className="border-b-2 border-black p-3 text-red-800 text-center">Supplement</th>
                                <th className="pntbtn border-b-2 border-black p-3 text-red-800 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData
                                .slice()
                                .sort((a, b) => parseInt(a.roll_no, 10) - parseInt(b.roll_no, 10))
                                .map((entry) => (
                                    <tr key={entry.ID} className="odd:bg-gray-100 even:bg-white">
                                        <td className="p-3 text-center">{entry.roll_no}</td>
                                        <td className="p-3 text-center">
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
                                        <td className="p-3 text-center">
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
                                        <td className="p-3 text-center">
                                            {editMode && selectedStudent?.ID === entry.ID ? (
                                                <input
                                                    type="number"
                                                    className="w-full p-2 border border-red-300 rounded-md"
                                                    value={selectedStudent.supplement || 0}
                                                    onChange={(e) =>
                                                        setSelectedStudent((prev) => ({
                                                            ...prev,
                                                            Supplement: parseInt(e.target.value, 10),
                                                        }))
                                                    }
                                                />
                                            ) : (
                                                entry.supplement || 0
                                            )}
                                        </td>
                                        <td className="p-3 pntbtn text-center">
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
            <PrintButton contentId={'table_body'} />
        </div>
    );
};

export default StudentAttendance;
