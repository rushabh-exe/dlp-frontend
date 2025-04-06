import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {leftimage} from '../../../../assets/leftimageData'
import {rightimage} from '../../../../assets/rightimageData'
// Initialize pdfmake
pdfmake.vfs = pdfFonts.vfs;

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

  const createPdf = () => {
    if (!filteredTimetables || filteredTimetables.length === 0) {
      toast.error("No data available to generate PDF");
      return;
    }

    const docDefinition = {
      content: [
        {
          columns: [
            {
              image:`${leftimage}`, 
              width: 50,
              height: 50,
              alignment: 'center'
            },
            {
              stack: [
                {
                  text: 'K. J. Somaiya Institute of Technology Sion, Mumbai-22',
                  style: 'headerLarge',
                  alignment: 'center'
                },
                {
                  text: 'An Autonomous Institute permanently affiliated to University of Mumbai',
                  style: 'headerSmall',
                  alignment: 'center'
                },
                {
                  text: 'Accredited by NAAC and NBA, Approved by AICTE, New Delhi',
                  style: 'headerSmall',
                  alignment: 'center'
                }
              ],
              alignment: 'center'
            },
            {
              image: `${rightimage}`,
              width: 50,
              height: 50,
              alignment: 'center'
            }
          ]
        },
        {
          text: `Department of Electronics and Telecommunication Engineering`,
          alignment: 'center',
          fontSize: 13,
          margin: [0, 15, 0, 5]
        },
        {
          text: `Year: ${selectYear}${selectSem ? ` - Semester ${selectSem}` : ''} Timetable`,
          alignment: 'center',
          fontSize: 12,
          margin: [0, 0, 0, 15]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', 'auto', 'auto'],
            body: [
              [
                { text: 'Date', style: 'tableHeader', alignment: 'center' },
                { text: 'Subject', style: 'tableHeader', alignment: 'center' },
                { text: 'Start Time', style: 'tableHeader', alignment: 'center' },
                { text: 'End Time', style: 'tableHeader', alignment: 'center' }
              ],
              ...filteredTimetables.map(entry => [
                { text: entry.date || '', alignment: 'center' },
                { text: entry.subject || '', alignment: 'center' },
                { text: entry.start_time || '', alignment: 'center' },
                { text: entry.end_time || '', alignment: 'center' }
              ])
            ]
          },
          layout: {
            hLineWidth: function(i, node) { return 1; },
            vLineWidth: function(i, node) { return 1; },
            hLineColor: function(i, node) { return '#ddd'; },
            vLineColor: function(i, node) { return '#ddd'; },
            paddingLeft: function(i) { return 10; },
            paddingRight: function(i) { return 10; },
            paddingTop: function(i) { return 5; },
            paddingBottom: function(i) { return 5; }
          }
        }
      ],
      styles: {
        headerLarge: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        headerSmall: {
          fontSize: 10,
          margin: [0, 0, 0, 3]
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          fillColor: '#f3f4f6'
        }
      },
      defaultStyle: {
        fontSize: 10
      },
      pageMargins: [40, 40, 40, 40],
      pageSize: 'A4'
    };

    try {
      const pdfGenerator = pdfmake.createPdf(docDefinition);
      pdfGenerator.getBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Timetable_${selectYear}_${selectSem || 'All'}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });

      toast.success("PDF generated successfully");
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to generate PDF");
    }
  };

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
        <button 
          className='bg-white rounded-xl active:bg-blue-200 p-1' 
          onClick={createPdf}
        >
          Download PDF
        </button>
      </div>
     
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
