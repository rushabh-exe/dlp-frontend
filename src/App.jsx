import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import {
  RiBox2Line,
  RiCheckboxMultipleFill,
  RiDashboard2Line,
  RiDashboard3Line,
  RiDashboardLine,
  RiGitRepositoryLine,
  RiHome2Line,
  RiLoginBoxLine,
  RiSettings3Line,
  RiTable2,
  RiUser2Line,
  RiUserLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import Home from "./components/Home";
import TeacherAlloc from "./components/allocations/TeacherAlloc";
import userImg from './assets/user-126.png';
import ClassroomAlloc from "./components/allocations/ClassroomAlloc";
import Settings from "./components/Settings";
import Snlin from "./components/Snlin";
import TakeAttendance from "./components/dashboard/Takeattendance";
import StudentAlloc from "./components/dashboard/GenSalloc";
import Gettt from "./components/allocations/Gettt";
import Login from "./components/Login";
import { gapi } from "gapi-script";
import Logout from "./components/Logout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const clientId =
    "152111620630-d01stikjdcthgcfrjhhmpuetctpnqs61.apps.googleusercontent.com";
  const scope = "profile email";

  useEffect(() => {
    const initClient = async () => {
      try {
        await gapi.client.init({
          clientId,
          scope,
        });
      } catch (error) {
        console.error("Error initializing Google API client:", error);
      }
    };

    if (!window.gapi.client) {
      window.gapi.load("client:auth2", initClient);
    } else {
      initClient();
    }
  }, []);

  return (
    <Router>
      {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && (
        <main className="bg-slate-300 min-h-screen flex flex-col gap-1 ">
          <Navigation setIsLoggedIn={setIsLoggedIn} />
          <div className="dashboard p-4 mx-auto flex-1">
            <Routes>
              <Route path="/teacherAlloc" element={<TeacherAlloc />} />
              <Route path="/classroomAlloc" element={<ClassroomAlloc />} />
              <Route path="/takeattendance" element={<TakeAttendance />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/signup" element={<Snlin />} />
              <Route path="/studentalloc" element={<StudentAlloc />} />
              <Route path="/gettt" element={<Gettt />} />
              <Route path="*" element={<Home />} />
            </Routes>

          </div>

        </main>
      )}
    </Router>
  );
}

function Navigation({ setIsLoggedIn }) {
  const location = useLocation();

  return (
    <div className="navigation-sidebar flex bg-white">
      <div className="flex w-full justify-start gap-5">
        <div className="flex justify-center gap-2 p-2 items-center">
          <img src={userImg} alt="SVG" className=" w-8 h-8 " />
          <p className="text-center text-sm py-2">
            WELCOME USER
          </p>
        </div>
        <div className="flex p-2">
          <CustomNavLink
            to="/"
            currentPath={location.pathname}
            icon={<RiDashboardLine />}
          >
            Dashboard
          </CustomNavLink>
          <CustomNavLink
            to="/teacherAlloc"
            currentPath={location.pathname}
            icon={<RiUserLine />}
          >
            Teacher Alloc
          </CustomNavLink>
          <CustomNavLink
            to="/classroomAlloc"
            currentPath={location.pathname}
            icon={<RiBox2Line />}
          >
            Check Attendance
          </CustomNavLink>
          <CustomNavLink
            to="/takeattendance"
            currentPath={location.pathname}
            icon={<RiCheckboxMultipleFill />}
          >
            TakeAttendance
          </CustomNavLink>
          <CustomNavLink
            to="/studentalloc"
            currentPath={location.pathname}
            icon={<RiUserSettingsLine />}
          >
            Student Allocation
          </CustomNavLink>
          <CustomNavLink
            to="/gettt"
            currentPath={location.pathname}
            icon={<RiTable2 />}
          >
            Get TimeTable
          </CustomNavLink>
          
        </div>
      </div>
      <div>
        <CustomNavLink
          to="/settings"
          currentPath={location.pathname}
          icon={<RiSettings3Line />}
        >
          Settings
        </CustomNavLink>
        <CustomNavLink
          currentPath={location.pathname}
          icon={<RiLoginBoxLine />}
        >
          <Logout setIsLoggedIn={setIsLoggedIn} />
        </CustomNavLink>
      </div>
    </div>
  );
}

function CustomNavLink({ to, currentPath, icon, children }) {
  const isActive = to === currentPath;

  return (
    <NavLink
      to={to}
      className={`route flex items-center ${isActive ? "bg-red-800 text-white" : "text-gray-700 hover:bg-slate-200"
        } py-2 px-4`}
      activeClassName="bg-red-400 text-white"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </NavLink>
  );
}

export default App;
