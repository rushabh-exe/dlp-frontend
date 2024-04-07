import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedTimetable, setSelectedTimetable] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: '',
    subject: '',
    start_time: '',
    end_time: ''
  });
  const [sem, setSem] = useState('1');

  const handleInputChange = (e) => {
    setNewEntry({
      ...newEntry,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = () => {
    if (!newEntry.date || !newEntry.subject || !newEntry.start_time || !newEntry.end_time) {
        alert('Please fill in all fields');
        return; 
    }

    const startTime = new Date(`2022-01-01T${newEntry.start_time}`);
    const formattedStartTime = startTime.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    const endTime = new Date(`2022-01-01T${newEntry.end_time}`);
    const formattedEndTime = endTime.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    const entryToAdd = {
        date: newEntry.date,
        subject: newEntry.subject,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        sem: sem 
    };

    setSelectedTimetable(prevTimetable => [...prevTimetable, entryToAdd]);

    setNewEntry({
        date: '',
        subject: '',
        start_time: '',
        end_time: ''
    });
};


  const handleReset = () => {
    setNewEntry({
      date: '',
      subject: '',
      start_time: '',
      end_time: ''
    });
  };

  const handleSubmit = async () => {
    try {
      const formattedTimetable = selectedTimetable.map(entry => ({
        year: "sy",
        sem: sem,
        subject: entry.subject,
        date: entry.date,
        start_time: entry.start_time,
        end_time: entry.end_time
      }));
      if (formattedTimetable.length === 0) {
        console.error('No entries to submit.');
        return;
      }

      console.log('Post Request Body:', formattedTimetable);
      const response = await axios.post('http://localhost:3001/admin/create/timetable/sy', formattedTimetable);
      console.log(response.data);
      setSelectedTimetable([]);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <div>
      <select className='p-2' value={sem} onChange={(e) => setSem(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <div className=' my-2'>

        <div className='inputbox flex mb-5 gap-2'>
          <input type="date" name="date" value={newEntry.date} onChange={handleInputChange} placeholder='Date' />
          <input type="text" name="subject" value={newEntry.subject} onChange={handleInputChange} placeholder='Subject' />
          <input type="time" name="start_time" value={newEntry.start_time} onChange={handleInputChange} placeholder='Start Time' />
          <input type="time" name="end_time" value={newEntry.end_time} onChange={handleInputChange} placeholder='End Time' />
          <div className=" ml-5">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleUpdate}>Update</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleReset}>Reset</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Confirm</button>
          </div>
        </div>
        <TimetableC timetable={selectedTimetable} />
      </div>
    </div>

  );
}

function TimetableC({ timetable }) {
  return (
    <section className="table_body bg-gray-100 max-w-2xl mx-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 border border-gray-400">Date</th>
            <th className="p-2 border border-gray-400">Subject</th>
            <th className="p-2 border border-gray-400">Start Time</th>
            <th className="p-2 border border-gray-400">End Time</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((entry, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2">{entry.date.slice(0, 10)}</td>
              <td className="border border-gray-400 p-2">{entry.subject}</td>
              <td className="border border-gray-400 p-2">{entry.start_time}</td>
              <td className="border border-gray-400 p-2">{entry.end_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default App;




