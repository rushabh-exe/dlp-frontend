import "./Dqc.css";
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const DqcReq = () => {
    const [getreviews, setGetreviews] = useState([])
    const [createmodalIsOpen, setCreateModalIsOpen] = useState(false);
    const [subject, setSubject] = useState("");
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");
    const [qpLink, setQPLink] = useState("");
    const [apLink, setAPLink] = useState("");
    const apikey = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios
                    .get(`${apikey}teacher/dqc/reviews`, {
                        withCredentials: true,
                    });
                setGetreviews(response.data);
            } catch (error) {
                alert(`Error in fetching reviews ${error}`);
                console.log(`Error in fetching reviews ${error}`);
            }
        }
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
            closeCreateModal();
        } catch (error) {
            alert(`Error in send review: ${error}`);
            console.error("Error:", error.response?.data || error.message);
        }
    };

    const deleteDqcPaperReq = async (id) => {

        try {
            await axios.delete(`${apikey}teacher/dqc/reviews/${id}`, { withCredentials: true });
            window.location.reload();
            alert("Successfully deleted")
        } catch (err) {
            alert('Failed to delete teacher allocation');
        }
    };

    return (
        <div style={{ maxWidth: "100%" }}>
            <button onClick={openCreateModal} className="create-btn">Create Paper Request</button>
            <div className="review-container">
                {getreviews.map((review, idx) => (
                    <div key={idx} className="review-in">
                        <div className="review-dts">
                            <p>Subject: {review.subject}</p>
                            <p>Year: {review.year}</p>
                            <p>Semester: {review.semester}</p>
                        </div>
                        <div className="review-dts">
                            <a href={review.qplink}>QP Link</a>
                            <p></p>
                            <a href={review.aplink}>AP Link</a>
                        </div>
                        <div>
                            {review.status ? (
                                review.request ? (
                                    <div className="review-status" style={{ backgroundColor: "green" }}>
                                        <p><b>Accepted: {review.approver}</b></p>
                                    </div>
                                ) : (
                                    <div className="review-status" style={{ backgroundColor: "red" }}>
                                        <p><b>Rejected: {review.approver}</b></p>
                                    </div>
                                )
                            ) : (
                                <div className="review-status" style={{ backgroundColor: "orange" }}>
                                    <p><b>Pending</b></p>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => deleteDqcPaperReq(review.ID)}
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
                        <p>Subject</p>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                        <p>Year</p>
                        <input
                            type="text"
                            name="year"
                            id="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />
                        <p>Semester</p>
                        <input
                            type="text"
                            name="semester"
                            id="semester"
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            required
                        />
                        <p>Question Paper Link</p>
                        <input
                            type="url"
                            name="qplink"
                            id="qplink"
                            value={qpLink}
                            onChange={(e) => setQPLink(e.target.value)}
                            required
                        />
                        <p>Answer Paper Link</p>
                        <input
                            type="url"
                            name="aplink"
                            id="aplink"
                            value={apLink}
                            onChange={(e) => setAPLink(e.target.value)}
                            required
                        />
                        <div className="btnc">
                            <button type="button" onClick={closeCreateModal} style={{ backgroundColor: "black", color: "white" }}>
                                Close
                            </button>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default DqcReq;
