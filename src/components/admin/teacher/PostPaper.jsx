import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function PostPaper() {
  const [papers, setPapers] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;

  // Function to fetch papers
  const fetchPapers = () => {
    axios
      .get(`${apikey}admin/get/teacher/papers/request`, { withCredentials: true })
      .then((response) => {
        setPapers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching papers:", error);
      });
  };

  // Fetch papers on component mount
  useEffect(() => {
    fetchPapers();
  }, [apikey]);

  const handleApprove = (paper) => {
    axios
      .post(`${apikey}admin/create/teacher/papers/${paper.ID}/true`, {
        withCredentials: true,
      })
      .then(() => {
        toast.success("Approved Successfully", { position: 'bottom-right' });
        fetchPapers(); // Refresh the list after approval
      })
      .catch((error) => {
        toast.error("Error occurred Approving", { position: 'bottom-right' });
        console.error("Error approving paper:", error);
      });
  };

  const handleReject = (paper) => {
    axios
      .post(`${apikey}admin/create/teacher/papers/${paper.ID}/false`, {
        withCredentials: true,
      })
      .then(() => {
        toast.success("Rejected Successfully", { position: 'bottom-right' });
        fetchPapers(); // Refresh the list after rejection
      })
      .catch((error) => {
        toast.error("Error occurred Rejecting", { position: 'bottom-right' });
        console.error("Error rejecting paper:", error);
      });
  };

  var dateConv = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
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
            {papers.map((paper) => (
              <tr key={paper.ID} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{paper.teacher_name}</td>
                <td className="px-4 py-2 border-b">{paper.description}</td>
                <td className="px-4 py-2 border-b text-center text-black">
                  <button onClick={() => handleApprove(paper)}>
                    Approve paper
                  </button>
                </td>
                <td className="px-4 py-2 border-b text-center text-black">
                  <button onClick={() => handleReject(paper)}>
                    Reject paper
                  </button>
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

export default PostPaper;
