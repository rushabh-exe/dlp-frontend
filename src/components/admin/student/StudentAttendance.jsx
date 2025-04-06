import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import pdfmake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {leftimage} from '../../../assets/leftimageData'
import {rightimage} from '../../../assets/rightimageData'
pdfmake.vfs = pdfFonts.vfs;
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
            console.log(response.data.response);
            if (response.data.response.length === 0) {
                toast.success("No data", { position: "bottom-right" });
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
    const [url, setUrl] = useState(null)

    const createPdf = () => {
        if (!attendanceData || attendanceData.length === 0) {
            toast.error("No data available to generate PDF");
            return;
        }

        const docDefinition = {
            content: [
                {
                    columns: [
                        {
                            image: `${leftimage}`,
                            width: 50,
                            height: 50,
                            alignment: 'center',
                            margin: [0, 5, 0, 0]
                        },
                        {
                            stack: [
                                {
                                    text: 'K. J. Somaiya Institute of Technology Sion, Mumbai-22',
                                    style: 'headerLarge',
                                    alignment: 'center'
                                },
                                {
                                    text: 'An Autonomous Institute permanently affiliated to University of Mumbai',
                                    style: 'headerSmall',
                                    alignment: 'center'
                                },
                                {
                                    text: 'Accredited by NAAC and NBA, Approved by AICTE, New Delhi',
                                    style: 'headerSmall',
                                    alignment: 'center'
                                }
                            ],
                            alignment: 'center'
                        },
                        {
                            image: `${rightimage}`,
                            width: 50,
                            height: 50,
                            alignment: 'center',
                            margin: [0, 5, 0, 0]
                        }
                    ]
                },
                {
                    stack: [
                        {
                            text: `Department of Electronics and Telecommunication Engineering`,
                            alignment: 'center',
                            fontSize: 13,
                            margin: [0, 15, 0, 5]
                        },
                        {
                            text: `${selectedClass} - ${selectedSubject} Attendance`,
                            alignment: 'center',
                            fontSize: 12,
                            margin: [0, 0, 0, 15]
                        }
                    ]
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*', 'auto', 'auto','auto'],
                        body: [
                            [
                                { text: 'Roll No', style: 'tableHeader', alignment: 'center' },
                                { text: 'Name', style: 'tableHeader', alignment: 'center' },
                                { text: 'Status', style: 'tableHeader', alignment: 'center' },
                                { text: 'Supplement', style: 'tableHeader', alignment: 'center' },
                                { text: 'Sign', style: 'tableHeader', alignment: 'center' }
                            ],
                            ...attendanceData
                                .sort((a, b) => parseInt(a.roll_no, 10) - parseInt(b.roll_no, 10))
                                .map(item => [
                                    { text: item.roll_no || '', alignment: 'center' },
                                    { text: item.name || '', alignment: 'center' },
                                    { text: item.is_present ? 'Present' : 'Absent', alignment: 'center' },
                                    { text: item.supplement || '0', alignment: 'center' },
                                    { text: '', alignment: 'center' }
                                ])
                        ]
                    },
                    layout: {
                        hLineWidth: function (i, node) { return 1; },
                        vLineWidth: function (i, node) { return 1; },
                        hLineColor: function (i, node) { return '#ddd'; },
                        vLineColor: function (i, node) { return '#ddd'; },
                        paddingLeft: function (i) { return 10; },
                        paddingRight: function (i) { return 10; },
                        paddingTop: function (i) { return 5; },
                        paddingBottom: function (i) { return 5; }
                    }
                },
                {
                    text: '*All Invigilators are required to report in Lab 603 before 20 minutes of commencement of examination',
                    fontSize: 12,
                    margin: [0, 20, 0, 0]
                  }
                  ,
                  {
                    columns: [
                      {
                        text: 'Test Coordinator\nMs.S\nMr.A\nMs.C',
                        style: 'LeftText',
                        margin: [0, 20, 0, 0]
                      },
                      {
                        text: 'HOD EXTC\nDr.J',
                        style: 'RightText',
                        margin: [0, 20, 0, 0],
                        alignment: 'right'
                      }
                    ]
                  }
            ],
            styles: {
                headerLarge: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 0, 0, 5]
                },
                headerSmall: {
                    fontSize: 10,
                    margin: [0, 0, 0, 3]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 11,
                    fillColor: '#f3f4f6'
                }
            },
            defaultStyle: {
                fontSize: 10
            },
            pageMargins: [40, 40, 40, 40],
            pageSize: 'A4'
        };

        try {
            const pdfGenerator = pdfmake.createPdf(docDefinition);
            pdfGenerator.getBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${selectedClass}_${selectedSubject}_attendance.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            });

            toast.success("PDF generated successfully");
        } catch (error) {
            console.error('PDF generation error:', error);
            toast.error("Failed to generate PDF");
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
                    <table className=" w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b-2 border-black p-3 text-red-800 text-center ">Roll No</th>
                                <th className="border-b-2 border-black p-3 text-red-800 text-center">Name</th>
                                <th className="border-b-2 border-black p-3 text-red-800 text-center">Status</th>
                                <th className="border-b-2 border-black p-3 text-red-800 text-center">Supplement</th>
                                <th className="border-b-2 border-black p-3 text-red-800 text-center">Actions</th>
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
                                                            supplement: parseInt(e.target.value, 10),
                                                        }))
                                                    }
                                                />
                                            ) : (
                                                entry.supplement || 0
                                            )}
                                        </td>
                                        <td className="p-3 text-center">
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
            <button
                onClick={createPdf}
                className="pntbtn fixed bottom-5 right-40 bg-red-800 text-white w-fit p-2"
            >
                Generate PDF
            </button>
        </div>
    );
};

export default StudentAttendance;
