import { useEffect, useState, useCallback, useRef } from "react";
import AttackPage from "../../../modules/room/components/attack/attack";
import { SolvingPage } from "../../../modules/room/components/solving/solving";
import { WaitingSolvingPage } from "../../../modules/room/components/waitSolving/waitingSolving";
import { SelectAnswerPage } from "../defend/select/select";
import { Quiz } from "../../../types/quiz";
import { useGameState } from "../../../contexts/GameStateContext/useGameState";
import { GamePhase, GamePlayEvents, GameReadyEvents } from "../../../types/game";
import { useGameUser } from "../../../contexts/GameUserContext/useGameUser";
import { useTeamState } from "../../../contexts/TeamStateContext/useTeamState";
import { TeamType } from "../../../types/teamuser";
import { useStompContext } from "../../../contexts/StompContext";
import { gameRoomSocketEvents } from "../../../hook/gameRoomSocketEvents";
import { GameStatus } from "../../../types/game";
import { LoadingScreen } from "../../../modules/LoadingScreen";
import DefendPage from "../defend/defend";
import useButtonSoundEffect from "../../../hook/useHoverSoundEffect";
import { useEmoji } from "../../../hook/useEmoji";

export default function QuizGamePage() {
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

    const { stompClient } = useStompContext();
    const { gameState, gamePhase, isLoading,
        roomUserId, _roomId,
        submitedUserAnswer,
        setIsLoaded, changeGamePhase,
        handleReadyRoomEvent, setDefenceQuizResult,
        initLeaderSelectQuizeId, getUserAnswer, resetGameRoomInfo, handleGameEndEvent,
        saveGradingResponse, resetGradingResponse
    } = useGameState();
    const { user, fetchUserGameProfile } = useGameUser();
    const { attackTeam, updateAttackTeam, changeTeamHP } = useTeamState();
    const [userLoaded, setUserLoaded] = useState(false);  // 유저 정보 로딩 상태 추가
    const [waiting, setWaiting] = useState<boolean>(true); // 모든 수비 팀원이 답을 제출할 때까지 대기

    const teamId = user?.team == 'BLUE' ? 1 : 2;
    useButtonSoundEffect()

    const {handleReceivedEmoji} = useEmoji();
    // SUBSCRIBE EVENT ----------------------------------

    // ▶️ 공격팀의 문제 선택 제출되면 호출된다.
    const handleCompleteSelection = async (quiz: Quiz) => {
        if (quiz == null)
            throw new Error("공격팀이 선택한 문제를 수신 받지 못했습니다.");

        setSelectedQuiz(quiz);
        // setState 후 상태 변화를 기다리기 위해 Promise 사용
        await new Promise(resolve => setTimeout(resolve, 0));

        if (gameState !== GameStatus.PLAYING) {
            handleReadyRoomEvent(GameReadyEvents.GAME_START);
            await new Promise(resolve => setTimeout(resolve, 0));
        }

        changeGamePhase(GamePlayEvents.SUB_SELECT_END);



        console.log("<GamePhase Changed>", gamePhase);
    };

    // ▶️ 수비팀 모두가 제출 완료 됐다는 구독 메세지를 받는다면 호출된다.
    const onDefenseTeamAllSubmitted = async () => {
        try {
            await getUserAnswer();
            // answers 데이터 처리가 필요한 경우 여기서 처리
            setWaiting(false);
        } catch (error) {
            console.error('수비팀 제출 답안 조회 중 에러 발생:', error);
        }
    }

    // ▶️ 수비팀 제출 답 결과가 나오면 호출된다.
    const handleDefenseAnswerResults = async (isCorrect: boolean) => {
        try {
            await new Promise<void>((resolve) => {
                setDefenceQuizResult(isCorrect);
                resolve();
            });

            console.log("상태 업데이트 완료");

        } catch (error) {
            console.error('정답 결과 수신 중 에러 발생:', error);
        }
    }

    // ▶️ 한 라운드가 종료되고 게임 정보가 리셋된다.
    const prepareNextRound = useCallback(async (event: GamePlayEvents, team: TeamType, health: number) => {
        if (event !== GamePlayEvents.ROUND_END) return;
        try {
            // 모든 상태 업데이트를 순차적으로 처리
            changeTeamHP(attackTeam === "BLUE" ? "RED" : "BLUE", health);

            // 약간의 딜레이를 주고 다음 상태 업데이트 진행
            await new Promise(resolve => setTimeout(resolve, 100));

            // 게임 페이즈 변경
            changeGamePhase(GamePlayEvents.ROUND_END);

            await new Promise(resolve => setTimeout(resolve, 100));

            // 공격팀 변경
            updateAttackTeam(team);

            await new Promise(resolve => setTimeout(resolve, 100));

            // 게임 상태 리셋
            resetGameRoomInfo(event);

            console.log("다음 라운드 준비 완료");

            resetGradingResponse();

        } catch (error) {
            console.error('다음 라운드 준비 중 에러 발생:', error);
        }
    }, [attackTeam, changeTeamHP, resetGameRoomInfo, updateAttackTeam, changeGamePhase]);


    useEffect(() => {
        const loadGameUserInfo = async () => {
            try {
                console.log("Loading user info...");
                if (roomUserId === null) {
                    console.error('Room fetched failed: no roomUserId');
                    return;
                }
                const uInfo = await fetchUserGameProfile(roomUserId);

                if (uInfo) {
                    setIsLoaded();
                    setUserLoaded(true);  // 유저 정보 로딩 완료
                    console.log("User info loaded:", uInfo);
                    await subscribeTeamInfo(uInfo?.team === 'BLUE' ? 1 : 2);
                } else {
                    console.error('게임 정보 로딩 실패: null');
                }
            } catch (error) {
                console.error('게임 정보 로딩 실패:', error);
            }
        };
        const subscribeLeaderSelectData = async () => {
            try {
                const client = stompClient.current;
                if (!client) {
                    throw new Error('Stomp client is not initialized');
                }

                await new Promise<void>((resolve) => {
                    gameRoomSocketEvents.subscribeLeaderSelect(
                        client,  // null이 아님이 확인된 client 사용
                        _roomId,
                        initLeaderSelectQuizeId
                    );
                    resolve();
                });
                setIsLoaded();
            } catch (error) {
                console.error('subscribe leader select failed:', error);
                throw error;
            }
        };
        const subscribeLeaderFinalSelectQuize = async () => {
            try {
                const client = stompClient.current;
                if (!client) {
                    throw new Error('Stomp client is not initialized');
                }

                await new Promise<void>((resolve) => {
                    gameRoomSocketEvents.subscribeLeaderFinalSelect(
                        client,  // null이 아님이 확인된 client 사용
                        _roomId,
                        handleCompleteSelection
                    );
                    resolve();
                });
                setIsLoaded();
            } catch (error) {
                console.error('subscribe leader select failed:', error);
                throw error;
            }
        };
        const subscribeTeamInfo = async (teamId: number) => { // 수비팀 모두가 정답 제출하면 메세지를 받는다.
            try {
                const client = stompClient.current;
                if (!client) {
                    throw new Error('Stomp client is not initialized');
                }

                const teamtypeSubscribe = teamId === 1
                    ? gameRoomSocketEvents.subscribeBlueTeamInfo : gameRoomSocketEvents.subscribeRedTeamInfo;

                await new Promise<void>((resolve) => {
                    teamtypeSubscribe(
                        client,  // null이 아님이 확인된 client 사용
                        _roomId,
                        onDefenseTeamAllSubmitted,
                        handleGameEndEvent,
                        handleReceivedEmoji
                    );
                    resolve();
                });
                setIsLoaded();
            } catch (error) {
                console.error('subscribe leader select failed:', error);
                throw error;
            }
        };
        const subscribeResultOfQuiz = async () => {
            try {
                const client = stompClient.current;
                if (!client) {
                    throw new Error('Stomp client is not initialized');
                }

                await new Promise<void>((resolve) => {
                    gameRoomSocketEvents.subscribeGradingQuizAnswer(
                        client,  // null이 아님이 확인된 client 사용
                        _roomId,
                        handleDefenseAnswerResults,
                        saveGradingResponse
                    );
                    resolve();
                });
                setIsLoaded();
            } catch (error) {
                console.error('subscribe Result Of Quiz  failed:', error);
                throw error;
            }
        };


        const setUpGameRoom = async () => {
            try {
                await loadGameUserInfo(); // 유저 정보 업로딩

                await subscribeLeaderSelectData();
                await subscribeLeaderFinalSelectQuize(); // FIXME: 구독끼리는 순서 상관없음

                await subscribeResultOfQuiz();
            } catch (error) {
                console.log("GameRoom을 세팅하는데 실패했습니다.", error);
            }
        }

        if (isLoading) {
            setUpGameRoom();

        }
    }, []);


    // 라운드 재시작 관련.
    // useEffect 부분
    useEffect(() => {
        const initializeRound = async () => {
            await new Promise(resolve => setTimeout(resolve, 0)); // 마이크로태스크 큐에 넣기
            setWaiting(true);

            console.log("waiting 상태 설정됨");

            await new Promise(resolve => setTimeout(resolve, 0));
            await handleReadyRoomEvent(GameReadyEvents.GAME_START); // FIXME: 지워도 될지도?

            console.log("게임 준비 이벤트 처리됨");

            await new Promise(resolve => setTimeout(resolve, 0));
            await changeGamePhase(GamePlayEvents.DEF_CHECK_ANSWER);

            setSelectedQuiz(null);
            console.log("게임 페이즈 변경됨");
        };

        if (gameState === GameStatus.START)
            initializeRound();

    }, [gameState]);

    // 로딩 중이거나 유저 정보가 없으면 로딩 화면 표시
    if (isLoading || !userLoaded || !user) {
        return <LoadingScreen />;
    }



    // 유저 정보가 있을 때만 렌더링
    return (
        <div>
            {/*수비가 정답을 모두 제출하면 SELECT로 이동*/}
            {user.team === attackTeam ? (
                gamePhase === GamePhase.ATTACK ? (
                    <AttackPage onSelectionComplete={handleCompleteSelection} />
                ) : (
                    waiting ? (
                        <WaitingSolvingPage selectedQuiz={selectedQuiz}></WaitingSolvingPage>
                    ) : (
                        <SelectAnswerPage
                            selectedQuiz={selectedQuiz}
                            userAnswers={submitedUserAnswer}
                            prepareNextRound={prepareNextRound}
                            roomId={_roomId}
                        />
                    )
                )
            ) : (
                gamePhase === GamePhase.ATTACK ? (
                    <DefendPage teamId={teamId} roomId= {_roomId} />
                ) : (
                    waiting ? (
                        <SolvingPage selectedQuiz={selectedQuiz} />
                    ) : (
                        <SelectAnswerPage
                            selectedQuiz={selectedQuiz} userAnswers={submitedUserAnswer}
                            prepareNextRound={prepareNextRound}
                            roomId={_roomId}
                        />
                    )
                )
            )}
        </div>
    );
}
