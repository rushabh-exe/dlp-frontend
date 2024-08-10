import "./getatten.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const GetAttendance = () => {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const apikey = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apikey}teacher/getAttendence`, { withCredentials: true })
      .then((response) => {
        setData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const openModal = (item) => {
    setModalContent({
      ...item,
      student_data: item.student_data.map(student => ({
        ...student,
        Students: student.Students.map(stud => ({
          ...stud,
          IsPresent: stud.IsPresent || false, // Ensure all records have IsPresent
        }))
      }))
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent(null);
  };

  const handleCheckboxChange = (studentIndex, studentId, event) => {
    const updatedContent = { ...modalContent };
    updatedContent.student_data[studentIndex].Students[studentId].IsPresent = event.target.checked;
    setModalContent(updatedContent);
  };

  const handleSubmit = async () => {
    const flattenedData = modalContent.student_data.flatMap(studentData =>
      studentData.Students.map(stud => ({
        M_Teacher: modalContent.m_teacher,
        C_Teacher: modalContent.c_teacher,
        Classroom: modalContent.class_room,
        Date: modalContent.date,
        Start_Time: modalContent.start_time,
        End_Time: modalContent.end_time,
        Subject: studentData.subject,
        Year: studentData.year,
        Name: stud.name,
        RollNo: stud.roll_no,
        Class: studentData.class,
        IsPresent: stud.IsPresent,
      }))
    );
  
    console.log("Data being sent:", flattenedData);
  
    try {
      await axios.post(`${apikey}teacher/getAttendence`, flattenedData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert("Attendance updated successfully");
      closeModal();
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Failed to update attendance");
    }
  };
  

  return (
    <div>
      {data.map((item, index) => (
        <div key={index} className="TestContainer">
          <div className="Testbox" onClick={() => openModal(item)}>
            <div className="Testbox-head">
              <p>Teaching Staff: <b>{item.m_teacher}</b></p>
              <p>Non-Teaching Staff: <b>{item.c_teacher}</b></p>
            </div>
            <div className="Testbox-cd">
              <p>Class Room: {item.class_room}</p>
              <p>Date: {item.date}</p>
            </div>
            <div className="Testbox-t">
              <p>Start Time: {item.start_time}</p>
              <p>End Time: {item.end_time}</p>
            </div>
          </div>
          <br />
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Student Data Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 style={{ textAlign: "center" }}>Student Attendance</h2>
        <div className="Modal-content">
          {modalContent && modalContent.student_data.map((studentData, studentIndex) => (
            <div key={studentIndex} className="StudentDetails">
              <div className="Modal-Details">
                <p>Class Room: <b>{modalContent.class_room}</b></p>
                <p>Date: <b>{modalContent.date}</b></p>
                <p>Subject: <b>{studentData.subject}</b></p>
                <p>Year: <b>{studentData.year}</b></p>
                <p>Class: <b>{studentData.class}</b></p>
              </div>
              <div className="table-wrapper">
                <table className="at-table">
                  <thead>
                    <tr>
                      <th>Roll No</th>
                      <th>Name</th>
                      <th>Is Present</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.Students && studentData.Students.map((stud, studIndex) => (
                      <tr key={studIndex}>
                        <td>{stud.roll_no}</td>
                        <td>{stud.name}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={stud.IsPresent}
                            onChange={(event) => handleCheckboxChange(studentIndex, studIndex, event)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <div className="btnc">
          <button onClick={closeModal}>Close</button>
          <button className="mark-btn" onClick={handleSubmit}>Mark</button>
        </div>
      </Modal>
    </div>
  );
};

export default GetAttendance;

// import { useState, useEffect } from "react";
// import axios from "axios";

// function GetAttendance() {
//   const [data, setData] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [selectedTeacher, setSelectedTeacher] = useState("");
//   const [classrooms, setClassrooms] = useState([]);
//   const [students, setStudents] = useState([]);
//   const apikey = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${apikey}teacher/getAttendence`)
//       .then((response) => {
//         setData(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedTeacher) {
//       const teacherData = data
//         .find((d) => d.student_data.some((sd) => sd.subject === selectedSubject) && d.m_teacher === selectedTeacher);
//       if (teacherData) {
//         setClassrooms([teacherData]);
//         let allStudents = [];
//         teacherData.student_data.forEach((subjectData) => {
//           allStudents = [...allStudents, ...subjectData.Students];
//         });
//         setStudents(allStudents.map((student) => ({ ...student, isPresent: true })));
//       }
//     }
//   }, [selectedTeacher, selectedSubject, data]);

//   const handleSubjectChange = (event) => {
//     setSelectedSubject(event.target.value);
//     setSelectedTeacher(""); // Reset selected teacher when subject changes
//   };

//   const handleTeacherChange = (event) => {
//     setSelectedTeacher(event.target.value);
//   };

//   const handleSendAttendance = async () => {
//     try {
//       const Data = classrooms.map((classroom) => ({
//         subject: selectedSubject,
//         mainTeacher: selectedTeacher,
//         className: classroom.class_room,
//         attendance: classroom.student_data.flatMap((subjectData) =>
//           subjectData.Students.map((student) => ({
//             rollNo: student.Rollno,
//             name: student.Name,
//             isPresent: student.isPresent,
//           }))
//         ),
//       }));
//       console.log(Data);
//       const response = await axios.post(`${apikey}teacher/getAttendence`, Data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error sending attendance:", error);
//     }
//   };

//   return (
//     <>
//       <div className="container p-4">
//         <div className="mb-4">
//           <select
//             className="p-2 border border-gray-300 rounded"
//             onChange={handleSubjectChange}
//             value={selectedSubject}
//           >
//             <option value="">Select Subject</option>
//             {data.flatMap((allocation) =>
//               allocation.student_data.map((subject, idx) => (
//                 <option key={idx} value={subject.subject}>
//                   {subject.subject}
//                 </option>
//               ))
//             )}
//           </select>
//           {selectedSubject && (
//             <select
//               className="ml-2 p-2 border border-gray-300 rounded"
//               onChange={handleTeacherChange}
//               value={selectedTeacher}
//             >
//               <option value="">Select Teacher</option>
//               {data
//                 .filter((d) => d.student_data.some((sd) => sd.subject === selectedSubject))
//                 .map((d, index) => (
//                   <option key={index} value={d.m_teacher}>
//                     {d.m_teacher}
//                   </option>
//                 ))}
//             </select>
//           )}
//         </div>
//         {selectedTeacher && (
//           <div className="">
//             <table className="w-full border-collapse border border-gray-300">
//               <tbody>
//                 {classrooms.map((classroom, index) => (
//                   <tr key={index}>
//                     <td className="p-2 border border-gray-300">
//                       <th className="p-2 border border-gray-300">Classroom</th>
//                       {classroom.class_room}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {classrooms.map((classroom, index) => (
//               <div className="overflow-y-scroll h-52 mb-2" key={index}>
//                 <h3 className="text-lg font-bold">
//                   {classroom.class_room} Students
//                 </h3>
//                 <table className="w-full border-collapse border border-gray-300 mb-4">
//                   <thead>
//                     <tr className="bg-red-700 text-white">
//                       <th className="p-2 border border-gray-300">Roll No.</th>
//                       <th className="p-2 border border-gray-300">Name</th>
//                       <th className="p-2 border border-gray-300">IsPresent</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white">
//                     {classroom.student_data.flatMap((subjectData) =>
//                       subjectData.Students.map((student, index) => (
//                         <tr key={index}>
//                           <td className="p-2 border border-gray-300">
//                             {student.Rollno}
//                           </td>
//                           <td className="p-2 border border-gray-300">
//                             {student.Name}
//                           </td>
//                           <td className="p-2 border border-gray-300">
//                             <input
//                               type="checkbox"
//                               defaultChecked={true}
//                               onChange={(e) => {
//                                 const isChecked = e.target.checked;
//                                 setStudents((prevStudents) =>
//                                   prevStudents.map((prevStudent) =>
//                                     prevStudent.Rollno === student.Rollno
//                                       ? { ...prevStudent, isPresent: isChecked }
//                                       : prevStudent
//                                   )
//                                 );
//                               }}
//                             />
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//           </div>
//         )}
//         <button className="bg-red-700 px-4 text-white mt-2" onClick={handleSendAttendance}>
//           Send
//         </button>
//       </div>
//     </>
//   );
// }

// export default GetAttendance;
