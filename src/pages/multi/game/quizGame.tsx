
import { useState } from "react";
import AttackPage from "../../../modules/room/components/attack/attack";
import { SolvingPage } from "../../../modules/room/components/solving/solving";
import { Quiz } from "../../../types/quiz";
import { GameStateContext } from "../../../contexts/GameStateContext/GameStateContext";
import { useGameState } from "../../../contexts/GameStateContext/useGameState";
import { GamePhase, GamePlayinEvents } from "../../../types/game";

export default function QuizGamePage() {
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const { gamePhase , changeGamePhase} = useGameState();

    const handleCompleteSelection = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        changeGamePhase(GamePlayinEvents.SUB_SELECT_END); // 주제 선택 완료 이벤트
    };

    return (
        <div>
            {gamePhase === GamePhase.ATTACK ? (
                <AttackPage onSelectionComplete={handleCompleteSelection}/>
            ) : (
                <SolvingPage selectedQuiz={selectedQuiz}/>
            )}
        </div>
    );
}
