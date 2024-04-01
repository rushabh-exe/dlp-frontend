import React from 'react';

function Event() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">College Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Replace the dummy event cards with actual event details */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src="https://via.placeholder.com/400x200" alt="Event" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Event Name</h2>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Date: Jan 1, 2025</span>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700">Register</button>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src="https://via.placeholder.com/400x200" alt="Event" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Event Name</h2>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Date: Jan 1, 2025</span>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700">Register</button>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src="https://via.placeholder.com/400x200" alt="Event" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Event Name</h2>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Date: Jan 1, 2025</span>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700">Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
