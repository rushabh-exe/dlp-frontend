import React, { useState } from 'react';

function Uploadpaper() {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [questionFile, setQuestionFile] = useState(null);
  const [solutionFile, setSolutionFile] = useState(null);

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (type === 'question') {
      setQuestionFile(file);
    } else if (type === 'solution') {
      setSolutionFile(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedYear || !selectedSubject || !questionFile || !solutionFile) {
      alert('Please fill in all fields');
      return;
    }

    setSelectedYear('');
    setSelectedSubject('');
    setQuestionFile(null);
    setSolutionFile(null);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Upload Paper</h1>
      <div className="flex mb-4">
        <div className="mr-4">
          <label className="block mb-1">Select Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Select Year</option>
            <option value="SY">SY</option>
            <option value="TY">TY</option>
            <option value="LY">LY</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Select Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Upload Question Paper:</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => handleFileUpload(e, 'question')}
          className="border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Upload Solution:</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => handleFileUpload(e, 'solution')}
          className="border rounded p-2"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
}

export default Uploadpaper;
