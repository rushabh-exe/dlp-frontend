import React, { useState, useEffect } from 'react';
import PrintButton from '../../../utils/PrintButton';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function GetTimeTable({ year }) {
  const [fetchedTimetables, setFetchedTimetables] = useState([]);
  const [selectYear, setSelectYear] = useState(year);
  const [selectSem, setSelectSem] = useState(""); // Default value for selectSem
  const [semesters, setSemesters] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;

  // Function to fetch timetables from the backend
  const fetchTimetables = async () => {
    try {
      const response = await axios.get(`${apikey}admin/get/timetable/${selectYear}`,  {withCredentials: true});
      const fetchedTimetables = response.data.timetables;

      // Extract semesters from fetched data and set unique semesters
      const semesters = [...new Set(fetchedTimetables.map(entry => entry.sem))];
      setFetchedTimetables(fetchedTimetables);
      setSemesters(semesters);
    } catch (error) {
      console.error('Error fetching timetables:', error);
      toast.error("error fetching timetable",{position: "bottom-right"})
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, [selectYear]);

  const handleSelectSemChange = (e) => {
    setSelectSem(e.target.value);
  };

  const handleDeleteYearTimetable = async () => {
    try {
      await axios.delete(`${apikey}admin/get/timetable/${selectYear}`);
      setFetchedTimetables([]);
      toast.success("Time Table Deleted Successfully",{position: "bottom-right"})

    } catch (error) {
      console.error('Error deleting timetable for the selected year:', error);
      toast.error("error Deleting timetable",{position: "bottom-right"})

    }
  };

  // Filter the fetched timetables based on the selected semester
  const filteredTimetables = selectSem 
    ? fetchedTimetables.filter(entry => entry.sem === selectSem)
    : fetchedTimetables;

  return (
    <div className='flex flex-col w-full gap-5'>
      <Toaster/>
      <div className='flex gap-2'>
        <select 
          className='p-2 w-fit rounded-xl' 
          name="selectSem" 
          id="selectSem" 
          value={selectSem} 
          onChange={handleSelectSemChange}
        >
          <option value="">Select Semester</option>
          {semesters.map((semester, index) => (
            <option key={index} value={semester}>{`Sem ${semester}`}</option>
          ))}
        </select>
        <button 
          className='bg-white rounded-xl active:bg-red-200 p-1' 
          onClick={handleDeleteYearTimetable}
        >
          Delete {year} Timetable
        </button>
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
            {filteredTimetables.map((entry, index) => (
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

export default GetTimeTable;
