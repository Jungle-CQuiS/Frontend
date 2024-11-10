import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Background } from "../../../components/background/styled";
import { SingleModeQuizSubjective } from "../../../modules/single/components/quiz/subjective";
import { SingleModeQuizTimeAttack } from "../../../modules/single/components/quiz/timeAttack";
import { SingleGradingPage } from "../result/grading/singleGrading";
import useSingleModeExit from "../../../hook/useSingleModeExit";
import { SingleModeQuizMultiple } from "../../../modules/single/components/quiz/multipleChoice";
import useButtonSoundEffect from "../../../hook/useHoverSoundEffect";

export default function SingleModeQuiz() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedMode, quizData } = location.state || { selectedMode: "객관식", quizData: [] };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isGrading, setIsGrading] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
    const [results, setResults] = useState<{ [key: string]: { correct: number; total: number } }>({});
    const [incorrectQuestionIds, setIncorrectQuestionIds] = useState<number[]>([]);
    useButtonSoundEffect()
    useSingleModeExit();
    const currentQuiz = quizData[currentQuestionIndex];

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAnswerSubmit = async (userInput: string | number) => {
        if (isSubmitting) return;
    
        setIsSubmitting(true);
    
        try {
            const response = await fetch("/api/quiz/grade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
                    "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
                },
                body: JSON.stringify({
                    quizId: currentQuiz.quizId,
                    userInput: userInput
                }),
            });
            const result = await response.json();
    
            setIsCorrect(result.data.isCorrect);
    
            if (!result.data.isCorrect) {
                setIncorrectQuestionIds(prevIds => [...prevIds, currentQuiz.quizId]);
            }
    
            const answerContent = currentQuiz[`choice${result.data.answer}`];
            setCorrectAnswer(`${result.data.answer} - ${answerContent}`);
            
            const category = currentQuiz.categoryId;
            setResults(prevResults => {
                const newCorrectCount = result.data.isCorrect ? 1 : 0;
                const currentTotal = (prevResults[category]?.total || 0) + 1;
                const currentCorrect = (prevResults[category]?.correct || 0) + newCorrectCount;
    
                return {
                    ...prevResults,
                    [category]: { correct: currentCorrect, total: currentTotal },
                };
            });
    
            setIsGrading(true);
        } catch (error) {
            console.error("Error during submission:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    
    

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsGrading(false);
        } else {
            navigate("/single/result", { state: { results, incorrectQuestionIds } });
        }
    };

    const renderQuizComponent = () => {
        switch (selectedMode) {
            case "객관식":
                return <SingleModeQuizMultiple quizData={currentQuiz} onSubmit={handleAnswerSubmit} />;
            case "주관식":
                return <SingleModeQuizSubjective quizData={currentQuiz} onSubmit={handleAnswerSubmit} />;
            case "타임어택":
                return <SingleModeQuizTimeAttack quizData={currentQuiz} onSubmit={handleAnswerSubmit} />;
            default:
                return null;
        }
    };

    return (
        <Background>
            {isGrading ? (
                <SingleGradingPage
                    isCorrect={isCorrect}
                    correctAnswer={correctAnswer}
                    onNext={handleNextQuestion}
                    selectedMode={selectedMode}
                />
            ) : (
                renderQuizComponent()
            )}
        </Background>
    );
}
