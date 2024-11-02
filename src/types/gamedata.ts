import { Client } from '@stomp/stompjs';
import { MutableRefObject } from 'react';
import { TeamUser } from './teamuser';
import { GameStatus } from './game';

export interface GameData{
    stompclient : MutableRefObject<Client | null>;
    teamOneUsers: (TeamUser | null)[];  // 배열 타입으로 수정
    teamTwoUsers: (TeamUser | null)[]; 
    gameState : GameStatus;
    _roomId : string;
    uuserUuid : string;
}
