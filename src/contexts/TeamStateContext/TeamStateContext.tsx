import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { TeamType, TeamUser } from '../../types/teamuser';

interface TeamStateContextType {
    teamOneUsers: (TeamUser | null)[];
    teamTwoUsers: (TeamUser | null)[];
    updateTeams: (users: TeamUser[]) => void;
    updateAttackTeam : (attackteam : TeamType) => void;
    isTeamsLoaded: boolean;
    attackTeam: TeamType | null;
}

const TeamStateContext = createContext<TeamStateContextType | null>(null);

export const TeamStateProvider = ({ children }: { children: ReactNode }) => {
    const [teamOneUsers, setTeamOneUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));
    const [teamTwoUsers, setTeamTwoUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));
    const [isTeamsLoaded, setIsTeamsLoaded] = useState(false);
    const [attackTeam, setAttackTeam] = useState<TeamType|null>(null);

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

    const updateAttackTeam = useCallback((attackteam : TeamType ) => {
        setAttackTeam(attackteam);
    },[])

    return (
        <TeamStateContext.Provider value={{
            teamOneUsers,
            teamTwoUsers,
            updateTeams,
            isTeamsLoaded,
            attackTeam,
            updateAttackTeam
        }}>
            {children}
        </TeamStateContext.Provider>
    );
};

export { TeamStateContext };