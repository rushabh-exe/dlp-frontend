import React, { useState } from 'react';
import GetAllocation from '../admin/student/sAllocation/GetAllocation';
import { GetTimeTable } from '../admin/student/Timetable';

function StudentPage() {
  const [selectedComponent, setSelectedComponent] = useState(<Studentcompo/>);
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case 'getExamtt':
        setSelectedComponent(<GetTimeTable />);
        break;
      case 'studentAlloc':
        setSelectedComponent(<GetAllocation />);
        break;
      default :
        setSelectedComponent(<Studentcompo/>);
        break;
    }
  };

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

function Studentcompo(){
  return (
    <div>
      <p className="text-lg text-gray-700 mb-4">
        Please select one of the following options to access the relevant information:
      </p>
    </div>
  )
}

export default StudentPage;
