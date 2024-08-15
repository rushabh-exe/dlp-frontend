import React from 'react';

function Admin() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-red-700 mb-6">How to Create and Conduct an Exam</h1>
        <ul className="list-decimal list-inside space-y-4">
          <li className="text-lg">
            <strong>Navigate to the "Utils" Section:</strong> 
            <p className="mt-2 ml-6 text-gray-600">
              Start by accessing the "Utils" section of the admin dashboard. Here, you can add all the teachers who will be involved in the exam process. Make sure to also add the subjects that will be covered in the exams. This is a crucial first step as it lays the groundwork for the entire examination process.
            </p>
          </li>
          <li className="text-lg">
            <strong>Create the Timetable:</strong> 
            <p className="mt-2 ml-6 text-gray-600">
              Once your teachers and subjects are set up, move over to the "Student" section. Here, you’ll create a detailed timetable that outlines when each exam will take place. This timetable should be carefully planned to avoid any overlaps and ensure that all students have sufficient time between their exams.
            </p>
          </li>
          <li className="text-lg">
            <strong>Create the Necessary Allocations:</strong> 
            <p className="mt-2 ml-6 text-gray-600">
              After the timetable is ready, you’ll need to create allocations. Allocations involve assigning resources, such as classrooms and invigilators, to specific exam sessions. This step is essential to ensure that each exam is properly supervised and that all logistical aspects are covered.
            </p>
          </li>
          <li className="text-lg">
            <strong>Assign Teachers to Exams:</strong> 
            <p className="mt-2 ml-6 text-gray-600">
              Now, head to the "Teachers" section to assign specific teachers to their respective exam duties. Each teacher should be allocated to supervise exams that align with their subject expertise. This helps maintain the integrity of the exam process and ensures that students are appropriately monitored.
            </p>
          </li>
          <li className="text-lg">
            <strong>Review and Finalize:</strong> 
            <p className="mt-2 ml-6 text-gray-600">
              Before the exams begin, it’s crucial to review all the allocations and the timetable. Make sure that every detail is correct and that there are no conflicts or errors. Additionally, check the attendance records to ensure that all students and teachers are accounted for. This final review is your last line of defense against any potential issues on exam day.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Admin;
