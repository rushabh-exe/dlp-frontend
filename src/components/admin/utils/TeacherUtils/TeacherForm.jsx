import React from 'react';

function TeacherForm({ formData, onInputChange, onSubmit, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white w-2/4 rounded-lg overflow-hidden shadow-xl">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Add New Teacher</h2>
            <button
              onClick={onCancel}
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={onSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name:</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={onInputChange}
                className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={onInputChange}
                className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phno" className="block text-gray-700">Phone:</label>
              <input
                type="text"
                id="phno"
                value={formData.phno}
                onChange={onInputChange}
                className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700">Type:</label>
              <select
                id="type"
                value={formData.type}
                onChange={onInputChange}
                className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="Teaching">Teaching</option>
                <option value="Non Teaching">Non Teaching</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeacherForm;
