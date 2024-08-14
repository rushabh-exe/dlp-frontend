import React from 'react';
import TeacherRow from './TeacherRow';

function TeacherTable({ teachers, onEdit, onDelete, editingTeacher, formData, onInputChange, onSave, onCancel }) {
  return (
    <table className="w-full border-collapse mb-4 bg-white rounded-lg shadow-lg">
      <thead>
        <tr>
          <th className="border p-3">ID</th>
          <th className="border p-3">Name</th>
          <th className="border p-3">Email</th>
          <th className="border p-3">Phone</th>
          <th className="border p-3">Type</th>
          <th className="border p-3">Edit</th>
          <th className="border p-3">Delete</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher) => (
          <TeacherRow
            key={`${teacher.ID}-${teacher.Type}`} 
            teacher={teacher}
            onEdit={onEdit}
            onDelete={onDelete}
            isEditing={editingTeacher && editingTeacher.Email === teacher.Email}
            formData={formData}
            onInputChange={onInputChange}
            onSave={onSave}
            onCancel={onCancel}
          />
        ))}
      </tbody>

    </table>
  );
}

export default TeacherTable;
