import { useState, useEffect } from "react";
import axios from "axios";

function GetAttendance() {
  const [data, setData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [students, setStudents] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apikey}teacher/getAttendence`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedTeacher) {
      const teacherData = data
        .find((d) => d.student_data.some((sd) => sd.subject === selectedSubject) && d.m_teacher === selectedTeacher);
      if (teacherData) {
        setClassrooms([teacherData]);
        let allStudents = [];
        teacherData.student_data.forEach((subjectData) => {
          allStudents = [...allStudents, ...subjectData.Students];
        });
        setStudents(allStudents.map((student) => ({ ...student, isPresent: true })));
      }
    }
  }, [selectedTeacher, selectedSubject, data]);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedTeacher(""); // Reset selected teacher when subject changes
  };

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleSendAttendance = async () => {
    try {
      const Data = classrooms.map((classroom) => ({
        subject: selectedSubject,
        mainTeacher: selectedTeacher,
        className: classroom.class_room,
        attendance: classroom.student_data.flatMap((subjectData) =>
          subjectData.Students.map((student) => ({
            rollNo: student.Rollno,
            name: student.Name,
            isPresent: student.isPresent,
          }))
        ),
      }));
      console.log(Data);
      const response = await axios.post(`${apikey}teacher/getAttendence`, Data);
      console.log(response.data);
    } catch (error) {
      console.error("Error sending attendance:", error);
    }
  };

  return (
    <>
      <div className="container p-4">
        <div className="mb-4">
          <select
            className="p-2 border border-gray-300 rounded"
            onChange={handleSubjectChange}
            value={selectedSubject}
          >
            <option value="">Select Subject</option>
            {data.flatMap((allocation) =>
              allocation.student_data.map((subject, idx) => (
                <option key={idx} value={subject.subject}>
                  {subject.subject}
                </option>
              ))
            )}
          </select>
          {selectedSubject && (
            <select
              className="ml-2 p-2 border border-gray-300 rounded"
              onChange={handleTeacherChange}
              value={selectedTeacher}
            >
              <option value="">Select Teacher</option>
              {data
                .filter((d) => d.student_data.some((sd) => sd.subject === selectedSubject))
                .map((d, index) => (
                  <option key={index} value={d.m_teacher}>
                    {d.m_teacher}
                  </option>
                ))}
            </select>
          )}
        </div>
        {selectedTeacher && (
          <div className="">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                {classrooms.map((classroom, index) => (
                  <tr key={index}>
                    <td className="p-2 border border-gray-300">
                      <th className="p-2 border border-gray-300">Classroom</th>
                      {classroom.class_room}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {classrooms.map((classroom, index) => (
              <div className="overflow-y-scroll h-52 mb-2" key={index}>
                <h3 className="text-lg font-bold">
                  {classroom.class_room} Students
                </h3>
                <table className="w-full border-collapse border border-gray-300 mb-4">
                  <thead>
                    <tr className="bg-red-700 text-white">
                      <th className="p-2 border border-gray-300">Roll No.</th>
                      <th className="p-2 border border-gray-300">Name</th>
                      <th className="p-2 border border-gray-300">IsPresent</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {classroom.student_data.flatMap((subjectData) =>
                      subjectData.Students.map((student, index) => (
                        <tr key={index}>
                          <td className="p-2 border border-gray-300">
                            {student.Rollno}
                          </td>
                          <td className="p-2 border border-gray-300">
                            {student.Name}
                          </td>
                          <td className="p-2 border border-gray-300">
                            <input
                              type="checkbox"
                              defaultChecked={true}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                setStudents((prevStudents) =>
                                  prevStudents.map((prevStudent) =>
                                    prevStudent.Rollno === student.Rollno
                                      ? { ...prevStudent, isPresent: isChecked }
                                      : prevStudent
                                  )
                                );
                              }}
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
        <button className="bg-red-700 px-4 text-white mt-2" onClick={handleSendAttendance}>
          Send
        </button>
      </div>
    </>
  );
}

export default GetAttendance;
