import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RiLoginBoxLine, RiSettings3Line, RiUser2Line,} from "react-icons/ri";
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
          <CustomNavLink to="/admin/teacher" currentPath={location.pathname} icon={<RiUser2Line />}>Teacher</CustomNavLink>
          <CustomNavLink to="/admin/student" currentPath={location.pathname} icon={<RiUser2Line />}>Student</CustomNavLink>
          <CustomNavLink to="/admin/student/Allocation" currentPath={location.pathname} icon={<RiUser2Line />}>Student Allocation</CustomNavLink>
          <CustomNavLink to="/admin/utils" currentPath={location.pathname} icon={<RiUser2Line />}>Utils</CustomNavLink>
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
