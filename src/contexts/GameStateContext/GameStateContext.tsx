import { createContext, ReactNode, useState, useCallback } from 'react';
import { GameStatus, GameReadyEvents, GamePlayEvents, GamePhase } from '../../types/game';
import { UserAnswer } from '../../types/quiz';
import { TeamType } from '../../types/teamuser';

interface GameStateContextType {
    // 게임방 정보
    gameState: GameStatus;
    isAllReady: boolean;
    isLoading: boolean; // 게임방데이터가 로드가 되어있는지.

    //GAMEPLAYING
    gamePhase: GamePhase | null;
    selectedQuizId: number | null;
    // 유저 정보
    _roomId: string;
    roomUserId: string;
    roomUserIdError: string | null;

    // 수비팀 유저들이 제출한 답 리스트.
    submitedUserAnswer: UserAnswer[] | null;
    defenceFinalAnswer: number | null;
    quizResult: boolean | null;

    // 이긴 팀
    winnerTeam: TeamType | null;

    // 전역 메소드
    handleReadyRoomEvent: (event: GameReadyEvents) => void;
    setRoomUserIdWithState: (id: string) => void;
    setRoomId: (roomId: string) => void;
    setIsLoaded: () => void;
    changeGamePhase: (event: GamePlayEvents) => void;
    initLeaderSelectQuizeId: (leaderselect: number) => void;
    getUserAnswer: () => void;
    getDefenceFinalAnswer: (answer: number) => void;
    setDefenceQuizResult: (isCorrect: boolean) => void;
    resetGameRoomInfo: (event: GamePlayEvents) => void;
    handleGameEndEvent : (winner :TeamType) => void;
}

const GameStateContext = createContext<GameStateContextType | null>(null);

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
    const [isAllReady, setIsAllReady] = useState(false);
    const [gameState, setGameState] = useState<GameStatus>(GameStatus.ENTER);
    const [roomUserId, setRoomUserID] = useState<string>("none");
    const [roomUserIdError, setroomUserIdError] = useState<string | null>(null);
    const [_roomId, set_RoomId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    // 공수 변경 시 초기화 되어야 함!!
    // 게임 상태 관리
    const [gamePhase, setgamePhase] = useState<GamePhase>(GamePhase.ATTACK);
    // Select 관련
    const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

    // 수비팀 유저의 제출한 답들 불러오기.
    const [submitedUserAnswer, setSubmitedUserAnswer] = useState<UserAnswer[] | null>(null);
    const [defenceFinalAnswer, setDefenceFinalAnswer] = useState<number | null>(null);

    // 수비팀 최종 답 채점 결과.
    const [quizResult, setquizResult] = useState<boolean | null>(null);

    // 이긴 팀
    const [winnerTeam , setWinnerTeam ] = useState<TeamType | null >(null);

    const resetGameRoomInfo = async (event: GamePlayEvents) => {

        switch (event) {
            case GamePlayEvents.ROUND_END:
                // init game info
                setSelectedQuizId(null);
                setSubmitedUserAnswer(null);
                setDefenceFinalAnswer(null);
                setquizResult(null);
                break;
            case GamePlayEvents.GAME_END:
                // GAME 종료 준비하기.
                break;
            default:
                break;
        }



    }

    const getUserAnswer = async () => {
        try {
            const userAccessToken = localStorage.getItem("AccessToken");
            const userUuid = localStorage.getItem("uuid");
            const API_URL = `/api/quiz/multi/game/${_roomId}/timeout`;

            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${userAccessToken}`,
                    "RefreshToken": `${localStorage.getItem("RefreshToken")}`,
                    "uuid": `${userUuid}`,
                    "Content-Type": "application/json;charset=UTF-8",  // charset 추가
                    "Cache-Control": "no-cache,no-store,max-age=0,must-revalidate",
                    "Pragma": "no-cache",
                    "Accept": "application/json"  // Accept 헤더 추가
                }
            });

            if (!response.ok) throw new Error('Failed to fetch game info');

            const responseData = await response.json();

            const quizAnswers: UserAnswer[] = responseData.data.answerList.map((item: any) => ({
                roomUserId: item.roomUserId,
                answer: item.answer
            }));

            console.log("<QuizAnswers>", quizAnswers);
            setSubmitedUserAnswer(quizAnswers);

        } catch (error) {
            console.error('정답 정보 조회 실패:', error);
        }
    }

    const getDefenceFinalAnswer = (answer: number) => {
        setDefenceFinalAnswer(answer);
        console.log("final select 완료", defenceFinalAnswer, answer);
    }

    const setRoomUserIdWithState = useCallback((id: string) => {
        setroomUserIdError(null);
        setRoomUserID(id);
    }, []);

    const setRoomId = useCallback((roomid: string) => {
        set_RoomId(roomid);
    }, []);

    const setIsLoaded = useCallback(() => {
        setIsLoading(false);
    }, [])

    const handleReadyRoomEvent = useCallback((event: GameReadyEvents) => {
        switch (event) {
            case GameReadyEvents.ENTER:
                setGameState(GameStatus.LOADING);
                break;
            case GameReadyEvents.LOADING:
                setGameState(GameStatus.WAITING);
                break;
            case GameReadyEvents.ALL_READY:
                setIsAllReady(true);
                setGameState(GameStatus.READY);
                break;
            case GameReadyEvents.STOP_READY:
                setIsAllReady(false);
                setGameState(GameStatus.WAITING);
                break;
            case GameReadyEvents.GAME_START:
                setGameState(GameStatus.PLAYING);
                break;
        }
    }, []);

    const changeGamePhase = useCallback((event: GamePlayEvents) => {
        switch (event) {
            case GamePlayEvents.SUB_SELECT_END: // 공격이 주제선택을 다하면 SOLVING으로 넘어감.
                setgamePhase(GamePhase.SOLVING);
                break;
            case GamePlayEvents.DEF_CHECK_ANSWER: // 수비가 최종 답 선택을 다하면 정답 결과가 나옴.
                setgamePhase(GamePhase.ATTACK); // 주제 선택 페이즈로 전환.
                break;
            case GamePlayEvents.ROUND_END:
                setGameState(GameStatus.START);
                break;
            default:
                break;
        }
    }, [gameState])

    const initLeaderSelectQuizeId = (leaderSelect: number) => {
        setSelectedQuizId(leaderSelect);
    }

    const setDefenceQuizResult = (isCorrect: boolean) => {
        setquizResult(isCorrect);
    }

    const handleGameEndEvent = async (winner: TeamType) => {
        // 1. GameStatus 변경
        setGameState(GameStatus.ENDED);

        // 2. winner Team 설정
        setWinnerTeam(winner);
    }




    return (
        <GameStateContext.Provider value={{
            gameState,
            isAllReady,
            isLoading,
            gamePhase,
            roomUserId,
            _roomId,
            selectedQuizId,
            submitedUserAnswer,
            defenceFinalAnswer,
            quizResult,

            winnerTeam,

            handleReadyRoomEvent,
            setRoomUserIdWithState,
            setRoomId,
            setIsLoaded,
            changeGamePhase,
            initLeaderSelectQuizeId,
            getUserAnswer,
            getDefenceFinalAnswer,
            setDefenceQuizResult,
            resetGameRoomInfo,
            handleGameEndEvent,
            roomUserIdError
        }}>
            {children}
        </GameStateContext.Provider>
    );
};

export { GameStateContext }