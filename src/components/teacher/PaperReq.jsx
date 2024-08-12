import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Modal from "react-modal";

const PaperReq = () => {
  const [description, setDescription] = useState("");
  const [createmodalIsOpen, setCreateModalIsOpen] = useState(false);
  const [PaperData, setPaperData] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apikey}teacher/papers`, { withCredentials: true });
        setPaperData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(`Error in getting papers: ${error}`);
      }
    };
    fetchData();
  }, []);

  const deletePaperReq = async (id) => {

    try {
      await axios.delete(`${apikey}teacher/papers/${id}`, { withCredentials: true });
      window.location.reload();
      alert("Successfully deleted")
    } catch (err) {
      alert('Failed to delete teacher allocation');
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { description };

    try {
      const response = await axios
        .post(`${apikey}teacher/papers`, data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
      console.log("Success:", response.data);
      alert("Request Created Successfully")
      closeCreateModal();
    } catch (error) {
      alert(`Error in creating request ${error}`);
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalIsOpen(false);
    setDescription("");
  };

  var dateConv = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <button onClick={openCreateModal} className="create-btn">Create Paper Request</button>

      <div className="request-container">
        {PaperData.map((paper, idx) => (
          <div key={idx} className="request-in">
            <p className="request-desc" style={{ textAlign: "center" }}>Description : {paper.description}</p>
            <div className="request-ts">
              <p>Created At: {dateConv(paper.CreatedAt)}</p>
              <p>Updated At : {dateConv(paper.UpdatedAt)}</p>
            </div>
            <div>
              {paper.status ? (
                paper.request ? (
                  <div className="request-status" style={{ backgroundColor: "green" }}>
                    <p><b>Accepted</b></p>
                  </div>
                ) : (
                  <div className="request-status" style={{ backgroundColor: "red" }}>
                    <p><b>Rejected</b></p>
                  </div>
                )
              ) : (
                <div className="request-status" style={{ backgroundColor: "yellow" }}>
                  <p><b>Pending</b></p>
                </div>
              )}
            </div>
            <button
              onClick={() => deletePaperReq(paper.ID)}
              className="bg-red-500 text-white py-1 px-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={createmodalIsOpen}
        onRequestClose={closeCreateModal}
        contentLabel="Paper Request Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="paper-form">
          <form onSubmit={handleSubmit}>
            <p>Description</p>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="btnc">
              <button onClick={closeCreateModal} style={
                { backgroundColor: "black", color: "white" }
              }>Close</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default PaperReq;
