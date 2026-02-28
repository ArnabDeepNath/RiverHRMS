import { createContext, useContext, useState, useCallback } from 'react';
import { userProfiles } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [role, setRole] = useState('admin');
    const currentUser = userProfiles[role];

    const switchRole = useCallback((newRole) => {
        if (userProfiles[newRole]) setRole(newRole);
    }, []);

    const canApprove = role === 'admin' || role === 'manager';
    const canManageDirectory = role === 'admin';
    const canViewAllRequests = role === 'admin' || role === 'manager';

    return (
        <AuthContext.Provider value={{
            currentUser,
            role,
            switchRole,
            canApprove,
            canManageDirectory,
            canViewAllRequests,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
