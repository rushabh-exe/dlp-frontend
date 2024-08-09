// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function SubjectUtils() {
//   const [year, setYear] = useState('');
//   const [sem, setSem] = useState(0);
//   const [subject, setSubject] = useState('');
//   const [subjects, setSubjects] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(sem)
//       const response = await axios.post(`${apikey}admin/create/vitals/${year}`, {
//         year,
//         sem,
//         subject
//       });

//       console.log('Success:', response.data);
//       setSubject('');
//       fetchSubjectData();
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleDelete = async (subjectname) => {
//     try {
//       const response = await axios.delete(`http://localhost:3001/admin/create/vitals/${year}/${subjectname}`);
//       console.log('Deleted:', response.data);
//       fetchSubjectData();
//     } catch (error) {
//       console.error('Error deleting subject:', error);
//     }
//   };

//   const fetchSubjectData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3001/admin/create/vitals/${year}`);
//       console.log('Response:', response.data);
//       setSubjects(response.data);
//     } catch (error) {
//       console.error('Error fetching subject data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchSubjectData();
//   }, [year]);

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Subject Utils</h2>
//       <form onSubmit={handleSubmit} className="mb-8">
//         <div className="flex flex-wrap mb-4">
//           <label htmlFor="year"  className="mr-3">Year:</label>
//           <select id="year" value={year} onChange={(e) => setYear(e.target.value)} className="p-2 rounded border border-gray-300">
//             <option value="">Select Year</option>
//             <option value="SY">SY</option>
//             <option value="TY">TY</option>
//             <option value="LY">LY</option>
//           </select>
//         </div>
//         <div className="flex flex-wrap mb-4">
//           <label htmlFor="sem"  className="mr-3">Semester:</label>
//           <input type="number" id="sem" value={sem} onChange={(e) => setSem(e.target.value)} className=" p-2 rounded border border-gray-300" />
//         </div>
//         <div className="flex flex-wrap mb-4">
//           <label htmlFor="subject"  className="mr-3">Subject:</label>
//           <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className=" p-2 rounded border border-gray-300" />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
//       </form>

//       <div>
//         <h3 className="text-xl font-bold mb-4">Subject Data</h3>
//         <table className="w-full border-collapse mb-4 bg-white">
//           <thead>
//             <tr>
//               <th className="border border-gray-400 p-2">ID</th>
//               <th className="border border-gray-400 p-2">Year</th>
//               <th className="border border-gray-400 p-2">Semester</th>
//               <th className="border border-gray-400 p-2">Name</th>
//               <th className="border border-gray-400 p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {subjects.map((subject, index) => (
//               <tr key={index} className="hover:bg-gray-100 transition-all duration-500">
//                 <td className="border border-gray-400 p-2">{subject.ID}</td>
//                 <td className="border border-gray-400 p-2">{subject.year}</td>
//                 <td className="border border-gray-400 p-2">{subject.Sem}</td>
//                 <td className="border border-gray-400 p-2">{subject.name}</td>
//                 <td className="border border-gray-400 p-2">
//                   <button onClick={() => handleDelete(subject.name)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default SubjectUtils;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function SubjectUtils() {
//   const [year, setYear] = useState('');
//   const [sem, setSem] = useState(0);
//   const [subject, setSubject] = useState('');
//   const [subjects, setSubjects] = useState([]);
//   const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(sem)
//       const response = await axios.post(`http://localhost:3001/admin/create/vitals/${year}`, {
//         year,
//         sem,
//         subject
//       });

//       console.log('Success:', response.data);
//       setSubject('');
//       fetchSubjectData();
//       setIsAddSubjectOpen(false); // Close the add subject pop-up after submission
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleDelete = async (subjectname) => {
//     try {
//       const response = await axios.delete(`http://localhost:3001/admin/create/vitals/${year}/${subjectname}`);
//       console.log('Deleted:', response.data);
//       fetchSubjectData();
//     } catch (error) {
//       console.error('Error deleting subject:', error);
//     }
//   };

//   const fetchSubjectData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3001/admin/create/vitals/${year}`);
//       console.log('Response:', response.data);
//       setSubjects(response.data);
//     } catch (error) {
//       console.error('Error fetching subject data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchSubjectData();
//   }, [year]);

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Subject Utils</h2>
//       <div className="mb-8">
//         <button onClick={() => setIsAddSubjectOpen(true)} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Add New Subject</button>
//       </div>

//       {/* Add Subject Popup */}
//       {isAddSubjectOpen && (
//         <div className="fixed inset-0 z-50 flex justify-center items-center">
//           <div className="absolute inset-0 bg-black opacity-50"></div>
//           <div className="relative bg-white rounded-lg overflow-hidden shadow-xl">
//             <div className="px-6 py-4">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-bold">Add New Subject</h2>
//                 <button
//                   onClick={() => setIsAddSubjectOpen(false)}
//                   className="text-gray-600 hover:text-gray-800 transition duration-300"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <form onSubmit={handleSubmit} className="mt-4">
//                 <div className="flex flex-wrap mb-4">
//                   <label htmlFor="year"  className="mr-3">Year:</label>
//                   <select id="year" value={year} onChange={(e) => setYear(e.target.value)} className="p-2 rounded border border-gray-300">
//                     <option value="">Select Year</option>
//                     <option value="SY">SY</option>
//                     <option value="TY">TY</option>
//                     <option value="LY">LY</option>
//                   </select>
//                 </div>
//                 <div className="flex flex-wrap mb-4">
//                   <label htmlFor="sem"  className="mr-3">Semester:</label>
//                   <input type="number" id="sem" value={sem} onChange={(e) => setSem(e.target.value)} className=" p-2 rounded border border-gray-300" />
//                 </div>
//                 <div className="flex flex-wrap mb-4">
//                   <label htmlFor="subject"  className="mr-3">Subject:</label>
//                   <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className=" p-2 rounded border border-gray-300" />
//                 </div>
//                 <div className="flex justify-end">
//                   <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       <div>
//         <h3 className="text-xl font-bold mb-4">Subject Data</h3>
//         <table className="w-full border-collapse mb-4 bg-white rounded-lg shadow-lg">
//           <thead>
//             <tr>
//               <th className="border border-gray-400 p-3">ID</th>
//               <th className="border border-gray-400 p-3">Year</th>
//               <th className="border border-gray-400 p-3">Semester</th>
//               <th className="border border-gray-400 p-3">Name</th>
//               <th className="border border-gray-400 p-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {subjects.map((subject, index) => (
//               <tr key={index} className="hover:bg-gray-100 transition-all duration-500">
//                 <td className="border border-gray-400 p-3">{subject.ID}</td>
//                 <td className="border border-gray-400 p-3">{subject.year}</td>
//                 <td className="border border-gray-400 p-3">{subject.Sem}</td>
//                 <td className="border border-gray-400 p-3">{subject.name}</td>
//                 <td className="border border-gray-400 p-3">
//                   <button onClick={() => handleDelete(subject.name)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default SubjectUtils;
// import React, { useState, useEffect } from 'react';

// function SubjectUtils() {
//   const [year, setYear] = useState('');
//   const [secondSelect, setSecondSelect] = useState('');

//   return (
//     <div>
//       {!year && !secondSelect && (
//         <div className="firstselect flex gap-5">
//           <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setYear('SY')}>SY</button>
//           <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setYear('TY')}>TY</button>
//           <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setYear('LY')}>LY</button>
//         </div>
//       )}
//       {year && !secondSelect && (
//         <Addsubject
//         year
//         />
//       )}
//     </div>
//   )
// }

// export function Addsubject({year}) {
//     const [year, setYear] = useState('');
//   const [sem, setSem] = useState(0);
//   const [subject, setSubject] = useState('');
//   const [subjects, setSubjects] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(sem)
//       const response = await axios.post(`http://localhost:3001/admin/create/vitals/${year}`, {
//         year,
//         sem,
//         subject
//       });

//       console.log('Success:', response.data);
//       setSubject('');
//       fetchSubjectData();
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleDelete = async (subjectname) => {
//     try {
//       const response = await axios.delete(`http://localhost:3001/admin/create/vitals/${year}/${subjectname}`);
//       console.log('Deleted:', response.data);
//       fetchSubjectData();
//     } catch (error) {
//       console.error('Error deleting subject:', error);
//     }
//   };

//   const fetchSubjectData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3001/admin/create/vitals/${year}`);
//       console.log('Response:', response.data);
//       setSubjects(response.data);
//     } catch (error) {
//       console.error('Error fetching subject data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchSubjectData();
//   }, [year]);
//   return (
//     <div>
//       <div>
//         <p>alredy added subject {year} </p>//get request
//         <div><p>math</p><button>delete</button></div>
//         <div><p>english</p>
//         <button>delete</button></div>
//         <div><p>etc</p><button>delete</button></div>
//       </div>
// <div><button>add a new subject</button><input type="text" /></div>
//     </div>
//   )
// }

// export default SubjectUtils

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests

function SubjectUtils() {
  const [year, setYear] = useState('');
  const [secondSelect, setSecondSelect] = useState('');
  const apikey = import.meta.env.VITE_API_URL;

  return (
    <div>
      {!year && !secondSelect && (
        <div className="firstselect flex gap-5">
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setYear('SY')}>SY</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setYear('TY')}>TY</button>
          <button className='px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' onClick={() => setYear('LY')}>LY</button>
        </div>
      )}
      {year && !secondSelect && (
        <Addsubject yearProp={year} /> // Pass year as a prop
      )}
    </div>
  )
}

export function Addsubject({ yearProp }) { // Rename prop to avoid conflict
  const [sem, setSem] = useState(0);
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const apikey = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apikey}admin/create/vitals/${yearProp}`, {
        year: yearProp, // Use prop instead of local state
        sem,
        subject
      });
      console.log('Success:', response.data);
      setSubject('');
      fetchSubjectData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (subjectname) => {
    try {
      const response = await axios.delete(`${apikey}admin/create/vitals/${yearProp}/${subjectname}`);
      console.log('Deleted:', response.data);
      fetchSubjectData();
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const fetchSubjectData = async () => {
    try {
      const response = await axios.get(`${apikey}admin/create/vitals/${yearProp}`);
      console.log('Response:', response.data);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subject data:', error);
    }
  };

  useEffect(() => {
    fetchSubjectData();
  }, [yearProp]);

  return (
    <div>
      <div className='flex flex-wrap gap-5'>
        {subjects.map((subject, index) => (
          <div className='border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:text-red-900 transition duration-300 flex items-center justify-between overflow-hidden mb-2' key={index}>
            <p className='flex-grow p-2'>{subject.name}</p>
            <button className='px-4 py-2 bg-slate-400 text-white rounded hover:bg-red-500 transition duration-300' onClick={() => handleDelete(subject.name)}>Delete</button>
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring focus:border-red-500 flex-grow"
            placeholder="Enter a new subject"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-red-500 text-white rounded-r-full hover:bg-red-600 transition duration-300"
          >
            Add
          </button>
        </form>

      </div>
    </div>
  );
}

export default SubjectUtils;
