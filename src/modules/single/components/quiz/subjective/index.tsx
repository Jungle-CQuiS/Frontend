import { SingleModeQuizProps } from "../../../../../types/quiz";
import { SingleModeBottomComponent } from "../../bottom";
import { HeaderTagComponent } from "../../headerTag";
import { SingleModeQuizContainer } from "../multipleChoice/styled";
import { SingleModeQuizBox } from "../quizBox";
import { useState } from "react";

export const SingleModeQuizSubjective = ({ quizData, onSubmit }: SingleModeQuizProps) => {
    const [userAnswer, setUserAnswer] = useState("");
    const quiz = Array.isArray(quizData) ? quizData[0] : quizData;

    const handleAnswerSubmit = () => {
        if (userAnswer !== ""){
        onSubmit(userAnswer);
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
            <HeaderTagComponent type="주관식" />
            <SingleModeQuizBox
                type="주관식"
                quizData={{
                    name: quiz.name,
                    quizId: quiz.quizId,
                }}
            />
            <SingleModeBottomComponent
                onSubmit={handleAnswerSubmit}
                userAnswer={userAnswer}
                setUserAnswer={setUserAnswer}
            />
        </SingleModeQuizContainer>
    );
};
