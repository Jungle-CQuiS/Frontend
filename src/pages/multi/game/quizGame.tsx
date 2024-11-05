
import { useEffect, useState } from "react";
import AttackPage from "../../../modules/room/components/attack/attack";
import { SolvingPage } from "../../../modules/room/components/solving/solving";
import { SelectAnswerPage } from "../defend/select/select";
import { Quiz, UserAnswer } from "../../../types/quiz";
import { TeamHeaderTag } from "../../../modules/quiz/components/multi/TeamHeader/styled";
import { WaitingScreen } from "../../../modules/quiz/components/multi/waiting/WaitingScreen";
import { UserTagsComponent } from "../../../modules/quiz/components/multi/UserTags/UserTags";
import { Background } from "../../../components/background/styled";
import { useGameState } from "../../../contexts/GameStateContext/useGameState";
import { GamePhase, GamePlayEvents, GameReadyEvents } from "../../../types/game";
import { useGameUser } from "../../../contexts/GameUserContext/useGameUser";
import { useTeamState } from "../../../contexts/TeamStateContext/useTeamState";
import { useStompContext } from "../../../contexts/StompContext";
import { gameRoomSocketEvents } from "../../../hook/gameRoomSocketEvents";
import { GameStatus } from "../../../types/game";
import DefendPage from "../defend/defend";


export default function QuizGamePage() {
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

    const { stompClient } = useStompContext();
    const { gameState, gamePhase, isLoading, roomUserId, _roomId,
        submitedUserAnswer, handleReadyRoomEvent,setDefenceQuizResult,
        setIsLoaded, changeGamePhase, initLeaderSelectQuizeId, getUserAnswer } = useGameState();
    const { user, fetchUserGameProfile } = useGameUser();
    const { attackTeam } = useTeamState();
    const [userLoaded, setUserLoaded] = useState(false);  // 유저 정보 로딩 상태 추가
    const [waiting, setWaiting] = useState<boolean>(true); // 모든 수비 팀원이 답을 제출할 때까지 대기
    const [teamId, setTeamID] = useState<number>(1);

    // SUBSCRIBE EVENT ----------------------------------

    // ▶️ 공격팀의 문제 선택 제출되면 호출된다.
    const handleCompleteSelection = async (quiz: Quiz) => {
        if(quiz == null)
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
            console.error('답안 조회 중 에러 발생:', error);
        }
    }

    // ▶️ 수비팀 제출 답 결과가 나오면 호출된다.
    const handleDefenseAnswerResults = async (isCorrect : boolean) => {
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

    const handleDefenseTeamHP = async (hp : number) => {
        try {
            //HP 관련 처리

        } catch (error) {
            console.error('수비팀 HP 수신 중 에러 발생:', error);
        }
    }

    useEffect(() => {
        const loadGameUserInfo = async () => {
            try {
                console.log("Loading user info...");
                const uInfo = await fetchUserGameProfile(roomUserId);

                if (uInfo) {
                    setIsLoaded();
                    setUserLoaded(true);  // 유저 정보 로딩 완료
                    setTeamID(user?.team == 'BLUE' ? 1 : 2);
                    console.log("User info loaded:", uInfo);
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
        const subscribeTeamInfo = async () => { // 수비팀 모두가 정답 제출하면 메세지를 받는다.
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
                        onDefenseTeamAllSubmitted
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
                    gameRoomSocketEvents.subscribeGradingQuizeAnswer(
                        client,  // null이 아님이 확인된 client 사용
                        _roomId,
                        handleDefenseAnswerResults,
                        handleDefenseTeamHP
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
                await subscribeTeamInfo();
                await subscribeResultOfQuiz();
                await subscribeResultOfQuiz();
            } catch (error) {
                console.log("GameRoom을 세팅하는데 실패했습니다.", error);
            }
        }

        if (isLoading) {
            setUpGameRoom();

        }
    }, []);

    // 로딩 중이거나 유저 정보가 없으면 로딩 화면 표시
    if (isLoading || !userLoaded || !user) {
        return <div>로딩 중입니다...</div>;
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
                        <Background>{/*화면 공유 페이지*/}
                            <TeamHeaderTag teamId={teamId}>{teamId}팀</TeamHeaderTag>
                            <WaitingScreen teamId={teamId} />
                            <UserTagsComponent teamId={teamId == 1 ? 2 : 1} />{/*다른 팀의 팀 뱃지*/}
                            <UserTagsComponent teamId={teamId} /> {/*본인 팀의 팀 뱃지*/}
                        </Background>
                    ) : (
                        <SelectAnswerPage selectedQuiz={selectedQuiz} userAnswers={submitedUserAnswer} />
                    )
                )
            ) : (
                gamePhase === GamePhase.ATTACK ? (
                    <DefendPage />
                ) : (
                    waiting ? (
                        <SolvingPage selectedQuiz={selectedQuiz} />
                    ) : (
                        <SelectAnswerPage selectedQuiz={selectedQuiz} userAnswers={submitedUserAnswer} />
                    )
                )
            )}
        </div>
    );
}
