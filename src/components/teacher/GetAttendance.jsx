import React, { useState, useEffect } from "react";
import axios from "axios";

function GetAttendance() {
  const [data, setData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [ testdata , setTestdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9876/lol")//http://localhost:3001/teacher/getAttendence //get post put
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/teacher/getAttendence")//http://localhost:3001/teacher/getAttendence //get post put
      .then((response) => {
        setTestdata(response.data);
        console.log(testdata)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedTeacher) {
      const teacherData = data
        .find((d) => d.Subject === selectedSubject)
        .Teacher.find((t) => t.Main_Teacher === selectedTeacher);
      if (teacherData) {
        setClassrooms(teacherData.Out);
        let allStudents = [];
        teacherData.Out.forEach((classroom) => {
          allStudents = [...allStudents, ...classroom.Students];
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
        className: classroom.Class_Name,
        attendance: classroom.Students.map((student) => ({
          rollNo: student.Rollno,
          name: student.Name,
          isPresent: student.isPresent,
        })),
      }));
      console.log(Data);
      const response = await axios.post("http://localhost:9876/createAttend", Data);
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
            {data.map((subject, index) => (
              <option key={index} value={subject.Subject}>
                {subject.Subject}
              </option>
            ))}
          </select>
          {selectedSubject && (
            <select
              className="ml-2 p-2 border border-gray-300 rounded"
              onChange={handleTeacherChange}
              value={selectedTeacher}
            >
              <option value="">Select Teacher</option>
              {data
                .find((d) => d.Subject === selectedSubject)
                .Teacher.map((teacher, index) => (
                  <option key={index} value={teacher.Main_Teacher}>
                    {teacher.Main_Teacher}
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
                      {classroom.Class_Room}
                    </td>
                    <td className="p-2 border border-gray-300">
                      <th className="p-2 border border-gray-300">Class Name</th>
                      {classroom.Class_Name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {classrooms.map((classroom, index) => (
              <div className=" overflow-y-scroll h-52 mb-2" key={index}>
                <h3 className="text-lg font-bold">
                  {classroom.Class_Name} Students
                </h3>
                <table className="w-full  border-collapse border border-gray-300 mb-4">
                  <thead>
                    <tr className=" bg-red-700 text-white">
                      <th className="p-2 border border-gray-300">Roll No.</th>
                      <th className="p-2 border border-gray-300">Name</th>
                      <th className="p-2 border border-gray-300">IsPresent</th>
                    </tr>
                  </thead>
                  <tbody className=" bg-white">
                    {classroom.Students.map((student, index) => (
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
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
        <button className=" bg-red-700 px-4 text-white mt-2" onClick={handleSendAttendance}>Send</button>
      </div>
    </>
  );
}

export default GetAttendance;
