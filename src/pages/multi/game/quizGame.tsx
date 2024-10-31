import { useState } from "react";
import AttackPage from "../../../modules/room/components/attack/attack";
import { SolvingPage } from "../../../modules/room/components/solving/solving";
import { Quiz } from "../../../types/quiz";


export default function QuizGamePage() {
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [isAttackPhase, setIsAttackPhase] = useState(true);

    const handleCompleteSelection = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setIsAttackPhase(false);
    };

    return (
        <div>
            {isAttackPhase ? (
                <AttackPage onSelectionComplete={handleCompleteSelection} />
            ) : (
                <SolvingPage selectedQuiz={selectedQuiz} />
            )}
        </div>
    );
}
