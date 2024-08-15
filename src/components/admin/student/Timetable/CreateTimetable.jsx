import React, { useState, useEffect } from 'react';
import TimetableC from './TimetableC';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
function CreateTimeTable({ year }) {
    const [selectedTimetable, setSelectedTimetable] = useState([]);
  
    const [newEntry, setNewEntry] = useState({
      date: '',
      subject: '',
      start_time: '',
      end_time: ''
    });
    const [sem, setSem] = useState("null");
  
    const handleInputChange = (e) => {
      setNewEntry({
        ...newEntry,
        [e.target.name]: e.target.value
      });
    };
  
    const handleUpdate = () => {
      if (!newEntry.date || !newEntry.subject || !newEntry.start_time || !newEntry.end_time || sem === "null") {
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
    const deleteEntry = (index) => {
      setSelectedTimetable(prevTimetable => prevTimetable.filter((_, i) => i !== index));
    };
    const apikey = import.meta.env.VITE_API_URL;
  
    const [subjects, setSubjects] = useState([]);
    const fetchSubjectData = async () => {
      try {
        const response = await axios.get(`${apikey}admin/create/vitals/${year}`);
        console.log('Response:', response.data);
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subject data:', error);
      }
    };
  
    useEffect(() => {
      fetchSubjectData();
    }, [year]);
    console.log(subjects.map((subject) => subject.name));
  
    const handleSubmit = async () => {
      try {
        const formattedTimetable = selectedTimetable.map(entry => ({
          year: year,
          sem: sem,
          subject: entry.subject,
          date: entry.date,
          start_time: entry.start_time,
          end_time: entry.end_time
        }));
        if (formattedTimetable.length === 0) {
          console.error('No entries to submit.');
          toast.error("No entries to submit",{position: "bottom-right"})
          return;
        }
  
        console.log('Post Request Body:', formattedTimetable);
        const response = await axios.post(`${apikey}admin/create/timetable/${year}/${sem}`, formattedTimetable); // Using dynamic year prop
        console.log(response.data);
        setSelectedTimetable([]);
        toast.success("Time Table Created Successfully",{position: "bottom-right"})
      } catch (error) {
        console.error('Error:', error);
      }
    }; return (
      <div>
        <Toaster/>
        <select className='p-2' value={sem} onChange={(e) => setSem(e.target.value)}>
          <option value="null" defaultValue={setSem} disabled >Choose Sem</option>
          <option value="1">Sem 1</option>
          <option value="2">Sem 2</option>
          <option value="3">Sem 3</option>
          <option value="4">Sem 4</option>
          <option value="5">Sem 5</option>
          <option value="6">Sem 6</option>
          <option value="7">Sem 7</option>
          <option value="8">Sem 8</option>
        </select>
        <div className=' my-2'>
          <div className='inputbox flex mb-5 gap-2'>
            <input type="date" name="date" value={newEntry.date} onChange={handleInputChange} placeholder='Date' />
            <select name="subject" value={newEntry.subject} onChange={handleInputChange}>
              <option value="" disabled>Select Subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject.name}>{subject.name}</option>
              ))}
            </select>
            <input type="time" name="start_time" value={newEntry.start_time} onChange={handleInputChange} placeholder='Start Time' />
            <input type="time" name="end_time" value={newEntry.end_time} onChange={handleInputChange} placeholder='End Time' />
            <div className=" ml-5">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleUpdate}>Update</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleReset}>Reset</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Confirm</button>
            </div>
          </div>
          <TimetableC timetable={selectedTimetable} onDelete={deleteEntry} />
        </div>
      </div>
    );
  }

export default CreateTimeTable;
