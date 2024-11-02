import { useContext } from "react";
import { TeamStateContext } from "./TeamStateContext";

export const useTeamState = () => {
    const context = useContext(TeamStateContext);
    if (!context) {
        throw new Error('useTeamState must be used within a TeamStateProvider');
    }
    return context;
};