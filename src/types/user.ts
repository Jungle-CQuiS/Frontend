export interface LoginPageProps {
    setNickname: (nickname: string) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export interface NavBarProps {
    nickname: string | null;
    setNickname: (nickname: string | null) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export interface User {
    id: number;
    name: string;
    honorCount: number;
    profileImage: string;
}