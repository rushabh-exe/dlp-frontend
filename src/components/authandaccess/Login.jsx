import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { RiFacebookBoxFill, RiInstagramFill, RiLinkedinBoxFill, RiTwitterFill } from "react-icons/ri";
import { Footer } from "../static/Footer";
import Cookies from "js-cookie";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import About from '../static/About';
import Event from '../static/Event';
import Studentpage from '../static/Studentpage';

// Constants
const GOOGLE_CLIENT_ID = "152111620630-d01stikjdcthgcfrjhhmpuetctpnqs61.apps.googleusercontent.com";
const API_URL = import.meta.env.VITE_API_URL;
const gapiClientid = import.meta.env.GOOGLE_CLIENT_ID; 

// Component for handling login logic and rendering
const Login = ({ setIsLoggedIn, setUser, setUserImg, setLoginMethod }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isLoggedInCookie = Cookies.get("isLoggedIn");
    if (isLoggedInCookie === "true") {
      const userCookie = Cookies.get("user");
      const userImgCookie = Cookies.get("userImg");
      setIsLoggedIn(true);
      setUser(userCookie);
      setUserImg(userImgCookie);
      setLoginMethod(Cookies.get("loginMethod"));
    }
  }, [setIsLoggedIn, setUser, setUserImg, setLoginMethod]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let userType = "";
    let userImg = 'https://pic.onlinewebfonts.com/thumbnails/icons_325791.svg';

    switch (username && password) {
      case "admin":
        userType = "ADMIN";
        setLoginMethod("Admin");
        Cookies.set("loginMethod", "Admin");
        break;
      case "dqc":
        userType = "DQC";
        setLoginMethod("Dqc");
        Cookies.set("loginMethod", "Dqc");
        break;
      case "teacher":
        userType = "TEACHER";
        setLoginMethod("Teacher");
        Cookies.set("loginMethod", "Teacher");
        break;
      default:
        alert("Invalid username or password. Please try again.");
        return;
    }

    setIsLoggedIn(true);
    setUser(userType);
    setUserImg(userImg);
    Cookies.set("isLoggedIn", "true");
    Cookies.set("user", userType);
    Cookies.set("userImg", userImg);
    
  };

  const handleGoogleResponse = async (response) => {
    try {
      const userEmail = response.profileObj.email;
      const res = await fetch(`${API_URL}teacher/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsLoggedIn(true);
        setUser(response.profileObj.name);
        setUserImg(response.profileObj.imageUrl);
        Cookies.set("isLoggedIn", "true");
        Cookies.set("user", response.profileObj.name);
        Cookies.set("userImg", response.profileObj.imageUrl);
        Cookies.set("loginMethod", "Teacher");
        Cookies.set("backendToken", data.teacherData);
        setLoginMethod("Teacher");
      } else {
        console.error("Google login failed:", data.error);
        alert(data.error);
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <nav className="bg-red-700 p-4 flex top-0 items-center gap-8 max-[425px]:p-3 max-[425px]:gap-2">
        <NavLink to="/" className="text-white font-bold text-4xl tracking-widest max-[425px]:text-2xl">
          KJSIT
        </NavLink>
        <ul className="flex text-white">
          <li className="mr-4 text-nowrap max-[425px]:mr-2">
            <NavLink to="/" className="hover:text-gray-300">Login</NavLink>
          </li>
          <li className="mr-4 max-[425px]:mr-2">
            <NavLink to="/event" className="hover:text-gray-300">Event</NavLink>
          </li>
          <li>
            <NavLink to="/about" className="hover:text-gray-300 text-nowrap">About</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/event" element={<Event />} />
        <Route path="/students" element={<Studentpage />} />
        <Route path="/" element={
          <div
            className="flex-grow flex justify-around items-center gap-20 max-[1024px]:flex-col max-[1024px]:justify-start max-[1024px]:gap-7 max-[1024px]:py-7"
            style={{ background: "linear-gradient(250deg, rgba(255,255,255,1) 49%, rgba(153,27,27,1) 52%)" }}
          >
            <div className="bg-white pt-0 border-gray-200 rounded-lg border-2 max-[1024px]:min-w-72 max-[490px]:w-10/12 max-[490px]:flex max-[490px]:flex-col max-[490px]:items-center">
              <p className="bg-red-800 rounded-t-lg p-2 w-full text-white text-center">Admin Login</p>
              <form className="w-96 m-10 mb-5 max-[490px]:w-10/12 max-[490px]:m-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
                />
                <button
                  type="submit"
                  className="block w-full bg-red-800 text-white rounded-md py-2 px-4 mb-3 hover:bg-red-600"
                >
                  Login
                </button>
              </form>
              <div className="text-center">Teacher Login</div>
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={handleGoogleResponse}
                onFailure={handleGoogleFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
                className="w-96 m-10 mt-5 max-[490px]:w-10/12"
              />
            </div>
            <div className="bg-white pt-0 flex flex-col border-gray-200 w-96 p-10 rounded-lg border-2 max-[465px]:w-10/12">
              <p className="text-center text-lg font-bold mb-4">Pages For <NavLink to="/students" className="hover:text-gray-300 text-nowrap text-red-700">Students</NavLink></p>
              <p className="text-center mb-4 text-wrap">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
              <div className="flex justify-center mb-4">
                <RiInstagramFill />
                <RiTwitterFill />
                <RiFacebookBoxFill />
                <RiLinkedinBoxFill />
              </div>
              <div className="text-center">
                <p className="font-bold">Contact Us</p>
                <p>Email: info@example.com</p>
                <p>Phone: +1 123 456 7890</p>
                <p>Address: 123 Main Street, City, Country</p>
              </div>
            </div>
          </div>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Login;
