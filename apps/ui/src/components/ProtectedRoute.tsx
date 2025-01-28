import { Routes, Navigate } from 'react-router';

import { ReactNode } from 'react';

const ProtectedRouter = ({ children }: { children: ReactNode }) => {
    console.log("running", window.location.pathname);
    const token = localStorage.getItem('taskify-auth-token');
    if (token == null && window.location.pathname != '/') {
        return <Navigate to={"/"} replace />
    }
    return (
        <Routes>
            {children}
        </Routes>
    )
}

export default ProtectedRouter;
