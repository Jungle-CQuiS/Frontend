export interface Room {
    id: string;
    name: string;
    isLocked: boolean;
    currentUsers: number;
    maxUser: number;
}