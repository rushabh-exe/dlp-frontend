import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../../components/static/Navigation";
import DquBoard from "../../components/dqc/DquBoard";
import { AuthContext } from '../../App';

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
                    <Route path="dqc" element={<DquBoard />} />
                    <Route path="*" element={<Navigate to="dqc" />} />
                </Routes>
            </div>
        </main>
    );
};

export default DqcRoutes;
