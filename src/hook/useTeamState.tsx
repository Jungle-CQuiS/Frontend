import { useState, useCallback } from "react";
import { TeamUser } from "../modules/room/components/TeamUser";

export const useTeamState = (roomId: string) => {
    const [teamOneUsers, setTeamOneUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));
    const [teamTwoUsers, setTeamTwoUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));
    
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
    }, []);

    return {
        teamOneUsers,
        teamTwoUsers,
        updateTeams
    };
};