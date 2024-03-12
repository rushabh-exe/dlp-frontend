import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import {
  RiAdminLine,
  RiBox2Line,
  RiCheckLine,
  RiCheckboxBlankLine,
  RiCheckboxMultipleFill,
  RiHome2Line,
  RiLoginBoxLine,
  RiLogoutBoxFill,
  RiSettings3Line,
  RiTable2,
  RiTableAltLine,
  RiTableLine,
  RiTabletLine,
  RiUser6Line,
  RiUserLine,
  RiUserSettingsFill,
  RiUserSettingsLine,
} from "react-icons/ri"; // Import icons
import Home from "./components/Home";
import TeacherAlloc from "./components/allocations/TeacherAlloc";
import imageSrc from "./assets/svg.jpg";
import ClassroomAlloc from "./components/allocations/ClassroomAlloc";
import Settings from "./components/Settings";
import Snlin from "./components/Snlin";
import TakeAttendance from "./components/dashboard/Takeattendance";
import StudentAlloc from "./components/dashboard/GenSalloc";
import Gettt from "./components/allocations/Gettt";

function App() {
  return (
    <Router>
      <main className="bg-slate-300 h-screen flex gap-1 ">
        <Navigation />
        <div className="dashboard p-4 mx-auto flex-1">
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/teacherAlloc" element={<TeacherAlloc />} />
            <Route path="/classroomAlloc" element={<ClassroomAlloc />} />
            <Route path="/takeattendance" element={<TakeAttendance />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signup" element={<Snlin />} />
            <Route path="/studentalloc" element={<StudentAlloc />} />
            <Route path="/gettt" element={<Gettt />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

function Navigation() {
  const location = useLocation();

  return (
    <div className="navigation-sidebar flex flex-col justify-between bg-white">
      <div>
        <img src={imageSrc} alt="SVG" className=" mb-4" />
        <p className="text-center text-sm border-t-2 border-b-2 py-2">
          Welcome User
        </p>
        <CustomNavLink
          to="/"
          currentPath={location.pathname}
          icon={<RiHome2Line />}
        >
          Home
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
      <div>
        <CustomNavLink
          to="/settings"
          currentPath={location.pathname}
          icon={<RiSettings3Line />}
        >
          Settings
        </CustomNavLink>
        <CustomNavLink
          to="/signup"
          currentPath={location.pathname}
          icon={<RiLoginBoxLine />}
        >
          LogOut
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
      className={`route flex items-center ${
        isActive ? "bg-red-800 text-white" : "text-gray-700 hover:bg-slate-200"
      } py-2 px-4`}
      activeClassName="bg-red-400 text-white"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </NavLink>
  );
}

export default App;
