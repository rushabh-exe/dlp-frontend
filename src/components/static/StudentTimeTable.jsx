import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import PrintButton from '../utils/PrintButton';

function StudentTimeTable() {
  const [fetchedTimetables, setFetchedTimetables] = useState([]);
  const [selectYear, setSelectYear] = useState(""); // Default value for selectYear
  const [selectSem, setSelectSem] = useState(""); // Default value for selectSem
  const [semesters, setSemesters] = useState([]);
  const [years, setYears] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;

  // Function to fetch timetables from the backend
  const fetchTimetables = async () => {
    try {
      const response = await axios.get(`${apikey}student/timetable`);
      const fetchedTimetables = response.data;

      // Sort the fetched data by year and semester
      const sortedTimetables = fetchedTimetables.sort((a, b) => {
        if (a.year === b.year) {
          return a.sem.localeCompare(b.sem);
        }
        return a.year.localeCompare(b.year);
      });

      // Extract unique semesters and years from fetched data
      const semesters = [...new Set(sortedTimetables.map(entry => entry.sem))];
      const years = [...new Set(sortedTimetables.map(entry => entry.year))];
      setFetchedTimetables(sortedTimetables);
      setSemesters(semesters);
      setYears(years);
    } catch (error) {
      console.error('Error fetching timetables:', error);
      toast.error("Error fetching timetable", { position: "bottom-right" });
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  const handleSelectYearChange = (e) => {
    setSelectYear(e.target.value);
  };

  const handleSelectSemChange = (e) => {
    setSelectSem(e.target.value);
  };

  // Filter the fetched timetables based on the selected year and semester
  const filteredTimetables = fetchedTimetables.filter(entry => {
    const matchesYear = selectYear ? entry.year === selectYear : true;
    const matchesSem = selectSem ? entry.sem === selectSem : true;
    return matchesYear && matchesSem;
  });

  return (
    <div className='flex flex-col w-full gap-5'>
      <Toaster />
      <div className='flex gap-2'>
        <select 
          className='p-2 w-fit rounded-xl' 
          name="selectYear" 
          id="selectYear" 
          value={selectYear} 
          onChange={handleSelectYearChange}
        >
          <option value="">Select Year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>
        
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

export default StudentTimeTable;
