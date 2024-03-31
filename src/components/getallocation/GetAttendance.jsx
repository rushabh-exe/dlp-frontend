import React from "react";
import PrintButton from "../utils/PrintButton";
function GetAttendance() {
  // Dummy data for 10 students
  const students = [
    { rollNo: 1, name: "John Doe", sign: "", supplement: "", remark: "" },
    { rollNo: 2, name: "Jane Smith", sign: "", supplement: "", remark: "" },
    { rollNo: 3, name: "Alice Johnson", sign: "", supplement: "", remark: "" },
    { rollNo: 4, name: "Bob Williams", sign: "", supplement: "", remark: "" },
    { rollNo: 5, name: "Emily Davis", sign: "", supplement: "", remark: "" },
    { rollNo: 6, name: "Michael Brown", sign: "", supplement: "", remark: "" },
    { rollNo: 7, name: "Olivia Wilson", sign: "", supplement: "", remark: "" },
    { rollNo: 8, name: "James Taylor", sign: "", supplement: "", remark: "" },
    { rollNo: 5, name: "Emily Davis", sign: "", supplement: "", remark: "" },
    { rollNo: 6, name: "Michael Brown", sign: "", supplement: "", remark: "" },
    { rollNo: 7, name: "Olivia Wilson", sign: "", supplement: "", remark: "" },   
  ];

  return (
    <div id="atnreport" className="atnreport flex flex-col gap-3 p-2">
      <PrintButton contentId='atnreport'/>
      <div className="transcripts hidden flex-col items-center">
        <h2>KJ Somaiya Institure of Technology, Sion Mumbai - 400022</h2>
        <h2>Department of Electronics and Telecommunication Engineering</h2>
        <h2>Even Semester 2024-25</h2>
        <h2>Class Test 1 Attendance Report</h2>
      </div>
      <div className="transcripts hidden flex-col">
        <div className="flex">
          <p>YEAR:</p>
          <h2>LY</h2>
        </div>
        <div className="flex">
          <p>Semester:</p>
          <h2>VIII</h2>
        </div>
        <div className="flex gap-5">
          <p>SUBJECT : ARTIFICIAL INTELLIGENCE AND ML</p>
          <p>CLASSROOM: 101</p>
          <p>DATE : 03/05/2025</p>
        </div>
      </div>
      <div className="table mx-auto bg-white   max-w-4xl w-full overflow-hidden">
        <section className="table_body bg-gray-100">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 border border-gray-400">Roll No.</th>
                <th className="p-2 border border-gray-400">Name Of Student</th>
                <th className="p-2 border border-gray-400">Sign</th>
                <th className="p-2 border border-gray-400">Supplement</th>
                <th className="p-2 border border-gray-400">Remark</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-300 transition-all duration-500"
                >
                  <td className="p-2 border border-gray-400 text-center">
                    {student.rollNo}
                  </td>
                  <td className="p-2 border border-gray-400">{student.name}</td>
                  <td className="p-2 border border-gray-400 w-32">
                    {student.sign}
                  </td>
                  <td className="p-2 border border-gray-400">
                    {student.supplement}
                  </td>
                  <td className="p-2 border border-gray-400 w-32">
                    {student.remark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <div className="transcripts hidden justify-between">
        <p>TOTAL STUDENTS: 18</p>
        <p>PRESENT: 18</p>
        <p>ABSENT: 0</p>
      </div>
      <div className="transcripts hidden justify-between">
        <p>NAME OF SUPERVISOR: _________________</p>
        <p>SIGN: _____________</p>
      </div>
      <div className="transcripts hidden justify-between">
        <div className="">
          <h3>TEST COORDINATOR:</h3>
          <p>JONH HON</p>
          <p>JHON NOH</p>
          <p>HONJ OHN</p>
        </div>
        <div>
          <h3>HOD EXTC</h3>
          <p>Dr. Jayashree Kanapuri </p>
        </div>
      </div>
    </div>
  );
}

export default GetAttendance;
