export interface Room {
    gameRoomId: string;
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
    roomId: string;
    userTagRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}