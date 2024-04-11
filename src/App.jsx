import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";
import { gapi } from "gapi-script";
import Cookies from "js-cookie";

import Navigation from "./components/static/Navigation";

import Login from "./components/authandaccess/Login";
import Settings from "./components/authandaccess/Settings";

import Loader from "./components/utils/Loader";

import Admin from "./components/admin/Admin";

import Teacher from "./components/admin/teacher/Teacher";
import TeacherAllocation, { CreateTeacherAllocation, GetTeacherAllocation } from "./components/admin/teacher/TeacherAllocation";

import Student from "./components/admin/student/Student";
import StudentAllocation from "./components/admin/student/StudentAllocation";

import Utils from "./components/admin/utils/Utils";
import SubjectUtils from "./components/admin/utils/SubjectUtils";
import TeacherUtils from "./components/admin/utils/TeacherUtils";

import CreateSingleAllocation from "./components/admin/student/sAllocation/CreateSingleAllocation";
import CreateDualAllocation from "./components/admin/student/sAllocation/CreateDualAllocation";
import GetAllocation from "./components/admin/student/sAllocation/GetAllocation";

import GetAttendance from "./components/teacher/GetAttendance";
import TakeAttendance from "./components/teacher/TakeAttendance";
import CNavlink from "./components/utils/CNavlink";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const clientId =
    "152111620630-d01stikjdcthgcfrjhhmpuetctpnqs61.apps.googleusercontent.com";
  const scope = "profile email";
  const [isLoading, setIsLoading] = useState(true);
  const [loginMethod, setLoginMethod] = useState('');



  useEffect(() => {
    const isLoggedInCookie = Cookies.get('isLoggedIn');
    const method = Cookies.get('loginMethod');

    if (isLoggedInCookie === 'true' && method) {
      setLoginMethod(method);
    }
  }, []);


  useEffect(() => {
    const initClient = async () => {
      try {
        await gapi.client.init({ clientId, scope });
      } catch (error) {
        console.error("Error initializing Google API client:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500); //1800
      }
    };

    if (!window.gapi.client) {
      window.gapi.load("client:auth2", initClient);
    } else {
      initClient();
    }
  }, []);

  if (isLoading) {
    return (
      <div className=" flex justify-center items-center w-screen h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <Router>
      {!isLoggedIn && (
        <Login
          setUser={setUserName}
          setIsLoggedIn={setIsLoggedIn}
          setUserImg={setUserImg}
          setLoginMethod={setLoginMethod}
        />
      )}
      {isLoggedIn && loginMethod === 'Admin' && (
        <main className="bg-slate-300 min-h-screen flex flex-col gap-1 ">
          <Navigation
            userName={userName}
            userImg={userImg}
            setIsLoggedIn={setIsLoggedIn}
            loginMethod={loginMethod}
          />
          <div className="dashboard p-4 w-full mx-auto flex-1">
            <Routes>
              //utils
              <Route path="/admin/utils/Subject" element={<SubjectUtils />} />
              <Route path="/admin/utils/Teacher" element={<TeacherUtils />} />
              <Route path="/admin/utils/*" element={<Utils />}/>
              //students
              <Route path="/admin/student/Allocation" element={<StudentAllocation />}>
                <Route path="createSingle" element={<CreateSingleAllocation />} />
                <Route path="createDual" element={<CreateDualAllocation />} />
                <Route path="getAllocation" element={<GetAllocation />} />
              </Route>
              <Route path="/admin/student/*" element={<Student />} />
              //admin teacher routes
              <Route path="/admin/teacher/Allocation/createAllocation" element={<CreateTeacherAllocation />} />
              <Route path="/admin/teacher/Allocation/getAllocation" element={<GetTeacherAllocation />} />
              <Route path="/admin/teacher/Allocation" element={<TeacherAllocation />} />
              <Route path="/admin/teacher/*" element={<Teacher />} />
              //admin routes
              <Route path="admin/*" element={<NotFound />} />
              <Route path="admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="admin" />} />
            </Routes>
          </div>
        </main>
      )}
      {isLoggedIn && loginMethod === 'Teacher' && (
        <main className="bg-slate-300 min-h-screen flex flex-col gap-1 ">
          <Navigation
            userName={userName}
            userImg={userImg}
            setIsLoggedIn={setIsLoggedIn}
            loginMethod={loginMethod}
          />
          <div className="dashboard p-4 w-full flex-1">
            <Routes>
              <Route path="Settings" element={<Settings />} />
              <Route path="teacher/getAttendance" element={<GetAttendance />} />
              <Route path="teacher/takeAttendance" element={<TakeAttendance />} />
              <Route path="teacher/*" element={<NotFound />} />
              <Route path="*" element={<Navigate to="teacher" />} />
              <Route path="teacher" element={<TeacherComponent />} />
            </Routes>
          </div>
        </main>
      )}
    </Router>
  );
}

function NotFound() {
  return <div>
    Welcome Admin Route for Other Components
  </div>;
}

function TeacherComponent() {
  return (
    <div className=" flex">
      {/* <CNavlink to="getAttendance">Take Attendence</CNavlink> */}
      <NavLink className='px-4 py-2 border-2 border-gray-200 rounded-full bg-white text-xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300' to="getAttendance">Take Attendence</NavLink>
    </div>
  )
}


export default App;
