import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DquBoard() {
  const [TotalReq, setTotalReq] = useState([]);
  const [error, setError] = useState(null);
  const [selectedReqID, setSelectedReqID] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/dqc/requests/') 
      .then(response => {
        setTotalReq(response.data);
      })
      .catch(error => {
        console.error("Error fetching data", error);
        setError("Failed to fetch requests.");
      });
  }, []);

  if (selectedReqID !== null) {
    return <ReviewReq ReqID={selectedReqID} />;
  }

  return (
    <div className='p-2 rounded-md'>
      <h1 className='uppercase font-bold'>Request List</h1>
      {error && <div className='text-red-500'>{error}</div>}
      <ul className='list-none pt-4'>
        {TotalReq.map(req => (
          <li key={req.ID} className='bg-white p-2 rounded-md mt-4 flex items-center justify-between gap-4'>
            <div className='flex justify-start gap-4 text-lg font-mono'>
              <span>Subject: {req.subject}</span>
              <span>Semester: {req.semester}</span>
              <span>Time: {req.CreatedAt}</span>
              <span>Status: {req.status}</span>
              <span>Reviewed: {req.request}</span>
            </div>
            <button 
              onClick={() => setSelectedReqID(req.ID)} 
              className='bg-red-600 text-lg px-2 py-1 rounded-lg text-white'>
              Check
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReviewReq({ ReqID }) {
  const [reqDetails, setReqDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/dqc/requests/${ReqID}`)
      .then(response => {
        setReqDetails(response.data);
      })
      .catch(error => {
        console.error("Error fetching data", error);
        setError("Failed to fetch request details."); 
      });
  }, [ReqID]);

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  if (!reqDetails) {
    return <div>Loading...</div>;
  }

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
          <span>Time: {reqDetails.CreatedAt}</span>
        </div>
        <div className='text-lg font-mono'>
          <span>Status: {reqDetails.status}</span>
        </div>
        <div className='text-lg font-mono'>
          <span>Reviewed: {reqDetails.request}</span>
        </div>
      </div>
    </div>
  );
}

export default DquBoard;
