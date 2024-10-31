import { useState } from 'react';

export interface User {
    id: number;
    name: string;
    honorCount: number;
    profileImage: string;
}

export const useUser = () => {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    //!!!!!!!!!예외 및 보안 처리 필요!!!!!!!!!!!!!!!
    const login  = (newUser: User) => {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return { user, login , logout };
};
