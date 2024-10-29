// 이벤트 타입을 상수로 관리
export enum GameReadyEvents {
    ALLREADY = 'ALLREADY',
    STOPREADY = 'STOPREADY',
    GAME_START = 'GAME_START',
    GAME_END = 'GAME_END'
};

// 게임 상태도 상수로 관리
export enum GameStatus {
    WAITING = 'WAITING',
    COUNTDOWN = 'COUNTDOWN',
    PLAYING = 'PLAYING',
    ENDED = 'ENDED'
} ;