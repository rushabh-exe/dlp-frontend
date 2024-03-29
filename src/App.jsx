import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { gapi } from "gapi-script";
import Navigation from './components/static/Navigation';

import ClassroomAlloc from './components/getallocation/ClassroomAlloc';
import GetAttendance from './components/getallocation/GetAttendance';
import GetExamtt from './components/getallocation/GetExamtt';
import GetSupervision from './components/getallocation/GetSupervision';
import StudentAlloc from './components/getallocation/StudentAlloc';
import TeachersAlloc from './components/getallocation/TeachersAlloc';
import Home from './components/dashboard/Home';
import Settings from './components/authandaccess/Settings';
import Login from './components/authandaccess/Login';
import { Footer } from "./components/static/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');
  const clientId ="152111620630-d01stikjdcthgcfrjhhmpuetctpnqs61.apps.googleusercontent.com";
  const scope = "profile email";

  useEffect(() => {
    const initClient = async () => {
      try {
        await gapi.client.init({clientId,scope,});
      } catch (error) {
        console.error("Error initializing Google API client:", error);
      }
    };

    if (!window.gapi.client) {window.gapi.load("client:auth2", initClient);} 
    else {
      initClient();
    }
  }, []);

  return (
    <Router>
      {!isLoggedIn && <Login setUser={setUserName} setIsLoggedIn={setIsLoggedIn} setUserImg={setUserImg} />}
      {isLoggedIn && (
        <main className="bg-slate-300 min-h-screen flex flex-col gap-1 ">
          <Navigation userName={userName} userImg={userImg} setIsLoggedIn={setIsLoggedIn} />
          <div className="dashboard p-4 mx-auto flex-1">
            <Routes>
              <Route path="/ClassroomAlloc" element={<ClassroomAlloc />} />
              <Route path="/GetAttendance" element={<GetAttendance />} />
              <Route path="/GetExamtt" element={<GetExamtt />} />
              <Route path="/GetSupervision" element={<GetSupervision />} />
              <Route path="/StudentAlloc" element={<StudentAlloc />} />
              <Route path="/TeachersAlloc" element={<TeachersAlloc />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          </div>
        </main>
      )}
    </Router>
  );
}

export default App;

