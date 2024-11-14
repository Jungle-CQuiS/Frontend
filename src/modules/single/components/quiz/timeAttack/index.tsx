import { useEffect, useState } from "react";
import { SingleModeQuizProps } from "../../../../../types/quiz";
import { SingleModeBottomComponent } from "../../bottom";
import { HeaderTagComponent } from "../../headerTag";
import { SingleModeQuizContainer } from "../multipleChoice/styled";
import { SingleModeQuizBox } from "../quizBox";
import { Timer } from "../../../../../components/timer/timer";
import { SingleModeTimeAttackTimerWrap, SingleModeTimeAttackTimerTextWrap, SingleModeTimeAttackTimer, SingleModeTimeAttackTimerText } from "./styled";

export const SingleModeQuizTimeAttack = ({ quizData, onSubmit }: SingleModeQuizProps) => {
    const [userAnswer, setUserAnswer] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const quiz = Array.isArray(quizData) ? quizData[0] : quizData;

    useEffect(() => {
        if (quiz.quizType === "주관식") {
            setTimeLeft(20);
        } else {
            setTimeLeft(10);
        }
    }, [quiz]);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                if(prevTimeLeft <= 1) {
                    clearInterval(timerId);
                    handleAnswerSubmit(true);
                    return 0;
                }
                return prevTimeLeft -1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [quiz]); 

    const handleAnswerSubmit = (isTimeUp = false) => {
    
        if (quiz.quizType === "객관식") {
            if (selectedAnswer !== null || isTimeUp) {
                onSubmit(selectedAnswer !== null ? selectedAnswer : 0);
            }
        } 
        else if (quiz.quizType === "주관식") {
            if (userAnswer.trim() !== "" || isTimeUp) {
                onSubmit(userAnswer.trim() !== "" ? userAnswer : "");
            }
        }
    };

    if (!quizData || quizData.length <= 5) {
        return (
            <SingleModeQuizContainer>
                <div>해당되는 문제가 없습니다</div>
            </SingleModeQuizContainer>
        );
    }
    

    const isMultipleChoice = quiz.quizType === "객관식";

    const handleChoiceSelection = (choice: number) => {
        setSelectedAnswer(choice);
    };

    return (
        <SingleModeQuizContainer>
            <HeaderTagComponent type="타임어택" />
            <SingleModeTimeAttackTimerWrap>
                <Timer />
                <SingleModeTimeAttackTimerTextWrap>
                    <SingleModeTimeAttackTimer>{timeLeft}초</SingleModeTimeAttackTimer>
                    <SingleModeTimeAttackTimerText>남았습니다!</SingleModeTimeAttackTimerText>
                </SingleModeTimeAttackTimerTextWrap>
            </SingleModeTimeAttackTimerWrap>
            <SingleModeQuizBox
                type={isMultipleChoice ? "객관식" : "주관식"}
                quizData={{
                    username: quiz.username,
                    name: quiz.name,
                    choices: isMultipleChoice ? [
                        quiz.choice1,
                        quiz.choice2,
                        quiz.choice3,
                        quiz.choice4,
                    ] : undefined,
                    quizId: quiz.quizId,
                }}
                onChoiceSelect={handleChoiceSelection}
            />
            <SingleModeBottomComponent                 
                onSubmit={() => handleAnswerSubmit()}
                userAnswer={userAnswer}
                setUserAnswer={setUserAnswer}
                isMultipleChoice={isMultipleChoice}
            />
        </SingleModeQuizContainer>
    );
};
