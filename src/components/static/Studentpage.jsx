import  { useState, useCallback } from 'react';
import StudentTimeTable from './StudentTimeTable';
import GetStudentAllocation from './GetStudentAllocation'

// Main StudentPage Component
function StudentPage() {
  const [selectedComponent, setSelectedComponent] = useState(<StudentCompo />);

  // Memoized handler to prevent unnecessary re-renders
  const handleDropdownChange = useCallback((event) => {
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case 'getExamtt':
        setSelectedComponent(<StudentTimeTable />);
        break;
      case 'studentAlloc':
        setSelectedComponent(<GetStudentAllocation />);
        break;
      default:
        setSelectedComponent(<StudentCompo />);
        break;
    }
  }, []);

  return (
    <div className="p-2">
      <select className='my-2 border-2 border-black' onChange={handleDropdownChange}>
        <option value="">Looking for</option>
        <option value="getExamtt">Get Exam Timetable</option>
        <option value="studentAlloc">Student Allocation</option>
      </select>
      {selectedComponent}
    </div>
  );
}

// StudentCompo Component
function StudentCompo() {
  return (
    <div>
      <p className="text-lg text-gray-700 mb-4">
        Please select one of the following options to access the relevant information:
      </p>
    </div>
  );
}

export default StudentPage;
