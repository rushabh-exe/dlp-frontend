import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';


const Teacher = () => {
    
    function handleClick() {
        axios.post('http://localhost:3001/admin/create/teacher/allocation')
        .then(() => {
        window.location.href ="/teacher/allocation";
        })
    }
    return (
    <div className="flex justify-center h-screen mt-16">
      <Link to="/teacher/allocation" className="bg-white text-black p-10 rounded-lg shadow-lg mx-4 cursor-pointer h-fit">
        <h2 className="text-2xl font-bold mb-4">Get Allocation</h2>
        <p>This button gets the current allocation</p>
      </Link>
      <div to="/page2" className="bg-white text-black p-10 rounded-lg shadow-lg mx-4 cursor-pointer h-fit" onClick={handleClick}>
        <h2 className="text-2xl font-bold mb-4">Create Allocation</h2>
        <p>This button directly creates allocation</p>
      </div>
    </div>
  );
};

export default Teacher;
