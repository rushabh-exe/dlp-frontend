import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";

Modal.setAppElement("#root");

const GetAttendance = () => {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const apikey = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apikey}teacher/getAttendence`, { withCredentials: true });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data", {position:"top-center"});
      }
    };

    fetchData();
  }, [apikey]);

  const openModal = (item) => {
    const initializedItem = {
      ...item,
      student_data: item.student_data.map(student => ({
        ...student,
        Students: student.Students.map(stud => ({
          ...stud,
          IsPresent: stud.IsPresent || true,
          supplement: stud.supplement || "0",
        }))
      }))
    };
    setModalContent(initializedItem);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent(null);
  };

  const handleCheckboxChange = (studentIndex, studIndex, event) => {
    if (modalContent) {
      const updatedStudents = modalContent.student_data[studentIndex].Students.map((stud, idx) =>
        idx === studIndex ? { ...stud, IsPresent: event.target.checked } : stud
      );

      const updatedStudentData = [...modalContent.student_data];
      updatedStudentData[studentIndex].Students = updatedStudents;

      setModalContent({ ...modalContent, student_data: updatedStudentData });
    }
  };

  // Add this new handler for supplement updates
  const handleSupplementChange = (studentIndex, studIndex, event) => {
    if (modalContent) {
      const updatedStudents = modalContent.student_data[studentIndex].Students.map((stud, idx) =>
        idx === studIndex ? { ...stud, supplement: event.target.value } : stud
      );

      const updatedStudentData = [...modalContent.student_data];
      updatedStudentData[studentIndex].Students = updatedStudents;

      setModalContent({ ...modalContent, student_data: updatedStudentData });
    }
  };

  const handleSubmit = async () => {
    if (modalContent) {
      const flattenedData = modalContent.student_data.flatMap(studentData =>
        studentData.Students.map(stud => ({
          m_teacher: modalContent.m_teacher,
          c_teacher: modalContent.c_teacher,
          class_room: modalContent.class_room,
          date: modalContent.date,
          start_time: modalContent.start_time,
          end_time: modalContent.end_time,
          subject: studentData.subject,
          year: studentData.year,
          name: stud.name,
          roll_no: stud.roll_no,
          class: studentData.class,
          is_present: stud.IsPresent,
          supplement:stud.supplement,
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
        toast.success("Attendance updated successfully", {position:"top-center"});
        closeModal();
      } catch (error) {
        console.error("Error updating attendance:", error);
        toast.error("Failed to update attendance", {position:"top-center"});
       
      }
    }
  };

  return (
    <div>
      <Toaster/>
    {data.map((item, index) => (
      <div key={index} className="mb-4">
        <div
          className="bg-white text-black rounded-md p-4 max-w-2xl cursor-pointer"
          onClick={() => openModal(item)}
        >
          <div className="flex justify-between text-lg mb-2">
            <p>
              Teaching Staff: <b>{item.m_teacher}</b>
            </p>
            <p>
              Non-Teaching Staff: <b>{item.c_teacher}</b>
            </p>
          </div>
          <div className="flex justify-between text-lg mb-2">
            <p>Class Room: {item.class_room}</p>
            <p>Date: {item.date}</p>
          </div>
          <div className="flex justify-between text-lg">
            <p>Start Time: {item.start_time}</p>
            <p>End Time: {item.end_time}</p>
          </div>
        </div>
      </div>
    ))}
  
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Student Data Modal"
      className="bg-gray-300 text-black rounded-md p-2 shadow-lg relative text-lg"
      overlayClassName="bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <h2 className="text-center text-xl font-bold mb-4">Student Attendance</h2>
      <div className="flex flex-col">
        {modalContent &&
          modalContent.student_data.map((studentData, studentIndex) => (
            <div key={studentIndex} className="mb-4">
              <div className="flex justify-between text-lg mb-2">
                <p>
                  Class Room: <b>{modalContent.class_room}</b>
                </p>
                <p>
                  Date: <b>{modalContent.date}</b>
                </p>
                <p>
                  Subject: <b>{studentData.subject}</b>
                </p>
                <p>
                  Year: <b>{studentData.year}</b>
                </p>
                <p>
                  Class: <b>{studentData.class}</b>
                </p>
              </div>
              <div className="overflow-y-auto max-h-[500px]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-3 border-2 border-black bg-red-400">
                        Roll No
                      </th>
                      <th className="p-3 border-2 border-black bg-red-400">
                        Name
                      </th>
                      <th className="p-3 border-2 border-black bg-red-400">
                        Is Present
                      </th>
                      <th className="p-3 border-2 border-black bg-red-400">
                        Supplement
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.Students &&
                      studentData.Students.map((stud, studIndex) => (
                        <tr key={studIndex}>
                          <td className="p-3 border-2 border-black bg-red-100">
                            {stud.roll_no}
                          </td>
                          <td className="p-3 border-2 border-black bg-red-100">
                            {stud.name}
                          </td>
                          <td className="p-3 border-2 border-black bg-red-100">
                            <input
                              type="checkbox"
                              checked={stud.IsPresent}
                              onChange={(event) =>
                                handleCheckboxChange(studentIndex, studIndex, event)
                              }
                              
                            />
                          </td>
                          <td className="p-3 border-2 border-black bg-red-100">
                            <input
                              type="number"
                              value={stud.supplement}
                              onChange={(event) =>
                                handleSupplementChange(studentIndex, studIndex, event)
                              }
                              min="0"
                              className="w-20 p-1"
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
      <div className="flex justify-end  gap-3">
        <button
          onClick={closeModal}
          className="bg-gray-400 text-black p-2 transition-all hover:bg-gray-500"
        >
          Close
        </button>
        <button
          onClick={handleSubmit}
          className="bg-red-600 text-white  p-2 transition-all hover:bg-red-700"
        >
          Mark
        </button>
      </div>
    </Modal>
  </div>
  
  );
};

export default GetAttendance;
