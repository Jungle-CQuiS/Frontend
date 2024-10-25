import { useState } from "react";
import { BlackButtonSmall } from "../../../../../components/buttons/styled";
import { AnswerSelectContainer, AnswerSelectWrap, AnswerSelectCheckbox, AnswerSelectText, AnswerSelectRow } from "./styled";

interface Answer {
  value: string;
  isSelected: boolean;
}

export default function AnswerSelectComponent() {
    const [answers, setAnswers] = useState<Answer[]>([
        { value: "1", isSelected: true }, 
        { value: "2", isSelected: false },
        { value: "2", isSelected: false },
        { value: "4", isSelected: false },
        { value: "3", isSelected: false },
    ]);

    const handleSelect = (index: number) => {
        setAnswers(answers.map((answer, i) => ({
            ...answer,
            isSelected: i === index
        })));
    };

    return (
        <AnswerSelectContainer>
            <BlackButtonSmall>문제보기</BlackButtonSmall>
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
        </AnswerSelectContainer>
    );
}
