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
        if (subscribers.length > 0) {
            console.log("팀원음성감지 UseEffect");
            subscribers.forEach(subscriber => {
                try {
                    const rawData = subscriber.stream.connection.data;
                    // %/% 이후 부분 제거
                    const cleanData = rawData.split('%/%')[0];

                    // 이제 안전하게 파싱
                    const parsedData = JSON.parse(cleanData);
                    const clientData = JSON.parse(parsedData.clientData);


                    console.log("Parsed clientData:", clientData);

                    subscriber.on('streamPropertyChanged', (event: any) => {
                        if (event.changedProperty === 'audioActive') {
                            console.log(`${clientData.roomUserId}의 오디오 상태:`, event.newValue);
                        }
                    });

                    subscriber.on('publisherStartSpeaking', (event: any) => {
                        setTeamOneUsers(prev => prev.map(user =>
                            user && user.roomUserId === clientData.roomUserId
                                ? { ...user, isSpeaking: true }
                                : user
                        ));

                        setTeamTwoUsers(prev => prev.map(user =>
                            user && user.roomUserId === clientData.roomUserId
                                ? { ...user, isSpeaking: true }
                                : user
                        ));

                        console.log(`${clientData.roomUserId} 말하기 시작`);
                    });

                    subscriber.on('publisherStopSpeaking', (event: any) => {
                        setTeamOneUsers(prev => prev.map(user =>
                            user && user.roomUserId === clientData.roomUserId
                                ? { ...user, isSpeaking: false }
                                : user
                        ));

                        setTeamTwoUsers(prev => prev.map(user =>
                            user && user.roomUserId === clientData.roomUserId
                                ? { ...user, isSpeaking: false }
                                : user
                        ));

                        console.log(`${clientData.roomUserId} 말하기 멈춤`);
                    });
                } catch (error) {
                    console.error('데이터 파싱 에러:', error, '원본 데이터:', subscriber.stream.connection.data);
                }
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