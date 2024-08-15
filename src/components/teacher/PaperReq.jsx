import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";

const PaperReq = () => {
  const [description, setDescription] = useState("");
  const [createmodalIsOpen, setCreateModalIsOpen] = useState(false);
  const [PaperData, setPaperData] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;


  const fetchData = async () => {
    try {
      const response = await axios.get(`${apikey}teacher/papers`, { withCredentials: true });
      setPaperData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data", { position: "top-center" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletePaperReq = async (id) => {

    try {
      await axios.delete(`${apikey}teacher/papers/${id}`, { withCredentials: true });
      toast.success("deleted successfully", { position: "top-center" })
      fetchData(); 
    } catch (err) {
      toast.error("Failed to delete request", { position: "top-center" })
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
      fetchData(); 
      toast.success("request created successfully", { position: "top-center" })
      closeCreateModal();
    } catch (error) {
      toast.error("error in creating request", { position: "top-center" })
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
    <div className="max-w-full">
      <Toaster />
      <button onClick={openCreateModal} className="create-btn bg-red-700 text-white text-xl rounded-lg p-2 m-0">
        Create Paper Request
      </button>
      <div className="request-container mt-5">
        {PaperData.map((paper, idx) => (
          <div key={idx} className="request-in bg-white my-2 max-w-[500px] p-4 rounded-lg border border-black shadow-md leading-6">
            <p className="request-desc text-xl mb-2">Description: {paper.description}</p>
            <div className="request-ts text-lg leading-tight flex justify-between flex-wrap">
              <p>Created At: {dateConv(paper.CreatedAt)}</p>
              <p>Updated At: {dateConv(paper.UpdatedAt)}</p>
            </div>
            <div>
              {paper.status ? (
                paper.request ? (
                  <div className="request-status bg-green-500 text-white text-center py-1 rounded-lg mt-2">
                    <p><b>Accepted</b></p>
                  </div>
                ) : (
                  <div className="request-status bg-red-500 text-white text-center py-1 rounded-lg mt-2">
                    <p><b>Rejected</b></p>
                  </div>
                )
              ) : (
                <div className="request-status bg-yellow-500 text-white text-center py-1 rounded-lg mt-2">
                  <p><b>Pending</b></p>
                </div>
              )}
            </div>
            <button
              onClick={() => deletePaperReq(paper.ID)}
              className="bg-red-500 text-white py-1 px-2 rounded mt-3"
            >
              Delete The Request
            </button>
          </div>
        ))}
      </div>
  
      <Modal
        isOpen={createmodalIsOpen}
        onRequestClose={closeCreateModal}
        contentLabel="Paper Request Modal"
        className="Modal"
        overlayClassName="Overlay bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full flex items-center justify-center"
      >
        <div className="paper-form bg-pink-100 border border-pink-200 rounded-lg p-5 shadow-lg max-w-full mx-auto">
          <form onSubmit={handleSubmit}>
            <p className="text-lg text-red-700 mb-2">Description</p>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-[97%] p-2 border border-black rounded-md text-lg h-20"
            />
            <div className="btnc flex justify-between mt-4">
              <button
                onClick={closeCreateModal}
                className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
              >
                Close
              </button>
              <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-300">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
  
};

export default PaperReq;
