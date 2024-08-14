import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * DquBoard Component
 * Displays a list of requests and allows selecting a request for review.
 */
function DquBoard() {
  const [totalReq, setTotalReq] = useState([]);
  const [error, setError] = useState(null);
  const [selectedReqID, setSelectedReqID] = useState(null);
  const [loading, setLoading] = useState(true);
  const apikey = import.meta.env.VITE_API_URL;

  // Fetch requests from API
  const fetchRequests = useCallback(async () => {
    try {
      const response = await axios.get(`${apikey}dqc/requests`,{ withCredentials: true });
      setTotalReq(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("Failed to fetch requests.");
      setLoading(false);
    }
  }, [apikey]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Handle the request selection
  const handleSelectRequest = (reqID) => {
    setSelectedReqID(reqID);
  };

  if (selectedReqID) {
    return <ReviewReq reqID={selectedReqID} />;
  }

  if (loading) {
    return <div>Loading requests...</div>;
  }
  

  return (
    <div className='p-2 rounded-md'>
      <h1 className='uppercase font-bold'>Request List</h1>
      {error && <div className='text-red-500'>{error}</div>}
      <ul className='list-none pt-4'>
        {totalReq.map(req => (
          <RequestItem key={req.ID} req={req} onSelect={handleSelectRequest} />
        ))}
      </ul>
    </div>
  );
}

/**
 * RequestItem Component
 * Displays a single request item with its details and a button to view more.
 */
function RequestItem({ req, onSelect }) {
  var dateConv = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };
  return (
    <li className='bg-white p-2 rounded-md mt-4 flex items-center justify-between gap-4'>
      <div className='flex justify-start gap-4 text-lg font-mono'>
        <span>Subject: {req.subject}</span>
        <span>Semester: {req.semester}</span>
        <span>Time: {dateConv(req.CreatedAt)}</span>
        <span>Status: {req.status ? "Yes" : "No"}</span>
        <span>Reviewed: {req.request ? "Yes" : "No"}</span>
      </div>
      <button 
        onClick={() => onSelect(req.ID)} 
        className='bg-red-600 text-lg px-2 py-1 rounded-lg text-white'>
        Check
      </button>
    </li>
  );
}

/**
 * ReviewReq Component
 * Displays detailed information about a selected request.
 */
function ReviewReq({ reqID }) {
  const [reqDetails, setReqDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apikey = import.meta.env.VITE_API_URL;

  // Fetch request details from API
  const fetchRequestDetails = useCallback(async () => {
    try {
      const response = await axios.get(`${apikey}dqc/requests/${reqID}`,{ withCredentials: true });
      setReqDetails(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching request details:", err);
      setError("Failed to fetch request details.");
      setLoading(false);
    }
  }, [apikey, reqID]);

  useEffect(() => {
    fetchRequestDetails();
  }, [fetchRequestDetails]);

  if (loading) {
    return <div>Loading request details...</div>;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  if (!reqDetails) {
    return null;
  }
  var dateConv = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <div className='p-2'>
      <div className='bg-white p-2 rounded-md mt-4 flex flex-col gap-4'>
        <div className='text-lg font-mono'>
          <span>Subject: {reqDetails.subject}</span>
        </div>
        <div className='text-lg font-mono'>
          <span>Semester: {reqDetails.semester}</span>
        </div>
        <div className='text-lg font-mono'>
          <span>Time:{dateConv(reqDetails.CreatedAt)}</span>
          
        </div>
        <div className='text-lg font-mono'>
          <span>Status:{ reqDetails.status ? "Yes" : "No" } 
          </span>
        </div>
        <div className='text-lg font-mono'>
          <span>Reviewed: {reqDetails.request ? "Yes" : "No"}</span>
        </div>
      </div>
    </div>
  );
}

export default DquBoard;
