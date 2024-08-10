import React from 'react';

function TeacherRow({ teacher, onEdit, onDelete, isEditing, formData, onInputChange, onSave, onCancel }) {
  return (
    <tr className="hover:bg-gray-100 transition-all duration-500">
      <td className="border text-center p-3">{teacher.ID}</td>
      <td className="border p-3 text-center">
        {isEditing ? (
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={onInputChange}
            className="p-2 rounded border border-gray-300"
          />
        ) : (
          teacher.Name
        )}
      </td>
      <td className="border p-3 text-center">
        {isEditing ? (
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={onInputChange}
            className="p-2 rounded border border-gray-300"
          />
        ) : (
          teacher.Email
        )}
      </td>
      <td className="border p-3 text-center">
        {isEditing ? (
          <input
            type="text"
            id="phno"
            value={formData.phno}
            onChange={onInputChange}
            className="p-2 rounded border border-gray-300"
          />
        ) : (
          teacher.Phone
        )}
      </td>
      <td className="border p-3 text-center">
        {isEditing ? (
          <select
            id="type"
            value={formData.type}
            onChange={onInputChange}
            className="p-2 rounded border border-gray-300"
          >
            <option value="Teaching">Teaching</option>
            <option value="Non Teaching">Non Teaching</option>
          </select>
        ) : (
          teacher.Type
        )}
      </td>
      <td className="border p-3 text-center">
        {isEditing ? (
          <div>
            <button onClick={onSave} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 mr-2">Save</button>
            <button onClick={onCancel} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Cancel</button>
          </div>
        ) : (
          <button onClick={() => onEdit(teacher)} className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2">Edit</button>
        )}
      </td>
      <td className="border p-3 text-center">
        <button onClick={() => onDelete(teacher.Type, teacher.Email)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
      </td>
    </tr>
  );
}

export default TeacherRow;
