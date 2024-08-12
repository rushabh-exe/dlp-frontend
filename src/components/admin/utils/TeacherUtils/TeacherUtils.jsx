import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TeacherTable from './TeacherTable';
import TeacherForm from './TeacherForm';

function TeacherUtils() {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phno: '', type: '' });
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [error, setError] = useState(null);
  const apikey = import.meta.env.VITE_API_URL;

  const fetchTeachers = useCallback(async () => {
    try {
      const teachingResponse = await axios.get(`${apikey}admin/create/vitals/teachers/teachingStaff`);
      const nonTeachingResponse = await axios.get(`${apikey}admin/create/vitals/teachers/nonteachingStaff`);
      
      const teachingData = teachingResponse.data.map(teacher => ({
        ID: teacher.ID,
        Name: teacher.name,
        Email: teacher.email,
        Phone: teacher.phno,
        Type: "teachingStaff"
      }));

      const nonTeachingData = nonTeachingResponse.data.map(teacher => ({
        ID: teacher.ID,
        Name: teacher.name,
        Email: teacher.email,
        Phone: teacher.phno,
        Type: "nonteachingStaff"
      }));

      setTeachers([...teachingData, ...nonTeachingData]);
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setError("Failed to fetch teachers.");
    }
  }, [apikey]);


  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apikey}admin/create/vitals/createTeacher`, formData);
      console.log('Teacher added successfully');
      clearForm();
      fetchTeachers();
    } catch (err) {
      console.error("Error adding teacher:", err);
      setError("Failed to add teacher.");
    }
  };

  const handleDelete = async (type, email) => {
    try {
      const response = await axios.delete(`${apikey}admin/create/vitals/teachers/${type}/${email}`);
      console.log('Teacher deleted:', response.data);
      fetchTeachers();
    } catch (err) {
      console.error("Error deleting teacher:", err);
      setError("Failed to delete teacher.");
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.Name,
      email: teacher.Email,
      phno: teacher.Phone,
      type: teacher.Type
    });
  };

  const handleSave = async () => {
    try {
      const updatedType = editingTeacher.Type === "teachingStaff" ? "teachingStaff" : "nonteachingStaff";
      await axios.put(`${apikey}admin/create/vitals/teachers/${updatedType}`, {
        name: formData.name,
        email: formData.email,  // Use the email from formData, not editingTeacher.Email
        phno: formData.phno,
        type: formData.type
      });
      console.log('Teacher updated successfully');
      fetchTeachers();
      setEditingTeacher(null);
      clearForm();
    } catch (err) {
      console.error("Error updating teacher:", err);
      setError("Failed to update teacher.");
    }
  };
  

  const clearForm = () => {
    setFormData({ name: '', email: '', phno: '', type: '' });
    setEditingTeacher(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl font-bold mb-4">Teacher Data</h3>
      {error && <div className='text-red-500 mb-4'>{error}</div>}
      <TeacherTable 
        teachers={teachers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        editingTeacher={editingTeacher}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={handleSave}
        onCancel={() => setEditingTeacher(null)}
      />
      <button 
        onClick={() => setIsAddTeacherOpen(true)} 
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Add New Teacher
      </button>
      {isAddTeacherOpen && (
        <TeacherForm 
          formData={formData} 
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsAddTeacherOpen(false);
            clearForm();
          }} 
        />
      )}
    </div>
  );
}

export default TeacherUtils;
