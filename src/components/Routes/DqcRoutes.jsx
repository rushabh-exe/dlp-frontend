import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../../components/static/Navigation";
import { AuthContext } from '../../App';
import Dqc from "../../components/dqc/Dqc"
import GetPapers from "../dqc/GetPapers";
import PostPapers from "../dqc/PostPapers";
const DqcRoutes = () => {
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
            <div className="dashboard p-4 w-full flex-1">
                <Routes>
                    <Route path="dqc" element={<Dqc/>} />
                    <Route path="/dqc/getPapers" element={<GetPapers/>} />
                    <Route path="/dqc/postPapers" element={<PostPapers/>} />
                    <Route path="*" element={<Navigate to="dqc" />} />
                </Routes>
            </div>
        </main>
    );
};

export default DqcRoutes;
