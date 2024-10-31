import { ProblemsContainer, ProblemTitle, ProblemSelectContainer, ProblemSelectWrap, ProblemSelectImg, ProblemSelectText } from "./styled";

interface QuizProblemsComponentProps {
    quiz: any;
    showAnswer?: boolean;
}

const QuizProblemsComponent = ({ quiz, showAnswer = true }: QuizProblemsComponentProps) => {
    return (
        <ProblemsContainer>
            <ProblemTitle>{quiz.name}</ProblemTitle>
            {quiz.choice1 && quiz.choice2 && quiz.choice3 && quiz.choice4 ? (
                <ProblemSelectContainer>
                    {[quiz.choice1, quiz.choice2, quiz.choice3, quiz.choice4].map((choice, index) => (
                        <ProblemSelectWrap key={index}>
                            <ProblemSelectImg src={`/icons/number_${index + 1}.svg`} />
                            <ProblemSelectText>{choice}</ProblemSelectText>
                        </ProblemSelectWrap>
                    ))}
                </ProblemSelectContainer>
            ) : (
                showAnswer && (
                    <ProblemSelectContainer>
                        <ProblemSelectText>
                            {quiz.koreanAnswer || quiz.englishAnswer}
                        </ProblemSelectText>
                    </ProblemSelectContainer>
                )
            )}
        </ProblemsContainer>
    );
}

export default QuizProblemsComponent;
