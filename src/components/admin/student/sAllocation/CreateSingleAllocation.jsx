import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function CreateSingleAllocation() {
    const [class1Name, setClass1Name] = useState('');
    const [class1Strength, setClass1Strength] = useState('');
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
                class: rooms.map(room => ({
                    room: room.room,
                    capacity: parseInt(room.capacity)
                }))
            }];
            console.log(data);
            await axios.post(`${apikey}admin/create/student/singleAllocation`, data);
            console.log('POST request sent successfully');
            toast.success("Successfully created",{position:"bottom-right"})
            setClass1Name('');
            setClass1Strength('');
            setRooms([{ room: '', capacity: '' }]);
        } catch (error) {
            console.error('Error:', error);
            toast.error("Error occured creating Allocation",{position:"bottom-right"})

        }
    };
    
    

    return (
        <div className='flex flex-col gap-4 mx-auto bg-gray-100 rounded-lg shadow-lg p-6'>
            <Toaster/>
            <h2 className="text-2xl font-bold text-center border-b-2 border-red-700 ">Create Single Allocation</h2>
            <div className='flex w-full gap-3'>
                <div className='flex w-full flex-col gap-2'>
                    <label className="text-gray-800">Class 1 Name:</label>
                    <input type="text" value={class1Name} onChange={(e) => setClass1Name(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className='flex w-full flex-col gap-2'>
                    <label className="text-gray-800">Class 1 Strength:</label>
                    <input type="number" value={class1Strength} onChange={(e) => setClass1Strength(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <label className="text-gray-800">Classrooms:</label>
                {rooms.map((room, index) => (
                    <div className='flex flex-col sm:flex-row gap-2' key={index}>
                        <input
                            type="text"
                            placeholder="Classroom number"
                            value={room.room}
                            onChange={(e) => handleRoomChange(index, 'room', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="number"
                            placeholder="Classroom Capacity"
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

export default CreateSingleAllocation;