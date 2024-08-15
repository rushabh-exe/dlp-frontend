import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Utility function for converting date to a readable format
const dateConv = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleString();
};

// Fetch papers from the API
const fetchPapers = async (apikey, setPapers) => {
  try {
    const response = await axios.get(`${apikey}dqc/requests`, {
      withCredentials: true,
    });
    setPapers(response.data);
  } catch (error) {
    toast.error("Error fetching data", { position: "bottom-right" });
    console.error("Error fetching papers:", error);
  }
};

// Handle paper approval or rejection
const handlePaperAction = async (apikey, paper, action, setPapers) => {
  try {
    await axios.post(
      `${apikey}dqc/requests/${paper.ID}/${action}`,
      { withCredentials: true }
    );
    toast.success("Reviewed Successfully", { position: "bottom-right" });
    
    // Refresh the papers list after a successful review
    fetchPapers(apikey, setPapers);

  } catch (error) {
    console.error(`Error ${action ? "approving" : "rejecting"} paper:`, error);
    toast.error("Error reviewing paper", { position: "bottom-right" });
  }
};

function PostPapers() {
  const [papers, setPapers] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchPapers(apikey, setPapers);
  }, [apikey]);

  const handleApprove = useCallback(
    (paper) => handlePaperAction(apikey, paper, true, setPapers),
    [apikey]
  );

  const handleReject = useCallback(
    (paper) => handlePaperAction(apikey, paper, false, setPapers),
    [apikey]
  );

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
              {[
                "Teacher Name", "Subject", "Year", "Semester", 
                "Created At", "QPLink", "APLink", "Request", 
                "Status", "Approver", "Approve", "Reject"
              ].map((header, index) => (
                <th key={index} className="px-4 py-2 border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {papers
              .filter((paper) => !paper.status) // Filter out papers with status true (Yes)
              .map((paper) => (
                <tr key={paper.ID} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{paper.name}</td>
                  <td className="px-4 py-2 border-b">{paper.subject}</td>
                  <td className="px-4 py-2 border-b">{paper.year}</td>
                  <td className="px-4 py-2 border-b">{paper.semester}</td>
                  <td className="px-4 py-2 border-b">{dateConv(paper.CreatedAt)}</td>
                  <td className="px-4 py-2 border-b">{paper.qplink}</td>
                  <td className="px-4 py-2 border-b">{paper.aplink}</td>
                  <td className="px-4 py-2 border-b text-center text-black">
                    {paper.request ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {paper.status ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {paper.approver || "None"}
                  </td>
                  <td className="px-4 py-2 border-b text-center text-black">
                    <button onClick={() => handleApprove(paper)}>Approve</button>
                  </td>
                  <td className="px-4 py-2 border-b text-center text-black">
                    <button onClick={() => handleReject(paper)}>Reject</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PostPapers;
