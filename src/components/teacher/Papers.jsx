import axios from 'axios';
import { useState, useEffect } from 'react'

const Papers = () => {
    const [firstSelect, setFirstSelect] = useState('');
    // const [secondSelect, setSecondSelect] = useState('');
    const [paperRequests, setpaperRequests] = useState('');
    
    useEffect(() => {
        axios
          .get("http://localhost:3001/teacher/papers")//http://localhost:3001/teacher/getAttendence //get post put
          .then((response) => {
            setpaperRequests(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);
    
    const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/teacher/papers/delete/${id}`)
        .then(response => {
        console.log('Allocation deleted successfully');
        })
        .catch(error => {
        console.error('Error deleting student allocation:', error);
        });
    };
    

    return (
        <div>
            <div className="firstselect flex gap-5">
                <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setFirstSelect('attendance')}>Create Paper Request</button>
                <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setFirstSelect('Allocation')}>Get Paper Request</button>
            </div>
            {firstSelect && firstSelect === 'Allocation' && (
            <div className="secondselect flex gap-5">
                <div className="tableee mx-auto bg-white shadow-md rounded-lg max-w-4xl w-full overflow-hidden">
        <section className="table_header bg-white text-xl text-center py-3">
            <h1>Student Allocation SY</h1>
        </section>
        <section className="table_body bg-white">
            <table className="w-full">
            <thead>
                <tr className="text-center">
                <th className="p-2 border border-gray-400">SrNo</th>
                <th className="p-2 border border-gray-400">Teacher Name</th>
                <th className="p-2 border border-gray-400">Timestamps</th>
                <th className="p-2 border border-gray-400">Description</th>
                <th className="p-2 border border-gray-400">Status</th>
                </tr>
            </thead>
            <tbody>
                {paperRequests.map((papers, index) => (
                <tr key={index} className="text-center hover:bg-gray-300 transition-all duration-500">
                    <td className="p-2 border border-gray-400">{index + 1}</td>
                    <td className="p-2 border border-gray-400">{papers.teacher_name}</td>
                    <td className="p-2 border border-gray-400">{papers.CreatedAt}</td>
                    <td className="p-2 border border-gray-400">{papers.description}</td>
                    <td className="p-2 border border-gray-400">{papers.status}</td>
                    <td className="p-2 border border-gray-400">
                    <button onClick={() => handleDelete(papers.ID)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </section>
        </div>      
        </div>
    )}
    </div>
)
}

export default Papers
