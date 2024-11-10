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
    //const { subscribers } = useOpenViduContext();

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


   /* useEffect(() => {
        if (subscribers.length > 0) {
            console.log("팀원음성감지 UseEffect");
            subscribers.forEach(subscriber => {
                try {
                    const rawData = subscriber.stream.connection.data;
                    const cleanData = rawData.split('%/%')[0];
                    const parsedData = JSON.parse(cleanData);
                    const clientData = JSON.parse(parsedData.clientData);

                    // 구독자의 스트림 상태 상세 로깅
                    console.log('Subscriber details:', {
                        id: subscriber.stream.streamId,
                        audioActive: subscriber.stream.audioActive,
                        hasAudio: subscriber.stream.hasAudio,
                        connection: subscriber.stream.connection,
                        roomUserId: clientData.roomUserId,
                        audioTracks: subscriber.stream.getMediaStream()?.getAudioTracks()
                    });

                    // 실제 재생 시작 확인
                    subscriber.on('streamPlaying', (event) => {
                        console.log('Subscriber stream playing:', {
                            roomUserId: clientData.roomUserId,
                            audioActive: subscriber.stream.audioActive,
                            audioTracks: subscriber.stream.getMediaStream()?.getAudioTracks()
                        });
                    });
                    // 이벤트 리스너 등록 전에 기존 리스너 제거
                    subscriber.off('streamPropertyChanged');
                    subscriber.off('publisherStartSpeaking');
                    subscriber.off('publisherStopSpeaking');

                    subscriber.on('streamPropertyChanged', (event: any) => {
                        console.log('Stream property changed:', event);
                        if (event.changedProperty === 'audioActive') {
                            console.log(`${clientData.roomUserId}의 오디오 상태:`, event.newValue);
                        }
                    });

                    subscriber.on('publisherStartSpeaking', (event: any) => {
                        console.log(`${clientData.roomUserId} speaking start event received`);
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
                    });

                    subscriber.on('publisherStopSpeaking', (event: any) => {
                        console.log(`${clientData.roomUserId} speaking stop event received`);
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
                    });

                } catch (error) {
                    console.error('데이터 파싱 에러:', error, '원본 데이터:', subscriber.stream.connection.data);
                }
            });

            // cleanup 함수
            return () => {
                subscribers.forEach(subscriber => {
                    subscriber.off('streamPropertyChanged');
                    subscriber.off('publisherStartSpeaking');
                    subscriber.off('publisherStopSpeaking');
                });
            };
        }
    }, [subscribers]);*/
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