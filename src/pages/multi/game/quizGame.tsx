
import { useEffect, useState } from "react";
import AttackPage from "../../../modules/room/components/attack/attack";
import { SolvingPage } from "../../../modules/room/components/solving/solving";
import { Quiz } from "../../../types/quiz";
import { GameStateContext } from "../../../contexts/GameStateContext/GameStateContext";
import { useGameState } from "../../../contexts/GameStateContext/useGameState";
import { GamePhase, GamePlayEvents } from "../../../types/game";
import { useGameUser } from "../../../contexts/GameUserContext/useGameUser";
import { useTeamState } from "../../../contexts/TeamStateContext/useTeamState";

export default function QuizGamePage() {
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const { gamePhase, isLoading, roomUserId,setIsLoaded, changeGamePhase } = useGameState();
    const { user, fetchUserGameProfile } = useGameUser();
    const { attackTeam } = useTeamState();

    const handleCompleteSelection = (quiz: Quiz) => {
        setSelectedQuiz(quiz); // ATTACK PAGE에서 주제 선택 후 넘겨 줌..
        changeGamePhase(GamePlayEvents.SUB_SELECT_END); // 주제 선택 완료 이벤트
    };

    useEffect(() => {
        // 게임 유저 정보를 받아온다.
        const loadGameUserInfo = async () => {
            try {
                const uInfo = await fetchUserGameProfile(roomUserId);

                if (uInfo)
                    setIsLoaded(); // 함수 내부에서 true로 만들어줌.
                else
                    console.error('게임 정보 로딩 실패: null');

            } catch (error) {
                console.error('게임 정보 로딩 실패:', error);
            }
        };
        // FIXME: 중간에 유저 정보가 소실될 가능성도 있는가? 예외 처리 해야될지도..?
        if (isLoading) // 아직 로딩되지 않았다면! 전역으로 관리됨.
            loadGameUserInfo();

    }, []);


    return (
        <div>
            { user?.team === attackTeam ? (
                <AttackPage onSelectionComplete={handleCompleteSelection} />
            ) : (
                <SolvingPage selectedQuiz={selectedQuiz} />

            )}
        </div>
    );
}
