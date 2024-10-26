import { useState, useCallback, useEffect } from "react";
import { TeamUser } from "../modules/room/components/TeamUser";
import { UseWebSocket } from "./useWebSocket";
import { socketEvents } from "./socketEvent";
export const useTeamState = (roomId: string) => {
    const [teamOneUsers, setTeamOneUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));
    const [teamTwoUsers, setTeamTwoUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));
    
    const updateTeams = useCallback((users: TeamUser[]) => {
        const blueTeamUsers = users.filter(user => user.team === 'blue');
        const redTeamUsers = users.filter(user => user.team === 'red');

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