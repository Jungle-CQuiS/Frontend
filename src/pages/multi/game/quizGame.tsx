
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import AttackPage from "../../../modules/room/components/attack/attack";
import { SolvingPage } from "../../../modules/room/components/solving/solving";
import { Quiz } from "../../../types/quiz";
import { GameData } from "../../../types/gamedata";

export default function QuizGamePage() {
    const { state } = useLocation() as { state: GameData };
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [isAttackPhase, setIsAttackPhase] = useState(true);

    const handleCompleteSelection = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setIsAttackPhase(false);
    };

    return (
        <div>
            {isAttackPhase ? (
                <AttackPage onSelectionComplete={handleCompleteSelection} gamedata = {state}/>
            ) : (
                <SolvingPage selectedQuiz={selectedQuiz} gamedata = {state}/>
            )}
        </div>
    );
}
