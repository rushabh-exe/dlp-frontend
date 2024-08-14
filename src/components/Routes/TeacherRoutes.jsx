import React, { useContext } from "react";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import Navigation from "../static/Navigation";
import Settings from "../authandaccess/Settings";
import GetAttendance from "../teacher/GetAttendance";
import TakeAttendance from "../teacher/TakeAttendance";
import { AuthContext } from '../../App';
import PaperReq from "../teacher/PaperReq";
import DqcReq from "../teacher/DqcReq";

const TeacherRoutes = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-slate-300 min-h-screen flex flex-col gap-1">
      <Navigation
        userName={authState.userName}
        userImg={authState.userImg}
        setIsLoggedIn={(status) => setAuthState(prev => ({ ...prev, isLoggedIn: status }))}
        loginMethod={authState.loginMethod}
      />
      <div className="dashboard p-4 w-full flex-1">
        <Routes>
          <Route path="Settings" element={<Settings />} />
          <Route path="teacher/getAttendance" element={<GetAttendance />} />
          <Route path="teacher/takeAttendance" element={<TakeAttendance />} />
          <Route path="teacher/Paperreq" element={<PaperReq />} />
          <Route path="teacher/Dqcreq" element={<DqcReq />} />
          <Route path="teacher/*" element={<NotFound />} />
          <Route path="*" element={<Navigate to="teacher" />} />
          <Route path="teacher" element={<TeacherComponent />} />
        </Routes>
      </div>
    </main>
  );
};

// NotFound Component
const NotFound = () => <div>Route not found. Please check your URL.</div>;

// Teacher Component
const TeacherComponent = () => (
  <div className="flex gap-5">
    <NavLink className="px-4 py-2 border-2 border-gray-200 rounded-full bg-white text-xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300" to="getAttendance">
      Take Attendance
    </NavLink>
    <NavLink className="px-4 py-2 border-2 border-gray-200 rounded-full bg-white text-xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300" to="Paperreq">
      Papers Req
    </NavLink>
    <NavLink className="px-4 py-2 border-2 border-gray-200 rounded-full bg-white text-xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300" to="Dqcreq">
      Dqc Req
    </NavLink>
  </div>
);

export default TeacherRoutes;
