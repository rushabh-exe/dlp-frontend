import { useEffect, useState } from 'react';
import axios from 'axios';

function GetPapers() {
  const [papers, setPapers] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apikey}dqc/requests`,{withCredentials:true})
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Papers</h1>
      {papers.length === 0 ? (
        <p className="text-gray-500">No papers found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Teacher Name</th>
              <th className="px-4 py-2 border-b">subject</th>
              <th className="px-4 py-2 border-b">year</th>
              <th className="px-4 py-2 border-b">semester</th>
              <th className="px-4 py-2 border-b">CreatedAt</th>
              <th className="px-4 py-2 border-b">qplink</th>
              <th className="px-4 py-2 border-b">aplink</th>
              <th className="px-4 py-2 border-b">request</th>
              <th className="px-4 py-2 border-b">status</th>
              <th className="px-4 py-2 border-b">description</th>
              <th className="px-4 py-2 border-b">approver</th>
            </tr>
          </thead>
          <tbody>
            {papers.map(paper => (
              <tr key={paper.ID} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{paper.name}</td>
                <td className="px-4 py-2 border-b">{paper.subject}</td>
                <td className="px-4 py-2 border-b">{paper.year}</td>
                <td className="px-4 py-2 border-b">{paper.semester}</td>
                <td className="px-4 py-2 border-b">{dateConv(paper.CreatedAt)}</td>
                <td className="px-4 py-2 border-b">{paper.qplink}</td>
                <td className="px-4 py-2 border-b">{paper.aplink}</td>
                <td className="px-4 py-2 border-b text-center text-black">
                  { paper.request ? "Yes" : "No" } 
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {paper.status ? "Yes" : "No" }
                </td>
                <td className="px-4 py-2 border-b">{paper.description}</td>
                <td className="px-4 py-2 border-b">{paper.approver === "" ? "None" : paper.approver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GetPapers;
