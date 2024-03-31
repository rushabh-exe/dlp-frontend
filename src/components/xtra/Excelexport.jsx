import React from 'react';
import * as XLSX from 'xlsx';
import * as XlsxPopulate from 'xlsx-populate';

const Excelexport = ({ data }) => {
  const createDownloadData = () => {
    handleExport().then(url => {
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', url);
      downloadAnchorNode.setAttribute('download', 'teacher_allocations.xlsx');
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const handleExport = () => {
    const title = [{ A: 'Teacher Allocations' }, {}];

    let table = [
      {
        A: 'Sr.no.',
        B: 'Classroom',
        C: 'Main Teacher',
        D: 'Co Teacher',
        E: 'Date',
        F: 'Time'
      }
    ];

    data.forEach((allocation, index) => {
      table.push({
        A: index + 1,
        B: allocation.classroom,
        C: allocation.main_teacher,
        D: allocation.co_teacher,
        E: allocation.date,
        F: `${allocation.start_time} - ${allocation.end_time}`
      });
    });

    const finalData = [...title, ...table];

    const wb = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(finalData, { skipHeader: true });
    XLSX.utils.book_append_sheet(wb, sheet, 'teacher_allocations');

    const workbookBlob = workbook2blob(wb);

    return addStyle(workbookBlob);
  };

  const workbook2blob = workbook => {
    const wopts = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    };

    const wbout = XLSX.write(workbook, wopts);

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

    return blob;
  };

  const s2ab = s => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i);
    return buf;
  };

  const addStyle = workbookBlob => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then(workbook => {
      workbook.sheets().forEach(sheet => {
        sheet.usedRange().style({
          fontFamily: 'Arial',
          verticalAlignment: 'center'
        });
      });

      return workbook.outputAsync().then(workbookBlob => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <button
      onClick={() => {
        createDownloadData();
      }}
      className="btn btn-primary float-end"
    >
      Export
    </button>
  );
};

export default Excelexport;

//Navigation.jsx

// import React from 'react';
// import Logout from '../authandaccess/Logout';

// function Navigation({ setIsLoggedIn, userName, userImg }) {
//     const location = useLocation();

//     return (
//         <div className="navigation-sidebar flex bg-white">
//             <div className="flex w-full justify-start gap-5">
//                 <div className="flex justify-center gap-2 p-2 items-center">
//                     <img src={userImg} alt="SVG" className="w-12 h-12 rounded-full" />
//                     <p className="text-center flex gap-1 text-sm py-2 uppercase">
//                         <span>WELCOME,</span>
//                         <span className=" font-bold">{userName ? userName : 'USER'}</span>
//                     </p>
//                 </div>
//                 <div className="flex p-2">
//                     <CustomNavLink to="/" currentPath={location.pathname} icon={<RiDashboardLine />}>Dashboard</CustomNavLink>
//                     <CustomNavLink to="/ClassroomAlloc" currentPath={location.pathname} icon={<RiUserLine />}>ClassroomAlloc</CustomNavLink>
//                     <CustomNavLink to="/GetAttendance" currentPath={location.pathname} icon={<RiBox2Line />}>GetAttendance</CustomNavLink>
//                     <CustomNavLink to="/GetExamtt" currentPath={location.pathname} icon={<RiTable2 />} >GetExamtt</CustomNavLink>
//                     <CustomNavLink to="/GetSupervision" currentPath={location.pathname} icon={<RiUserLine />}>GetSupervision</CustomNavLink>
//                     <CustomNavLink to="/StudentAlloc" currentPath={location.pathname} icon={<RiUserSettingsLine />} >StudentAlloc</CustomNavLink>
//                     <CustomNavLink to="/TeachersAlloc" currentPath={location.pathname} icon={<RiUserLine />}>TeachersAlloc</CustomNavLink>
//                 </div>
//             </div>
//             <div>
//                 <CustomNavLink to="/Settings" currentPath={location.pathname} icon={<RiSettings3Line />}>Settings</CustomNavLink>
//                 <CustomNavLink currentPath={location.pathname} icon={<RiLoginBoxLine />}><Logout setIsLoggedIn={setIsLoggedIn} /></CustomNavLink>
//             </div>
//         </div>
//     );
// }

// function CustomNavLink({ to, currentPath, icon, children }) {
//     const isActive = to === currentPath;
//     return (
//         <NavLink to={to} className={`route flex items-center ${isActive ? "bg-red-800 text-white" : "text-gray-700 hover:bg-slate-200"} py-2 px-4`} > {icon && <span className="mr-2">{icon}</span>} {children}</NavLink>
//     );
// }



// export default Navigation


//App.jsx

// import React, { useEffect, useState } from "react";
// import {BrowserRouter as Router,Routes,Route,NavLink,useLocation,}from "react-router-dom";
// import {RiBox2Line,RiDashboardLine,RiLoginBoxLine,RiSettings3Line,RiTable2,RiUserLine,RiUserSettingsLine,} from "react-icons/ri";
// import { gapi } from "gapi-script";

// import ClassroomAlloc from './components/getallocation/ClassroomAlloc';
// import GetAttendance from './components/getallocation/GetAttendance';
// import GetExamtt from './components/getallocation/GetExamtt';
// import GetSupervision from './components/getallocation/GetSupervision';
// import StudentAlloc from './components/getallocation/StudentAlloc';
// import TeachersAlloc from './components/getallocation/TeachersAlloc';
// import Home from './components/dashboard/Home';
// import Settings from './components/authandaccess/Settings';
// import Logout from './components/authandaccess/Logout';
// import Login from './components/authandaccess/Login';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [userImg, setUserImg] = useState('');
//   const clientId ="152111620630-d01stikjdcthgcfrjhhmpuetctpnqs61.apps.googleusercontent.com";
//   const scope = "profile email";

//   useEffect(() => {
//     const initClient = async () => {
//       try {
//         await gapi.client.init({clientId,scope,});
//       } catch (error) {
//         console.error("Error initializing Google API client:", error);
//       }
//     };

//     if (!window.gapi.client) {window.gapi.load("client:auth2", initClient);} 
//     else {
//       initClient();
//     }
//   }, []);

//   return (
//     <Router>
//       {!isLoggedIn && <Login setUser={setUserName} setIsLoggedIn={setIsLoggedIn} setUserImg={setUserImg} />}
//       {isLoggedIn && (
//         <main className="bg-slate-300 min-h-screen flex flex-col gap-1 ">
//           <Navigation userName={userName} userImg={userImg} setIsLoggedIn={setIsLoggedIn}  />
//           <div className="dashboard p-4 mx-auto flex-1">
//             <Routes>
//               <Route path="/ClassroomAlloc" element={<ClassroomAlloc/>} />
//               <Route path="/GetAttendance" element={<GetAttendance/>} />
//               <Route path="/GetExamtt" element={<GetExamtt/>} />
//               <Route path="/GetSupervision" element={<GetSupervision/>} />
//               <Route path="/StudentAlloc" element={<StudentAlloc/>} />
//               <Route path="/TeachersAlloc" element={<TeachersAlloc/>} />
//               <Route path="/Settings" element={<Settings/>} />
//               <Route path="/*" element={<Home/>} />
//             </Routes>
//           </div>
//         </main>
//       )}
//     </Router>
//   );
// }

// function Navigation({ setIsLoggedIn, userName, userImg }) {
//   const location = useLocation();

//   return (
//     <div className="navigation-sidebar flex bg-white">
//       <div className="flex w-full justify-start gap-5">
//         <div className="flex justify-center gap-2 p-2 items-center">
//           <img src={userImg} alt="SVG" className="w-12 h-12 rounded-full" />
//           <p className="text-center flex gap-1 text-sm py-2 uppercase">
//             <span>WELCOME,</span>
//             <span className=" font-bold">{userName ? userName : 'USER'}</span>
//           </p>
//         </div>
//         <div className="flex p-2">
//           <CustomNavLink to="/" currentPath={location.pathname} icon={<RiDashboardLine />}>Dashboard</CustomNavLink>
//           <CustomNavLink to="/ClassroomAlloc" currentPath={location.pathname} icon={<RiUserLine />}>ClassroomAlloc</CustomNavLink>
//           <CustomNavLink to="/GetAttendance" currentPath={location.pathname} icon={<RiBox2Line />}>GetAttendance</CustomNavLink>
//           <CustomNavLink to="/GetExamtt" currentPath={location.pathname} icon={<RiTable2 />} >GetExamtt</CustomNavLink>
//           <CustomNavLink to="/GetSupervision" currentPath={location.pathname} icon={<RiUserLine />}>GetSupervision</CustomNavLink>
//           <CustomNavLink to="/StudentAlloc" currentPath={location.pathname} icon={<RiUserSettingsLine />} >StudentAlloc</CustomNavLink>
//           <CustomNavLink to="/TeachersAlloc" currentPath={location.pathname} icon={<RiUserLine />}>TeachersAlloc</CustomNavLink>
//         </div>
//       </div>
//       <div>
//         <CustomNavLink to="/Settings" currentPath={location.pathname} icon={<RiSettings3Line />}>Settings</CustomNavLink>
//         <CustomNavLink currentPath={location.pathname} icon={<RiLoginBoxLine />}><Logout setIsLoggedIn={setIsLoggedIn} /></CustomNavLink>
//       </div>
//     </div>
//   );
// }

// function CustomNavLink({ to, currentPath, icon, children }) {
//   const isActive = to === currentPath;
//   return (
//     <NavLink to={to} className={`route flex items-center ${isActive ? "bg-red-800 text-white" : "text-gray-700 hover:bg-slate-200"} py-2 px-4`} > {icon && <span className="mr-2">{icon}</span>} {children}</NavLink>
//   );
// }

// export default App;


// printatbles
  // const printTable = () => {
  //   const style = document.createElement("style");
  //   style.type = "text/css";
  //   style.media = "print";

  //   style.appendChild(
  //     document.createTextNode(`
  //     body * {
  //       visibility: hidden;
  //     }
  //     .atnreport, .atnreport * {
  //       visibility: visible;
  //     }
  //     .transcripts{
  //       display: flex;
  //     }
  //     .pntbtn {
  //       display: none;
  //     }
  //   `)
  //   );
  //   document.head.appendChild(style);
  //   window.print();
  //   document.head.removeChild(style);
  // };

  // const printTable = () => {
  //   const style = document.createElement("style");
  //   style.type = "text/css";
  //   style.media = "print";
  //   style.appendChild(
  //     document.createTextNode(`
  //     @media print {
  //       /* Sets print view with media query */

  //         body * {
  //           display: none;
  //         }
  //         /* Sets body and elements in it to not display */

  //         .atnreport, .atnreport * {
  //           display: block;
  //         }
  //         /* Sets print area element and all its content to display */
  //       }
  //        `)
  //   );
  //   document.head.appendChild(style);
  //   window.print();
  //   document.head.removeChild(style);
  // };