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