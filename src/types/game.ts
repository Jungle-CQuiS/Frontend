// 이벤트 타입을 상수로 관리
export enum GameReadyEvents {
    ENTER = 'ENTER',
    LOADING = 'LOADING',
    ALL_READY = 'ALL_READY',
    STOP_READY = 'STOP_READY',
    GAME_START = 'GAME_START',
    GAME_END = 'GAME_END'
};

// 게임 상태도 상수로 관리
export enum GameStatus {
    ENTER = 'ENTER',
    LOADING = 'LOADING',
    READY = 'READY',
    START = 'START',
    WAITING = 'WAITING',
    COUNTDOWN = 'COUNTDOWN',
    PLAYING = 'PLAYING',
    ENDED = 'ENDED'
} ;