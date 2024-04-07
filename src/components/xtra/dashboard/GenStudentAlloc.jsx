import React, { useState } from 'react';
import axios from 'axios';

function GenStudentAlloc() {
    const [formData, setFormData] = useState({
        reqAll: [
            {
                class1: {
                    name: '',
                    strength: 0
                },
                class2: {
                    name: '',
                    strength: 0
                },
                class: []
            }
        ]
    });

    const handleChange = (e, className) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            reqAll: [
                {
                    ...prevFormData.reqAll[0],
                    [className]: {
                        ...prevFormData.reqAll[0][className],
                        [name]: value
                    }
                }
            ]
        }));
    };

    const handleAddClass = (selectedRoom, className) => {
        if (selectedRoom) {
            const selectedClassroom = { room: selectedRoom, capacity: 50 }; // Assuming default capacity is 50
            setFormData(prevFormData => ({
                ...prevFormData,
                reqAll: [
                    {
                        ...prevFormData.reqAll[0],
                        class: className === 'class1' ?
                            [...prevFormData.reqAll[0].class, selectedClassroom] :
                            prevFormData.reqAll[0].class,
                        [className]: {
                            ...prevFormData.reqAll[0][className]
                        }
                    }
                ]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const defaultStrength = 30; // Default strength for all classes

            const updatedFormData = {
                reqAll: [
                    {
                        class1: {
                            name: formData.reqAll[0].class1.name,
                            strength: formData.reqAll[0].class1.name === 'SYA' ? 61 : defaultStrength // Modify strength selectively
                        },
                        class2: {
                            name: formData.reqAll[0].class2.name,
                            strength: formData.reqAll[0].class2.name === 'TYA' ? 50 : defaultStrength // Modify strength selectively
                        },
                        class: formData.reqAll[0].class.map(cls => ({
                            ...cls,
                            strength: defaultStrength // Set default strength for all classes
                        }))
                    }
                ]
            };

            const response = await axios.post('http://localhost:9876/dualAllocation', updatedFormData);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Class 1 Name:</label>
                <select name="name" onChange={(e) => handleChange(e, 'class1')} value={formData.reqAll[0].class1.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select a classroom</option>
                    <option value="SYA">SYA</option>
                    <option value="SYB">SYB</option>
                    <option value="TYA">TYA</option>
                    <option value="TYB">TYB</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Class 2 Name:</label>
                <select name="name" onChange={(e) => handleChange(e, 'class2')} value={formData.reqAll[0].class2.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select a classroom</option>
                    <option value="SYA">SYA</option>
                    <option value="SYB">SYB</option>
                    <option value="TYA">TYA</option>
                    <option value="TYB">TYB</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Classrooms:</label>
                <select name="room" onChange={(e) => handleAddClass(e.target.value, 'class1')} value={formData.selectedRoom} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select a classroom</option>
                    <option value="801">801</option>
                    <option value="802">802</option>
                    <option value="803">803</option>
                    <option value="804">804</option>
                    <option value="805">805</option>
                    <option value="806">806</option>
                    <option value="807">807</option>
                    <option value="808">808</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Selected Classes:</label>
                <ul>
                    {formData.reqAll[0].class.map((cls, index) => (
                        <li key={index}>{cls.room}</li>
                    ))}
                </ul>
            </div>
            <div>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            </div>
        </form>
    );
}

export default GenStudentAlloc;