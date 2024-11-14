import { SingleModeQuizProps } from "../../../../../types/quiz";
import { SingleModeBottomComponent } from "../../bottom";
import { HeaderTagComponent } from "../../headerTag";
import { SingleModeQuizBox } from "../quizBox";
import { SingleModeQuizContainer } from "./styled";
import { useState } from "react";

export const SingleModeQuizMultiple = ({ quizData, onSubmit }: SingleModeQuizProps) => {
    const quiz = Array.isArray(quizData) ? quizData[0] : quizData;
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const handleChoiceSelection = (choice: number) => {
        setSelectedAnswer(choice);
    };

    const handleSubmit = () => {
        if (selectedAnswer !== null) {
            onSubmit?.(selectedAnswer);
        }
    };

    if (!quizData || quizData.length <= 5) {
        return (
            <SingleModeQuizContainer>
                <div>해당되는 문제가 없습니다</div>
            </SingleModeQuizContainer>
        );
    }

    return (
        <SingleModeQuizContainer>
            <HeaderTagComponent type="객관식" />
            <SingleModeQuizBox
                type="객관식"
                quizData={{
                    username: quiz.username,
                    name: quiz.name,
                    choices: [
                        quiz.choice1,
                        quiz.choice2,
                        quiz.choice3,
                        quiz.choice4,
                    ],
                    quizId: quiz.quizId,
                }}
                onChoiceSelect={handleChoiceSelection}
            />
            <SingleModeBottomComponent onSubmit={handleSubmit} isMultipleChoice={true} />
        </SingleModeQuizContainer>
    );
};
