import { useState } from "react";
import { BlackButtonSmall } from "../../../../../components/buttons/styled";
import { AnswerSelectContainer, AnswerSelectWrap, AnswerSelectCheckbox, AnswerSelectText, AnswerSelectRow } from "./styled";
import { LookQuestionModal } from "../../../../../components/modal/lookQuestion";
import { UserAnswer } from "../../../../../types/quiz";
import { Quiz } from "../../../../../types/quiz";

interface Answer {
  value: string;
  isSelected: boolean;
}

interface SelectAnswerPageProps {
    selectedQuiz: Quiz | null;
    userAnswers: UserAnswer[] | null;
}

export default function AnswerSelectComponent( { selectedQuiz ,userAnswers }: SelectAnswerPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
 
    const [answers, setAnswers] = useState<Answer[]>(() => 
        userAnswers?.map((item , index) => ({
            value: item.answer,
            isSelected: index === 0    // 첫 번째 항목만 true
        })) ?? []
    );

    const handleSelect = (index: number) => {
        setAnswers(answers.map((answer, i) => ({
            ...answer,
            isSelected: i === index
        })));
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    const handleDone = () => {
        setIsModalOpen(false);
    };

    return (
        <AnswerSelectContainer>
            <BlackButtonSmall onClick={handleOpenModal}>문제보기</BlackButtonSmall>
            <AnswerSelectWrap>
                {answers.map((answer, index) => (
                    <AnswerSelectRow key={index} onClick={() => handleSelect(index)}>
                        <AnswerSelectCheckbox 
                            src={answer.isSelected ? "/icons/checkbox_filled.svg" : "/icons/checkbox_base.svg"} 
                        />
                        <AnswerSelectText>{answer.value}</AnswerSelectText>
                    </AnswerSelectRow>
                ))}
            </AnswerSelectWrap>
            <LookQuestionModal 
                open={isModalOpen}
                onClose={handleCloseModal}
                onDone={handleDone}
            />
        </AnswerSelectContainer>
    );
}
