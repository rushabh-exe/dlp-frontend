import { useEffect, useState } from 'react';
import axios from 'axios';

function GetteacherPaper() {
  const [papers, setPapers] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apikey}admin/get/teacher/papers`,{withCredentials:true})
      .then(response => {
        setPapers(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching papers:', error);
      });
  }, []);

  var dateConv = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <div id='table_body' className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Papers</h1>
      {papers.length === 0 ? (
        <p className="text-gray-500">No papers found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Teacher Name</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Request</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {papers.map(paper => (
              <tr key={paper.ID} className="hover:bg-gray-100">
                <td className="px-4 text-center py-2 border-b">{paper.teacher_name}</td>
                <td className="px-4 text-center py-2 border-b">{paper.description}</td>
                <td className="px-4 py-2 border-b text-center text-black">
                  { paper.request ? "Yes" : "No" } 
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {paper.status ? "Yes" : "No" }
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {dateConv(paper.CreatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
    </div>
  );
}

export default GetteacherPaper;
