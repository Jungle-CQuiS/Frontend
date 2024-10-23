export interface Room {
    id: string;
    name: string;
    isLocked: boolean;
    currentUsers: number;
    maxUsers: number;
}

export interface TeamHeaderProps {
    teamId: number;
    isAttackTeam: boolean;
}


export interface TeamUserTagProps {
    teamId: number;
}