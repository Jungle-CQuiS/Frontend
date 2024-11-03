// 이벤트 타입을 상수로 관리
export enum GameReadyEvents {
    ENTER = 'ENTER',
    LOADING = 'LOADING',
    ALL_READY = 'ALL_READY',
    STOP_READY = 'STOP_READY',
    GAME_START = 'GAME_START',
    GAME_END = 'GAME_END'
};

export enum GamePlayEvents{
    QUIZ_SELECT = 'QUIZ_SELECT',
    FINAL_SELECT = `FINAL_SELECT`,

    SUB_SELECT_END = 'SUB_SELECT_END', // 공격팀이 주제 선택을 끝냈다.
    DEF_CHECK_ANSWER = 'DEF_CHECK_ANSWER', // 수비 정답 제출 후 모두가 정답을 확인하였다.
    ANSWER_END = 'ANSWER_END', // 수비팀이 문제를 다 제출하였다.
    ANS_SELECT_END = 'ANS_SELECT_END', // 수비팀이 정답을 고르는 것을 완료.
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

// GameStatus가 PLAYING일떄 유효
export enum GamePhase {
    ATTACK = 'SELECT',
    SOLVING = 'SOLVING'
}