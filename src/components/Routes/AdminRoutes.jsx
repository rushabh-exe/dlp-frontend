import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../../components/static/Navigation";
import Admin from "../../components/admin/Admin";
import Teacher from "../../components/admin/teacher/Teacher";
import TeacherAllocation, { CreateTeacherAllocation, GetTeacherAllocation } from "../../components/admin/teacher/TeacherAllocation";
import Student from "../../components/admin/student/Student";
import StudentAllocation from "../../components/admin/student/StudentAllocation";
import Utils from "../../components/admin/utils/Utils";
import SubjectUtils from "../../components/admin//utils/SubjectUtils/SubjectUtils";
import TeacherUtils from "../../components/admin/utils/TeacherUtils/TeacherUtils";
import CreateSingleAllocation from "../../components/admin/student/sAllocation/CreateSingleAllocation";
import CreateDualAllocation from "../../components/admin/student/sAllocation/CreateDualAllocation";
import GetAllocation from "../../components/admin/student/sAllocation/GetAllocation";
import { AuthContext } from "../../App";
import GetteacherPaper from "../admin/teacher/GetteacherPaper";
import PostPaper from "../admin/teacher/PostPaper";
import UpdateDuties from "../admin/utils/Duties-def/UpdateDuties";

const AdminRoutes = () => {
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
            <div className="dashboard p-4 w-full mx-auto flex-1">
                <Routes>
                    <Route path="/admin/utils/Subject" element={<SubjectUtils />} />
                    <Route path="/admin/utils/Teacher" element={<TeacherUtils />} />
                    <Route path="/admin/utils/Duties-def" element={<UpdateDuties />} />
                    <Route path="/admin/utils/*" element={<Utils />} />
                    <Route path="/admin/student/Allocation" element={<StudentAllocation />}>
                        <Route path="createSingle" element={<CreateSingleAllocation />} />
                        <Route path="createDual" element={<CreateDualAllocation />} />
                        <Route path="getAllocation" element={<GetAllocation />} />
                    </Route>
                    <Route path="/admin/student" element={<Student />} />
                    <Route path="/admin/teacher" element={<Teacher />} />
                    <Route path="/admin/teacher/Allocation" element={<TeacherAllocation />} />
                    <Route path="/admin/teacher/Papers" element={<GetteacherPaper />} />
                    <Route path="/admin/teacher/PostPaper" element={<PostPaper />} />
                    <Route path="/admin/teacher/Allocation/createAllocation" element={<CreateTeacherAllocation />} />
                    <Route path="/admin/teacher/Allocation/getAllocation" element={<GetTeacherAllocation />} />
                    <Route path="*" element={<Navigate to="/admin" />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </main>
    );
};

export default AdminRoutes;
