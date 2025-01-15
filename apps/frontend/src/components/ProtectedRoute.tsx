import { Routes, Navigate } from 'react-router';

import { ReactNode } from 'react';

const ProtectedRouter = ({ children }: { children: ReactNode }) => {
    const token = localStorage.getItem('taskify-auth-token');
    if (token == null) {
        return <Navigate to={"/"} replace />
    }
    return (
        <Routes>
            {children}
        </Routes>
    )
}

export default ProtectedRouter;
