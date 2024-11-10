import { createContext, useEffect, ReactNode, useState, useCallback } from 'react';
import { TeamType, TeamUser } from '../../types/teamuser';
import { useOpenViduContext } from '../OpenViduContext/useOpenViduContext';
interface TeamStateContextType {
    teamOneUsers: (TeamUser | null)[];
    teamTwoUsers: (TeamUser | null)[];
    updateTeams: (users: TeamUser[]) => void;
    updateAttackTeam: (attackteam: TeamType) => void;
    isTeamsLoaded: boolean;
    attackTeam: TeamType | null;
    // HP
    teamOneHealth: number;
    teamTwoHealth: number;
    changeTeamHP: (team: TeamType, health: number) => void;
}

const TeamStateContext = createContext<TeamStateContextType | null>(null);

export const TeamStateProvider = ({ children }: { children: ReactNode }) => {
    const [teamOneUsers, setTeamOneUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));
    const [teamTwoUsers, setTeamTwoUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));
    const [isTeamsLoaded, setIsTeamsLoaded] = useState(false);
    const [attackTeam, setAttackTeam] = useState<TeamType | null>(null);

    // Team Voice
    const { subscribers } = useOpenViduContext();

    // Team HP
    const [teamOneHealth, setTeamOneHealth] = useState(3);
    const [teamTwoHealth, setTeamTwoHealth] = useState(3);

    // Team State
    const updateTeams = useCallback((users: TeamUser[]) => {
        const blueTeamUsers = users.filter(user => user.team === 'BLUE');
        const redTeamUsers = users.filter(user => user.team === 'RED');

        setTeamOneUsers([
            ...blueTeamUsers,
            ...Array(5 - blueTeamUsers.length).fill(null)
        ].slice(0, 5));

        setTeamTwoUsers([
            ...redTeamUsers,
            ...Array(5 - redTeamUsers.length).fill(null)
        ].slice(0, 5));

        setIsTeamsLoaded(true);
    }, []);

   
    useEffect(() => {
        // 다른 참가자들의 음성 감지
        
        if (subscribers.length > 0) {
            subscribers.forEach(subscriber => {
                const userData = JSON.parse(subscriber.stream.connection.data);
                console.log("clientDATA :", userData);

                /*subscriber.on('streamPropertyChanged', (event: any) => {
                    if (event.changedProperty === 'audioActive') {
                        console.log(`${userData.roomUserId}의 오디오 상태:`, event.newValue);
                    }
                });

                subscriber.on('publisherStartSpeaking', (event: any) => {
                    // 팀 1과 팀 2의 유저 리스트를 모두 확인하여 해당 유저 업데이트
                    setTeamOneUsers(prev => prev.map(user =>
                        user && user.roomUserId === userData.roomUserId
                            ? { ...user, isSpeaking: true }
                            : user
                    ));

                    setTeamTwoUsers(prev => prev.map(user =>
                        user && user.roomUserId === userData.roomUserId
                            ? { ...user, isSpeaking: true }
                            : user
                    ));

                    console.log(`${userData.roomUserId} 말하기 시작`);
                });

                subscriber.on('publisherStopSpeaking', (event: any) => {
                    setTeamOneUsers(prev => prev.map(user =>
                        user && user.roomUserId === userData.roomUserId
                            ? { ...user, isSpeaking: false }
                            : user
                    ));

                    setTeamTwoUsers(prev => prev.map(user =>
                        user && user.roomUserId === userData.roomUserId
                            ? { ...user, isSpeaking: false }
                            : user
                    ));

                    console.log(`${userData.roomUserId} 말하기 멈춤`);
                });*/
            });
        }
    }, [subscribers]);

    // Team Game
    const updateAttackTeam = useCallback((attackteam: TeamType) => {
        setAttackTeam(attackteam);
    }, [])

    const changeTeamHP = (team: TeamType, health: number) => {
        switch (team) {
            case "BLUE":
                setTeamOneHealth(health);
                break;
            case "RED":
                setTeamTwoHealth(health);
                break;
            default:
                break;
        }
    }

    return (
        <TeamStateContext.Provider value={{
            teamOneUsers,
            teamTwoUsers,
            updateTeams,
            isTeamsLoaded,
            attackTeam,
            updateAttackTeam,
            teamOneHealth,
            teamTwoHealth,
            changeTeamHP,
        }}>
            {children}
        </TeamStateContext.Provider>
    );
};

export { TeamStateContext };