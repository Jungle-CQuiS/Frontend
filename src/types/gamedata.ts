import { TeamUser } from './teamuser';

export interface GameData{
    teamOneUsers: (TeamUser | null)[];  // 배열 타입으로 수정
    teamTwoUsers: (TeamUser | null)[]; 
    _roomId : string;
    uuserUuid : string;
}
