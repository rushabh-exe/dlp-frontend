import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RiBox2Line, RiDashboardLine, RiLoginBoxLine, RiSettings3Line, RiTable2, RiUserLine, RiUserSettingsLine } from "react-icons/ri";
import Logout from '../authandaccess/Logout';

function Navigation({ setIsLoggedIn, userName, userImg }) {
  const location = useLocation();

  return (
    <div className="navigation-sidebar flex bg-white">
      <div className="flex w-full justify-start gap-5">
        <div className="flex justify-center gap-2 p-2 items-center">
          <img src={userImg} alt="SVG" className="w-12 h-12 rounded-full" />
          <p className="text-center flex gap-1 text-sm py-2 uppercase">
            <span>WELCOME,</span>
            <span className=" font-bold">{userName ? userName : 'USER'}</span>
          </p>
        </div>
        <div className="flex p-2">
          <CustomNavLink to="/" currentPath={location.pathname} icon={<RiDashboardLine />}>Dashboard</CustomNavLink>
          <CustomNavLink to="/ClassroomAlloc" currentPath={location.pathname} icon={<RiUserLine />}>ClassroomAlloc</CustomNavLink>
          <CustomNavLink to="/GetAttendance" currentPath={location.pathname} icon={<RiBox2Line />}>GetAttendance</CustomNavLink>
          <CustomNavLink to="/GetExamtt" currentPath={location.pathname} icon={<RiTable2 />} >GetExamtt</CustomNavLink>
          <CustomNavLink to="/GetSupervision" currentPath={location.pathname} icon={<RiUserLine />}>GetSupervision</CustomNavLink>
          <CustomNavLink to="/StudentAlloc" currentPath={location.pathname} icon={<RiUserSettingsLine />} >StudentAlloc</CustomNavLink>
          <CustomNavLink to="/TeachersAlloc" currentPath={location.pathname} icon={<RiUserLine />}>TeachersAlloc</CustomNavLink>
        </div>
      </div>
      <div>
        <CustomNavLink to="/Settings" currentPath={location.pathname} icon={<RiSettings3Line />}>Settings</CustomNavLink>
        <CustomNavLink currentPath={location.pathname} icon={<RiLoginBoxLine />}><Logout setIsLoggedIn={setIsLoggedIn} /></CustomNavLink>
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
