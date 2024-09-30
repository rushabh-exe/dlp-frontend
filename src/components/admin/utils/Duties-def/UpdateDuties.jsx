import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";


function UpdateDuties() {
    const [Duties, setDuties] = useState([]);
    const [teachingCount, setTeachingCount] = useState(0);
    const [nonTeachingCount, setNonTeachingCount] = useState(0);

    const apikey = import.meta.env.VITE_API_URL;

    const fetchDuties = async () => {
        try {
            const response = await axios.get(`${apikey}admin/create/vitals/teacherDuties`, { withCredentials: true });
            setDuties(response.data);
        } catch (error) {
            console.error("Error fetching Duties:", error);
        }
    };

    useEffect(() => {
        fetchDuties();
    }, [apikey]);

    const handleSubmit = async () => {
        try {
            const entries = [];
            if (teachingCount > 0) {
                entries.push({ type: 'teachingstaff', count: teachingCount });
            }

            if (nonTeachingCount > 0) {
                entries.push({ type: 'nonteachingstaff', count: nonTeachingCount });
            }

            if (entries.length === 0) {
                console.error('No valid entries to submit.');
                toast.error("Please provide valid counts for teaching or non-teaching staff", { position: "bottom-right" });
                return;
            }

            console.log('Post Request Body:', entries);
            const response = await axios.post(`${apikey}admin/create/vitals/teacherDuties`, entries);
            console.log(response.data);
            toast.success("Successfully submitted", { position: "bottom-right" });
            fetchDuties();
        } catch (error) {
            console.error('Error:', error);
            toast.error("Error submitting duties", { position: "bottom-right" });
        }
    };

    return (
        <div className="flex-col gap-4 p-4 w-full justify-start items-start">
      <Toaster />

            <div className='flex gap-4 mb-4'>
                <div>
                    <span className="block font-bold mt-1 text-gray-600">Set Non-teaching Staffs</span>
                    <input 
                        type="number" 
                        value={nonTeachingCount} 
                        onChange={(e) => setNonTeachingCount(e.target.value)} 
                        placeholder='Count for Non-teaching' 
                        className="border border-gray-300 rounded-lg p-2 w-full" 
                    />
                </div>
                <div>
                    <span className="block mt-1 font-bold text-gray-600">Set Teaching Staffs</span>
                    <input 
                        type="number" 
                        value={teachingCount} 
                        onChange={(e) => setTeachingCount(e.target.value)} 
                        placeholder='Count for Teaching' 
                        className="border border-gray-300 rounded-lg p-2 w-full" 
                    />
                </div>
            </div>
            <div>
                <button 
                    onClick={handleSubmit} 
                    className="p-2 mb-4 bg-red-800 text-white font-semibold py-2 rounded-lg active:bg-red-600 transition duration-200"
                >
                    Submit
                </button>
                <div>
                    <span className="block text-lg font-semibold mb-2">Current Duties</span>
                    {Duties.map((duty, index) => (
                        <p key={index} className="text-gray-700">{duty.type}: {duty.count}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UpdateDuties;