import React, { useState } from 'react';
import axios from 'axios';

function CreateDualAllocation() {
  const [class1Name, setClass1Name] = useState('');
  const [class1Strength, setClass1Strength] = useState('');
  const [class2Name, setClass2Name] = useState('');
  const [class2Strength, setClass2Strength] = useState('');
  const [rooms, setRooms] = useState([{ room: '', capacity: '' }]);

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
      const data = {
        class1: { name: class1Name, strength: class1Strength },
        class2: { name: class2Name, strength: class2Strength },
        class: rooms
      };
      console.log(data);
      await axios.post('http://localhost:3001/admin/create/student/dualAllocation', data);
      console.log('POST request sent successfully');
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='w-full flex flex-col gap-2'>
      <h2>Create Dual Allocation</h2>
      <div className='flex gap-2'>
        <label>Class 1 Name:</label>
        <input type="text" value={class1Name} onChange={(e) => setClass1Name(e.target.value)} />
      </div>
      <div className='flex gap-2'>
        <label>Class 1 Strength:</label>
        <input type="number" value={class1Strength} onChange={(e) => setClass1Strength(e.target.value)} />
      </div>
      <div className='flex gap-2'>
        <label>Class 2 Name:</label>
        <input type="text" value={class2Name} onChange={(e) => setClass2Name(e.target.value)} />
      </div>
      <div className='flex gap-2'>
        <label>Class 2 Strength:</label>
        <input type="number" value={class2Strength} onChange={(e) => setClass2Strength(e.target.value)} />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <label>Classrooms:</label>
        {rooms.map((room, index) => (
          <div className='flex gap-2' key={index}>
            <input
              type="text"
              placeholder="Room"
              value={room.room}
              onChange={(e) => handleRoomChange(index, 'room', e.target.value)}
            />
            <input
              type="number"
              placeholder="Capacity"
              value={room.capacity}
              onChange={(e) => handleRoomChange(index, 'capacity', e.target.value)}
            />
            <button className='bg-white p-1' onClick={() => handleRemoveRoom(index)}>Remove</button>
          </div>
        ))}
        <button className='w-fit bg-white p-1' onClick={handleAddRoom}>Add Room</button>
      </div>
      <button className='w-fit bg-red-700 p-2 text-white' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateDualAllocation;





// import React from 'react'

// function CreateDualAllocation() {
//   return (
//     <div>CreateDualAllocation</div>
//   )
// }

// export default CreateDualAllocation

// import React, { useState } from 'react';
// import axios from 'axios';

// function CreateDualAllocation() {
//     const [formData, setFormData] = useState({
//         reqAll: [
//             {
//                 class1: {
//                     name: '',
//                     strength: 0
//                 },
//                 class2: {
//                     name: '',
//                     strength: 0
//                 },
//                 class: []
//             }
//         ]
//     });

//     const handleChange = (e, className) => {
//         const { name, value } = e.target;
//         setFormData(prevFormData => ({
//             ...prevFormData,
//             reqAll: [
//                 {
//                     ...prevFormData.reqAll[0],
//                     [className]: {
//                         ...prevFormData.reqAll[0][className],
//                         [name]: value
//                     }
//                 }
//             ]
//         }));
//     };

//     const handleAddClass = (selectedRoom, className) => {
//         if (selectedRoom) {
//             const selectedClassroom = { room: selectedRoom, capacity: 50 }; // Assuming default capacity is 50
//             setFormData(prevFormData => ({
//                 ...prevFormData,
//                 reqAll: [
//                     {
//                         ...prevFormData.reqAll[0],
//                         class: className === 'class1' ?
//                             [...prevFormData.reqAll[0].class, selectedClassroom] :
//                             prevFormData.reqAll[0].class,
//                         [className]: {
//                             ...prevFormData.reqAll[0][className]
//                         }
//                     }
//                 ]
//             }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const defaultStrength = 30; // Default strength for all classes

//             const updatedFormData = {
//                 reqAll: [
//                     {
//                         class1: {
//                             name: formData.reqAll[0].class1.name,
//                             strength: formData.reqAll[0].class1.name === 'SYA' ? 61 : defaultStrength // Modify strength selectively
//                         },
//                         class2: {
//                             name: formData.reqAll[0].class2.name,
//                             strength: formData.reqAll[0].class2.name === 'TYA' ? 50 : defaultStrength // Modify strength selectively
//                         },
//                         class: formData.reqAll[0].class.map(cls => ({
//                             ...cls,
//                             strength: defaultStrength // Set default strength for all classes
//                         }))
//                     }
//                 ]
//             };

//             const response = await axios.post('http://localhost:9876/dualAllocation', updatedFormData);
//             console.log('Response:', response.data);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8">
//             <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Class 1 Name:</label>
//                 <select name="name" onChange={(e) => handleChange(e, 'class1')} value={formData.reqAll[0].class1.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//                     <option value="">Select a classroom</option>
//                     <option value="SYA">SYA</option>
//                     <option value="SYB">SYB</option>
//                     <option value="TYA">TYA</option>
//                     <option value="TYB">TYB</option>
//                 </select>
//             </div>
//             <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Class 2 Name:</label>
//                 <select name="name" onChange={(e) => handleChange(e, 'class2')} value={formData.reqAll[0].class2.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//                     <option value="">Select a classroom</option>
//                     <option value="SYA">SYA</option>
//                     <option value="SYB">SYB</option>
//                     <option value="TYA">TYA</option>
//                     <option value="TYB">TYB</option>
//                 </select>
//             </div>
//             <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Classrooms:</label>
//                 <select name="room" onChange={(e) => handleAddClass(e.target.value, 'class1')} value={formData.selectedRoom} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//                     <option value="">Select a classroom</option>
//                     <option value="801">801</option>
//                     <option value="802">802</option>
//                     <option value="803">803</option>
//                     <option value="804">804</option>
//                     <option value="805">805</option>
//                     <option value="806">806</option>
//                     <option value="807">807</option>
//                     <option value="808">808</option>
//                 </select>
//             </div>
//             <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Selected Classes:</label>
//                 <ul>
//                     {formData.reqAll[0].class.map((cls, index) => (
//                         <li key={index}>{cls.room}</li>
//                     ))}
//                 </ul>
//             </div>
//             <div>
//                 <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
//             </div>
//         </form>
//     );
// }

// export default CreateDualAllocation;