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

// Handle paper approval or rejection with description
const handlePaperAction = async (apikey, paper, action, description, setPapers) => {
  try {
    await axios.post(
      `${apikey}dqc/requests/${paper.ID}/${action}`,
      { description },  // Send description along with the request
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
  const [showModal, setShowModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [actionType, setActionType] = useState(null); // "approve" or "reject"
  const [description, setDescription] = useState(""); // Description input
  const apikey = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchPapers(apikey, setPapers);
  }, [apikey]);

  const openModal = (paper, action) => {
    setSelectedPaper(paper);
    setActionType(action);
    setShowModal(true); // Open the modal
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    setDescription(""); // Clear the description input
  };

  const handleSubmit = () => {
    if (selectedPaper) {
      handlePaperAction(apikey, selectedPaper, actionType, description, setPapers);
    }
    closeModal(); // Close the modal after submission
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
                  <td className="px-4 py-2 border-b text-center">
                    <button onClick={() => openModal(paper, "approve")}>Approve</button>
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <button onClick={() => openModal(paper, "reject")}>Reject</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {/* Modal for description input */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Enter Description for {actionType === "approve" ? "Approval" : "Rejection"}</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              rows="4"
              placeholder="Enter your description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button className="px-4 py-2 bg-red-600 text-white rounded-md" onClick={closeModal}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostPapers;
