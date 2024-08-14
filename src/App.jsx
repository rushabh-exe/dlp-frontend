import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { gapi } from "gapi-script";
import Cookies from "js-cookie";
import Login from "./components/authandaccess/Login";
import Loader from "./components/utils/Loader";
import AdminRoutes from "./components/Routes/AdminRoutes";
import TeacherRoutes from "./components/Routes/TeacherRoutes";
import DqcRoutes from "./components/Routes/DqcRoutes";

// Context for managing global state
export const AuthContext = createContext();

const App = () => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userName: "",
    userImg: "",
    loginMethod: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Google API client
  useEffect(() => {
    const initClient = async () => {
      try {
        await gapi.client.init({ clientId: "152111620630-d01stikjdcthgcfrjhhmpuetctpnqs61.apps.googleusercontent.com", scope: "profile email" });
      } catch (error) {
        console.error("Error initializing Google API client:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!window.gapi.client) {
      window.gapi.load("client:auth2", initClient);
    } else {
      initClient();
    }
  }, []);

  // Check for login status from cookies
  useEffect(() => {
    const isLoggedInCookie = Cookies.get('isLoggedIn');
    const method = Cookies.get('loginMethod');

    if (isLoggedInCookie === 'true' && method) {
      setAuthState(prevState => ({ ...prevState, loginMethod: method, isLoggedIn: true }));
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        {!authState.isLoggedIn ? (
          <Login
            setIsLoggedIn={(status) => setAuthState(prevState => ({ ...prevState, isLoggedIn: status }))}
            setUser={(user) => setAuthState(prevState => ({ ...prevState, userName: user }))}
            setUserImg={(img) => setAuthState(prevState => ({ ...prevState, userImg: img }))}
            setLoginMethod={(method) => setAuthState(prevState => ({ ...prevState, loginMethod: method }))}
          />
        ) : authState.loginMethod === 'Admin' ? (
          <AdminRoutes />
        ) : authState.loginMethod === 'Teacher' ? (
          <TeacherRoutes />
        ) : authState.loginMethod === 'Dqc' ? (
          <DqcRoutes />
        ) : null}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
