
import { useEffect, useState } from "react";
import AttackPage from "../../../modules/room/components/attack/attack";
import { SolvingPage } from "../../../modules/room/components/solving/solving";
import { Quiz } from "../../../types/quiz";
import { GameStateContext } from "../../../contexts/GameStateContext/GameStateContext";
import { useGameState } from "../../../contexts/GameStateContext/useGameState";
import { GamePhase, GamePlayEvents } from "../../../types/game";
import { useGameUser } from "../../../contexts/GameUserContext/useGameUser";
import { useTeamState } from "../../../contexts/TeamStateContext/useTeamState";
import { useStompContext } from "../../../contexts/StompContext";
import { gameRoomSocketEvents } from "../../../hook/gameRoomSocketEvents";
import DefendPage from "../defend/defend";

export default function QuizGamePage() {
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const { stompClient } = useStompContext();
    const { gamePhase, isLoading, roomUserId, _roomId , 
        setIsLoaded, changeGamePhase , initLeaderSelectQuizeId } = useGameState();
    const { user, fetchUserGameProfile } = useGameUser();
    const { attackTeam } = useTeamState();
    const [userLoaded, setUserLoaded] = useState(false);  // 유저 정보 로딩 상태 추가
    const teamId = user?.team == 'BLUE' ? 1 : 2;

    const handleCompleteSelection = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        changeGamePhase(GamePlayEvents.SUB_SELECT_END);
    };

    useEffect(() => {
        const loadGameUserInfo = async () => {
            try {
                console.log("Loading user info...");
                const uInfo = await fetchUserGameProfile(roomUserId);

                if (uInfo) {
                    setIsLoaded();
                    setUserLoaded(true);  // 유저 정보 로딩 완료
                    console.log("User info loaded:", uInfo);
                } else {
                    console.error('게임 정보 로딩 실패: null');
                }
            } catch (error) {
                console.error('게임 정보 로딩 실패:', error);
            }
        };
        const subscribeData = async () => {
            try {
                const client = stompClient.current;
                if (!client) {
                    throw new Error('Stomp client is not initialized');
                }

                await new Promise<void>((resolve) => {
                    gameRoomSocketEvents.subscribeLeaderSelect(
                        client,  // null이 아님이 확인된 client 사용
                        _roomId,
                        teamId === 1 ? 'blue' : 'red',
                        initLeaderSelectQuizeId
                    );
                    resolve();
                });
            } catch (error) {
                console.error('subscribe leader select failed:', error);
                throw error;
            }
        };

        const setUpGameRoom = async() =>{
            try {
                await loadGameUserInfo();
                await subscribeData();
                
            } catch (error) {
                console.error("GameRoom을 세팅하는데 실패했습니다.", error);
            }
        }

        if (isLoading) {
            setUpGameRoom();
        }
    }, [isLoading, roomUserId, fetchUserGameProfile, setIsLoaded]);

    // 로딩 중이거나 유저 정보가 없으면 로딩 화면 표시
    if (isLoading || !userLoaded || !user) {
        return <div>로딩 중입니다...</div>;
    }

    // 유저 정보가 있을 때만 렌더링
    return (
        <div>
            {user.team === attackTeam ? (
                <AttackPage onSelectionComplete={handleCompleteSelection} />
            ) : (
                gamePhase === GamePhase.ATTACK? (
                    <DefendPage />
                ) : (
                    <SolvingPage selectedQuiz={selectedQuiz} />
                )
            )}
        </div>
    );
}
