import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const DqcReq = () => {
    const [getreviews, setGetreviews] = useState([])
    const [createmodalIsOpen, setCreateModalIsOpen] = useState(false);
    const [subject, setSubject] = useState("");
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");
    const [qpLink, setQPLink] = useState("");
    const [apLink, setAPLink] = useState("");
    const apikey = import.meta.env.VITE_API_URL;

    const fetchData = async () => {
        try {
            const response = await axios
                .get(`${apikey}teacher/dqc/reviews`, {
                    withCredentials: true,
                });
            setGetreviews(response.data);
        } catch (error) {
            console.log(`Error in fetching reviews ${error}`);
            toast.error(`Error in fetching reviews ${error}`, { position: "top-center" });
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const openCreateModal = () => {
        setCreateModalIsOpen(true);
    };

    const closeCreateModal = () => {
        setCreateModalIsOpen(false);
        setAPLink("")
        setSubject("")
        setYear("")
        setQPLink("")
        setSemester("")
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            Subject: subject,
            Year: year,
            Semester: semester,
            QPLink: qpLink,
            APLink: apLink,
        };

        try {
            const response = await axios.post(`${apikey}teacher/dqc/reviews`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Success:", response.data);
            toast.success(`Successfully created request`, { position: "top-center" });
            closeCreateModal();
            fetchData()
        } catch (error) {
            toast.error(`failed to create request`, { position: "top-center" });
            console.error("Error:", error.response?.data || error.message);
        }
    };

    const deleteDqcPaperReq = async (id) => {

        try {
            await axios.delete(`${apikey}teacher/dqc/reviews/${id}`, { withCredentials: true });
            toast.success(`Successfully deleted request`, { position: "top-center" });
            fetchData()
        } catch (err) {
            toast.error(`failed to delete request`, { position: "top-center" });
        }
    };

    return (
        <div className="max-w-full">
          <Toaster />
          <button onClick={openCreateModal} className="p-2 rounded-lg bg-red-700 text-white text-xl">
            Create Paper Request
          </button>
          <div className="p-4 max-w-3xl">
            {getreviews.map((review, idx) => (
              <div key={idx} className="bg-white my-2 mx-auto w-full max-w-full p-4 rounded-lg border border-black shadow-md leading-relaxed">
                <div className="text-lg flex justify-around flex-wrap">
                  <p className="my-1">Subject: {review.subject}</p>
                  <p className="my-1">Year: {review.year}</p>
                  <p className="my-1">Semester: {review.semester}</p>
                </div>
                <div className="text-lg flex justify-around flex-wrap">
                  <a
                    href={review.qplink}
                    className="text-red-500 no-underline py-2 px-3 border border-transparent rounded transition-colors hover:bg-blue-100 hover:text-red-700 hover:border-red-500"
                  >
                    QP Link
                  </a>
                  <p></p>
                  <a
                    href={review.aplink}
                    className="text-red-500 no-underline py-2 px-3 border border-transparent rounded transition-colors hover:bg-blue-100 hover:text-red-700 hover:border-red-500"
                  >
                    AP Link
                  </a>
                </div>
                <div>
                  {review.status ? (
                    review.request ? (
                      <div className="text-center text-white py-1 rounded-lg mt-2 bg-green-500">
                        <p><b>Accepted: {review.approver}</b></p>
                      </div>
                    ) : (
                      <div className="text-center text-white py-1 rounded-lg mt-2 bg-red-500">
                        <p><b>Rejected: {review.approver}</b></p>
                      </div>
                    )
                  ) : (
                    <div className="text-center text-white py-1 rounded-lg mt-2 bg-orange-500">
                      <p><b>Pending</b></p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteDqcPaperReq(review.ID)}
                  className="bg-red-500 text-white py-1 px-2 rounded mt-2 hover:opacity-80 transition"
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
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-lg shadow-lg p-5 z-[1000]"
            overlayClassName="fixed inset-0 bg-black bg-opacity-70 z-[999]"
          >
            <div className="flex flex-col gap-4 w-full">
              <form onSubmit={handleSubmit}>
                <p className="text-lg font-semibold text-gray-800 mb-1">Subject</p>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-[90%] p-2 text-lg border border-gray-300 rounded transition focus:border-red-500 focus:outline-none"
                />
                <p className="text-lg font-semibold text-gray-800 mb-1">Year</p>
                <input
                  type="text"
                  name="year"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  className="w-[90%] p-2 text-lg border border-gray-300 rounded transition focus:border-red-500 focus:outline-none"
                />
                <p className="text-lg font-semibold text-gray-800 mb-1">Semester</p>
                <input
                  type="text"
                  name="semester"
                  id="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                  className="w-[90%] p-2 text-lg border border-gray-300 rounded transition focus:border-red-500 focus:outline-none"
                />
                <p className="text-lg font-semibold text-gray-800 mb-1">Question Paper Link</p>
                <input
                  type="url"
                  name="qplink"
                  id="qplink"
                  value={qpLink}
                  onChange={(e) => setQPLink(e.target.value)}
                  required
                  className="w-[90%] p-2 text-lg border border-gray-300 rounded transition focus:border-red-500 focus:outline-none"
                />
                <p className="text-lg font-semibold text-gray-800 mb-1">Answer Paper Link</p>
                <input
                  type="url"
                  name="aplink"
                  id="aplink"
                  value={apLink}
                  onChange={(e) => setAPLink(e.target.value)}
                  required
                  className="w-[90%] p-2 text-lg border border-gray-300 rounded transition focus:border-red-500 focus:outline-none"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button type="button" onClick={closeCreateModal} className="bg-black text-white py-2 px-4 rounded transition hover:opacity-80">
                    Close
                  </button>
                  <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded transition hover:opacity-80">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      );
      
};

export default DqcReq;
