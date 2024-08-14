import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RiLoginBoxLine, RiSettings3Line, RiUser2Line } from "react-icons/ri";
import Logout from '../authandaccess/Logout';

/**
 * Navigation Component
 * Manages the navigation sidebar with dynamic links based on user login method.
 */
function Navigation({ setIsLoggedIn, userName, userImg, loginMethod }) {
  const location = useLocation();

  return (
    <div className="navigation-sidebar flex justify-between bg-white max-[600px]:mb-16">
      <div className="flex w-fit justify-start gap-5 max-[600px]:w-full">
        <ProfileSection userImg={userImg} userName={userName} loginMethod={loginMethod} setIsLoggedIn={setIsLoggedIn} />
        <NavigationLinks loginMethod={loginMethod} currentPath={location.pathname} />
      </div>
      <SettingsAndLogout currentPath={location.pathname} setIsLoggedIn={setIsLoggedIn} />
      <MobileNavigation currentPath={location.pathname} />
    </div>
  );
}

/**
 * ProfileSection Component
 * Displays user profile image, name, and a logout button if needed.
 */
function ProfileSection({ userImg, userName, loginMethod, setIsLoggedIn }) {
  return (
    <div className="flex justify-center gap-2 p-2 items-center max-[600px]:flex w-full max-[600px]:justify-between">
      <div className="flex gap-2 items-center">
        <img src={userImg} alt="Profile" className="w-12 h-12 rounded-full" />
        <p className="text-center flex gap-1 text-sm py-2 uppercase">
          <span className="max-[600px]:hidden">WELCOME,</span>
          <span className="font-bold">{userName || 'USER'}</span>
        </p>
      </div>
      <div className="hidden max-[600px]:block">
        <CustomNavLink to="#" currentPath={location.pathname} icon={<RiLoginBoxLine />}>
          <Logout setIsLoggedIn={setIsLoggedIn} />
        </CustomNavLink>
      </div>
    </div>
  );
}

/**
 * NavigationLinks Component
 * Displays navigation links based on the login method.
 */
function NavigationLinks({ loginMethod, currentPath }) {
  return (
    <>
      {loginMethod === 'Admin' && (
        <div className="flex p-2">
          <CustomNavLink to="/admin/teacher" currentPath={currentPath} icon={<RiUser2Line />}>Teacher</CustomNavLink>
          <CustomNavLink to="/admin/student" currentPath={currentPath} icon={<RiUser2Line />}>Student</CustomNavLink>
          <CustomNavLink to="/admin/utils" currentPath={currentPath} icon={<RiUser2Line />}>Utils</CustomNavLink>
        </div>
      )}
      {loginMethod === 'Teacher' && (
        <div className="flex p-2 max-[600px]:flex-wrap max-[600px]:hidden">
          <CustomNavLink to="/teacher" currentPath={currentPath} icon={<RiUser2Line />}>Attendance</CustomNavLink>
        </div>
      )}
      {loginMethod === 'Dqc' && (
        <div className="flex p-2 max-[600px]:flex-wrap max-[600px]:hidden">
          <CustomNavLink to="/dqc" currentPath={currentPath} icon={<RiUser2Line />}>DQC</CustomNavLink>
        </div>
      )}
    </>
  );
}

/**
 * SettingsAndLogout Component
 * Displays settings and logout links.
 */
function SettingsAndLogout({ currentPath, setIsLoggedIn }) {
  return (
    <div className="max-[600px]:hidden">
      <CustomNavLink to="/settings" currentPath={currentPath} icon={<RiSettings3Line />}>Settings</CustomNavLink>
      <CustomNavLink to="#" currentPath={currentPath} icon={<RiLoginBoxLine />}>
        <Logout setIsLoggedIn={setIsLoggedIn} />
      </CustomNavLink>
    </div>
  );
}

/**
 * MobileNavigation Component
 * Displays navigation links for mobile view.
 */
function MobileNavigation({ currentPath }) {
  return (
    <div className="absolute top-20 max-[600px]:flex gap-2 flex-wrap hidden bg-white w-full p-2">
      <CustomNavLink to="/teacher" currentPath={currentPath} icon={<RiUser2Line />}>Attendance</CustomNavLink>
    </div>
  );
}

/**
 * CustomNavLink Component
 * A custom NavLink component to handle active link styling.
 */
function CustomNavLink({ to, currentPath, icon, children }) {
  const isActive = to === currentPath;
  return (
    <NavLink
      to={to}
      className={`route flex items-center ${isActive ? "bg-red-800 text-white" : "text-gray-700 hover:bg-slate-200"} py-2 px-4`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </NavLink>
  );
}

export default Navigation;
