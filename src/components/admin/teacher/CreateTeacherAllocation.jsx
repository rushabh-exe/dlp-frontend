import React from 'react';
import axios from 'axios';

function CreateTeacherAllocation() {
  function handleClick() {
    axios.post('http://localhost:3001/admin/create/teacher/allocation')
      .then(() => {
        // Redirect after successful creation
        window.location.href = "/teacher/allocation";
      })
      .catch(error => {
        // Handle error
        console.error('Error creating teacher allocation:', error);
      });
  }

  return (
    <div className="flex justify-center mt-16">
      <div className="bg-white text-black p-10 rounded-lg shadow-lg cursor-pointer h-fit" onClick={handleClick}>
        <h2 className="text-2xl font-bold">Create Allocation</h2>
        <p>This button directly creates allocation</p>
      </div>
    </div>
  );
}

export default CreateTeacherAllocation;
