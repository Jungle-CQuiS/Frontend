import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { TeamUser, TeamRole, TeamType, UserRole } from '../../types/teamuser';

export interface GameUser {
    roomUserId: string;
    username: string;
    role: UserRole;
    team: TeamType;
    isLeader: boolean;
}

interface GameUserContextType {
    user : GameUser | null;
    fetchUserGameProfile: (roomUserId: string) => Promise<GameUser|null>;
}

const GameUserContext = createContext<GameUserContextType | null>(null);

export const GameUserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<GameUser | null>(null);

    // API GET USER INFO
    const fetchUserGameProfile = async (roomUserId: string) => {
        try {
            const userAccessToken = localStorage.getItem("AccessToken");
            const userUuid = localStorage.getItem("uuid");
            const API_URL = `/api/quiz/multi/rooms/user-info/${roomUserId}`;

            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${userAccessToken}`,
                    "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
                    "uuid": `${userUuid}`,
                    "Content-Type": "application/json;charset=UTF-8",  // charset 추가
                    "Cache-Control": "no-cache,no-store,max-age=0,must-revalidate",
                    "Pragma": "no-cache",
                    "Accept": "application/json"  // Accept 헤더 추가
                }
            });

            if (!response.ok) throw new Error('Failed to fetch game info');

            const responseData = await response.json();

            const userinfo : GameUser = {
                roomUserId: roomUserId, // string을 number로 변환
                username: responseData.data.username,
                role: responseData.data.role as UserRole,
                team: responseData.data.team as TeamType,
                isLeader: responseData.data.isLeader
            };

            console.log("<GameUserInfo>", userinfo);

            // Context의 user 상태 업데이트
            setUser(userinfo);

            return userinfo;

        } catch (error) {
            console.error('유저 정보 조회 실패:', error);

            return null;
        }
    };


    return (
        <GameUserContext.Provider value={{
            user, // 쓸 때 반드시 null 체크!
            fetchUserGameProfile
        }}>
            {children}
        </GameUserContext.Provider>

    );
};


export { GameUserContext }