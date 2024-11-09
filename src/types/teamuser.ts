import { User } from "./user";
// 공통으로 사용할 타입들을 먼저 정의
export type UserRole = 'HOST' | 'GUEST';
export type TeamRole = 'leader' | 'member';
export type TeamType = 'RED' | 'BLUE';
export type UserState = 'ready' | 'notready';

// Member 인터페이스 정의
export interface TeamUser extends User {
    roomUserId: number;
    username: string;
    role: UserRole;
    team: TeamType;
    isLeader: TeamRole;
    isReady: UserState;
    isSpeaking : boolean;
  }
  