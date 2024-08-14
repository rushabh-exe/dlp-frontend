import { useState } from 'react';
import axios from 'axios';

function CreateDualAllocation() {
  const [class1Name, setClass1Name] = useState('');
  const [class1Strength, setClass1Strength] = useState('');
  const [class2Name, setClass2Name] = useState('');
  const [class2Strength, setClass2Strength] = useState('');
  const [rooms, setRooms] = useState([{ room: '', capacity: '' }]);
  const apikey = import.meta.env.VITE_API_URL;
  const handleRoomChange = (index, key, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][key] = value;
    setRooms(updatedRooms);
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { room: '', capacity: '' }]);
  };

  const handleRemoveRoom = (index) => {
    const updatedRooms = [...rooms];
    updatedRooms.splice(index, 1);
    setRooms(updatedRooms);
  };

  const handleSubmit = async () => {
    try {
      const data = [{
        class1: { name: class1Name, strength: parseInt(class1Strength) },
        class2: { name: class2Name, strength: parseInt(class2Strength) },
        class: rooms.map(room => ({
          room: room.room,
          capacity: parseInt(room.capacity)
        }))
      }];
      console.log(data);
      await axios.post(`${apikey}admin/create/student/dualAllocation`, data);
      console.log('POST request sent successfully');
      alert("Allocation Successfull")

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex flex-col gap-4 mx-auto bg-gray-100 rounded-lg shadow-lg p-6'>
      <h2 className="text-2xl font-bold text-center border-b-2 border-red-700 ">Create Dual Allocation</h2>
      <div className='flex w-full gap-3'>
        <div className='flex w-full flex-col gap-2'>
          <label className="text-gray-800" >Class 1 Name:</label>
          <input className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="text" value={class1Name} onChange={(e) => setClass1Name(e.target.value)} />
        </div>
        <div className='flex w-full flex-col gap-2'>
          <label className="text-gray-800">Class 1 Strength:</label>
          <input className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="number" value={class1Strength} onChange={(e) => setClass1Strength(e.target.value)} />
        </div>
      </div>
      <div className='flex w-full gap-3'>
        <div className='flex w-full flex-col gap-2'>
          <label className="text-gray-800">Class 2 Name:</label>
          <input className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="text" value={class2Name} onChange={(e) => setClass2Name(e.target.value)} />
        </div>
        <div className='flex w-full flex-col gap-2'>
          <label className="text-gray-800">Class 2 Strength:</label>
          <input className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="number" value={class2Strength} onChange={(e) => setClass2Strength(e.target.value)} />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <label className="text-gray-800">Classrooms:</label>
        {rooms.map((room, index) => (
          <div className='flex flex-col sm:flex-row gap-2' key={index}>
            <input
              type="text"
              placeholder="Room"
              value={room.room}
              onChange={(e) => handleRoomChange(index, 'room', e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Capacity"
              value={room.capacity}
              onChange={(e) => handleRoomChange(index, 'capacity', e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button className='bg-slate-200 text-red-800 px-3 py-2 rounded-md hover:bg-red-800 hover:text-white transition duration-300' onClick={() => handleRemoveRoom(index)}>Remove</button>
          </div>
        ))}
        <button className='w-fit bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 self-start' onClick={handleAddRoom}>Add Room</button>
      </div>
      <button className='w-full bg-red-700 text-white px-4 py-2 rounded-md self-center hover:bg-red-800 transition duration-300' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateDualAllocation;
