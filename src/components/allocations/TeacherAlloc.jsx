import React from 'react';
import GenerateAlloc from '../dashboard/GenerateAlloc';
function TeacherAlloc() {
  return (
    <div className="table mx-auto bg-white shadow-md rounded-lg max-w-4xl w-full overflow-hidden">
    <section className="table_header bg-red-700 text-white  text-xl text-center py-3">
      <h1>Classroom Allocation SY</h1>
    </section>
    <section className="table_body bg-gray-100">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 border border-gray-400">Sr.no.</th>
            <th className="p-2 border border-gray-400">Classroom</th>
            <th className="p-2 border border-gray-400">Teachers</th>
            <th className="p-2 border border-gray-400">Co Teachers</th>
            <th className="p-2 border border-gray-400">Date</th>
            <th className="p-2 border border-gray-400">Time</th>
          </tr>
        </thead>
        <tbody>
            <tr className="hover:bg-gray-300 transition-all duration-500">
              <td className="p-2 border border-gray-400">1</td>
              <td className="p-2 border border-gray-400">801</td>
              <td className="p-2 border border-gray-400">teacher1</td>
              <td className="p-2 border border-gray-400">teacher2</td>
              <td className="p-2 border border-gray-400">12-12-12</td>
              <td className="p-2 border border-gray-400">12:30</td>

            </tr>
        </tbody>
      </table>
    </section>
  </div>
  );
}

export default TeacherAlloc;

