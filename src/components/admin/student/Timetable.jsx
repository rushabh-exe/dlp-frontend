import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrintButton from '../../utils/PrintButton';

function TimeTable({ year }) {

  const [showGetTimetable, setShowGetTimetable] = useState(null);

  useEffect(() => {
    setShowGetTimetable(true);
  }, []);

  const handleGetTimetable = () => {
    setShowGetTimetable(true);
  };

  const handleCreateTimetable = () => {
    setShowGetTimetable(false);
  };

  return (
    <div className='flex gap-5 w-full'>
      <div className='flex flex-col gap-3'>
        <button  className='px-4 text-nowrap py-2 border-2 border-gray-200 rounded-full bg-white text-xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={handleGetTimetable}>Get Timetable {year}</button>
        <button  className='px-4 text-nowrap py-2 border-2 border-gray-200 rounded-full bg-white text-xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={handleCreateTimetable}>Create Timetable {year}</button>
      </div>
      {showGetTimetable === true && (
        <GetTimeTable year={year} />
      )}
      {showGetTimetable === false && (
        <CreateTimeTable year={year} />
      )}
    </div>
  );
}


export function GetTimeTable({ year }) {
  const [fetchedTimetables, setFetchedTimetables] = useState([]);
  const [selectYear, setSelectYear] = useState(year); // Default value for selectYear
  const [selectSem, setSelectSem] = useState("null"); // Default value for selectSem
  const [semesters, setSemesters] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;
  // Function to fetch timetables from the backend
  const fetchTimetables = async () => {
    try {
      const response = await axios.get(`${apikey}admin/get/timetable/${selectYear}`);
      const fetchedTimetables = response.data.timetables;
      const semesters = fetchedTimetables.map(entry => entry.sem); // Extract semesters from fetched data
      setFetchedTimetables(fetchedTimetables);
      setSemesters([...new Set(semesters)]); // Remove duplicates using Set and spread operator
      console.log(fetchedTimetables);
    } catch (error) {
      console.error('Error fetching timetables:', error);
    }
  };


  // Use useEffect to fetch timetables when the component mounts or when selectYear or selectSem changes
  useEffect(() => {
    fetchTimetables();
  }, [selectYear, selectSem]);

  const handleSelectSemChange = (e) => {
    setSelectSem(e.target.value);
  };
  const handleDeleteYearTimetable = async () => {
    try {
      await axios.delete(`${apikey}admin/get/timetable/${selectYear}`);
      // Clear the fetched timetables for the selected year
      setFetchedTimetables([]);
    } catch (error) {
      console.error('Error deleting timetable for the selected year:', error);
    }
  };

  // Filter the fetched timetables based on the selected semester
  const filteredTimetables = fetchedTimetables.filter(entry => entry.sem === selectSem);

  return (
    <div className='flex flex-col w-full gap-5'>
      <div className='flex gap-2'>
        <select className='p-2 w-fit rounded-xl' name="selectSem" id="selectSem" value={selectSem} onChange={handleSelectSemChange} >
          {semesters.map((semester, index) => (
            <option key={index} value={semester}>{`Sem ${semester}`}</option>
          ))}
        </select>
        <button className='bg-white rounded-xl active:bg-red-200 p-1' onClick={handleDeleteYearTimetable}>Delete {year} Timetable</button>
      </div>
      <PrintButton contentId={'table_body'} />
      <section id='table_body' className="table_body w-1/2">
        <table className="w-full bg-white">
          <thead>
            <tr>
              <th className="p-2 border border-gray-400">Date</th>
              <th className="p-2 border border-gray-400">Subject</th>
              <th className="p-2 border border-gray-400">Start Time</th>
              <th className="p-2 border border-gray-400">End Time</th>
            </tr>
          </thead>
          <tbody>
            {fetchedTimetables.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-300 transition-all duration-500">
                <td className="p-2 border border-gray-400">{entry.date}</td>
                <td className="p-2 border border-gray-400">{entry.subject}</td>
                <td className="p-2 border border-gray-400">{entry.start_time}</td>
                <td className="p-2 border border-gray-400">{entry.end_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}



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
        return;
      }

      console.log('Post Request Body:', formattedTimetable);
      const response = await axios.post(`${apikey}admin/create/timetable/${year}`, formattedTimetable); // Using dynamic year prop
      console.log(response.data);
      setSelectedTimetable([]);
    } catch (error) {
      console.error('Error:', error);
    }
  }; return (
    <div>
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

function TimetableC({ timetable, onDelete }) {
  return (
    <section className="table_body bg-gray-100 max-w-2xl mx-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 border border-gray-400">Date</th>
            <th className="p-2 border border-gray-400">Subject</th>
            <th className="p-2 border border-gray-400">Start Time</th>
            <th className="p-2 border border-gray-400">End Time</th>
            <th className="p-2 border border-gray-400">Actions</th> {/* Add Actions column */}
          </tr>
        </thead>
        <tbody>
          {timetable.map((entry, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2">{entry.date.slice(0, 10)}</td>
              <td className="border border-gray-400 p-2">{entry.subject}</td>
              <td className="border border-gray-400 p-2">{entry.start_time}</td>
              <td className="border border-gray-400 p-2">{entry.end_time}</td>
              <td className="border border-gray-400 p-2">
                <button onClick={() => onDelete(index)}>Delete</button> {/* Add Delete button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default TimeTable;

