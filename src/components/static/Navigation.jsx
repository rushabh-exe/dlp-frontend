import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RiLoginBoxLine, RiSettings3Line, RiUser2Line, } from "react-icons/ri";
import Logout from '../authandaccess/Logout';

function Navigation({ setIsLoggedIn, userName, userImg, loginMethod }) {
  const location = useLocation();

  return (
    <div className="navigation-sidebar flex justify-between bg-white max-[600px]:mb-16">
      <div className="flex w-fit justify-start gap-5 max-[600px]:w-full  ">
        <div className="flex justify-center gap-2 p-2 items-center max-[600px]:flex w-full max-[600px]:justify-between">
          <div className="flex gap-2 items-center"><img src={userImg} alt="Profile" className="w-12 h-12 rounded-full" />
            <p className="text-center flex gap-1 text-sm py-2 uppercase">
              <span className="max-[600px]:hidden">WELCOME,</span>
              <span className=" font-bold">{userName ? userName : 'USER'}</span>
              {/* {loginMethod && <span className="text-xs text-gray-500">({loginMethod})</span>} */}
            </p></div>
          <div className=" hidden max-[600px]:block"><CustomNavLink currentPath={location.pathname} icon={<RiLoginBoxLine />}><Logout setIsLoggedIn={setIsLoggedIn} /></CustomNavLink></div>
        </div>
        {loginMethod === 'Admin' && (
          <div className="flex p-2">
            <CustomNavLink to="/admin/teacher" currentPath={location.pathname} icon={<RiUser2Line />}>Teacher</CustomNavLink>
            <CustomNavLink to="/admin/student" currentPath={location.pathname} icon={<RiUser2Line />}>Student</CustomNavLink>
            <CustomNavLink to="/admin/utils" currentPath={location.pathname} icon={<RiUser2Line />}>Utils</CustomNavLink>
          </div>
        )}
        {loginMethod === 'Teacher' && (
          <div className="flex p-2 max-[600px]:flex-wrap max-[600px]:hidden">
            {/* <CustomNavLink to="/teacher/getAttendance" currentPath={location.pathname} icon={<RiUser2Line />}>get Attendance</CustomNavLink>
            <CustomNavLink to="/teacher/takeAttendance" currentPath={location.pathname} icon={<RiUser2Line />}>take Attendance</CustomNavLink> */}
            <CustomNavLink to="/teacher" currentPath={location.pathname} icon={<RiUser2Line />}>Attendance</CustomNavLink>
          </div>
        )}
         {loginMethod === 'Dqc' && (
          <div className="flex p-2 max-[600px]:flex-wrap max-[600px]:hidden">
            {/* <CustomNavLink to="/teacher/getAttendance" currentPath={location.pathname} icon={<RiUser2Line />}>get Attendance</CustomNavLink>
            <CustomNavLink to="/teacher/takeAttendance" currentPath={location.pathname} icon={<RiUser2Line />}>take Attendance</CustomNavLink> */}
            <CustomNavLink to="/dqc" currentPath={location.pathname} icon={<RiUser2Line />}>dqc</CustomNavLink>
          </div>
        )}
      </div>
      <div className="max-[600px]:hidden">
        <CustomNavLink to="/Settings" currentPath={location.pathname} icon={<RiSettings3Line />}>Settings</CustomNavLink>
        <CustomNavLink currentPath={location.pathname} icon={<RiLoginBoxLine />}><Logout setIsLoggedIn={setIsLoggedIn} /></CustomNavLink>
      </div>
      <div className="absolute top-20 max-[600px]:flex gap-2 flex-wrap hidden bg-white w-full p-2 ">
        <CustomNavLink to="/teacher" currentPath={location.pathname} icon={<RiUser2Line />}>Attendance</CustomNavLink>
        <CustomNavLink to="/teacher" currentPath={location.pathname} icon={<RiUser2Line />}>Attendance</CustomNavLink>
      </div>
    </div>
  );
}
function CustomNavLink({ to, currentPath, icon, children }) {
  const isActive = to === currentPath;
  return (
    <NavLink to={to} className={`route flex items-center ${isActive ? "bg-red-800 text-white" : "text-gray-700 hover:bg-slate-200"} py-2 px-4`} > {icon && <span className="mr-2">{icon}</span>} {children}</NavLink>
  );
}

export default Navigation;
