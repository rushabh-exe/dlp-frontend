import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate } from "react-router-dom";
import { gapi } from "gapi-script";
import Cookies from "js-cookie";
import Navigation from "./components/static/Navigation";
import Login from "./components/authandaccess/Login";
import Loader from "./components/utils/Loader";
import Admin from "./components/admin/Admin";
import Teacher from "./components/admin/teacher/Teacher";
import Student from "./components/admin/student/Student";
import Utils from "./components/admin/utils/Utils";
import TeacherAllocation from "./components/admin/teacher/TeacherAllocation";
import StudentAllocation from "./components/admin/student/StudentAllocation";
import SubjectUtils from "./components/admin/utils/SubjectUtils";
import TeacherUtils from "./components/admin/utils/TeacherUtils";
import CreateSingleAllocation from "./components/admin/student/sAllocation/CreateSingleAllocation";
import CreateDualAllocation from "./components/admin/student/sAllocation/CreateDualAllocation";
import GetAllocation from "./components/admin/student/sAllocation/GetAllocation";

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
      {isLoggedIn && (
        <main className="bg-slate-300 min-h-screen flex flex-col gap-1 ">
          <Navigation
            userName={userName}
            userImg={userImg}
            setIsLoggedIn={setIsLoggedIn}
            loginMethod={loginMethod}
          />
          <div className="dashboard p-4 w-full mx-auto flex-1">
            <Routes>
              <Route path="/admin/utils/*" element={<Utils />}>
                <Route path="Subject" element={<SubjectUtils />} />
                <Route path="Teacher" element={<TeacherUtils />} />
              </Route>
              <Route
                path="/admin/student/Allocation"
                element={<StudentAllocation />}
              >
                <Route
                  path="createSingle"
                  element={<CreateSingleAllocation />}
                />
                <Route path="createDual" element={<CreateDualAllocation />} />
                <Route path="getAllocation" element={<GetAllocation />} />
              </Route>
              <Route path="/admin/student/*" element={<Student />}></Route>
              <Route path="/admin/teacher/*" element={<Teacher />}>
                <Route path="Allocation" element={<TeacherAllocation />} />
              </Route>
              <Route path="admin/*" element={<NotFound />} />
              <Route path="*" element={<Navigate to="admin" />} />
              <Route path="admin" element={<Admin />} />
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

export default App;
