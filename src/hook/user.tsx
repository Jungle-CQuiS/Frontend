import { useState, useEffect } from 'react';

export interface User {
    id: number;
    name: string;
    honor: number;
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

// 사용 예시
function Component() {
    const { user, login, logout } = useUser();

    if (!user) return <div>로그인이 필요합니다 </div>;

    return <div>안녕하세요, { user.name }님! </div>;
}