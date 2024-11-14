import { useEffect, useState } from "react";
import { IModalProps, Modal } from ".."
import { BlackButtonSmall } from "../../buttons/styled"
import { LookQuistionModalButtonWrap, LookQuistionModalContainer, LookQuistionModalName, LookQuistionModalQuizWrap, LookQuistionModalSelect, LookQuistionModalSelectImg, LookQuistionModalSelectWrap, LookQuistionModalTitle } from "./styled"

export const LookQuestionModal = ({
    selectedQuiz,
    ...props
}: IModalProps) => {
    const [isMultiple, setIsMultiple] = useState(false);

    useEffect(() => {
        if (selectedQuiz.koreanAnswer === undefined || selectedQuiz.koreanAnswer === null) {
            setIsMultiple(true);
        } else {
            setIsMultiple(false);
        }
    }, [selectedQuiz]);

    return(
        <Modal {...props}>
            <LookQuistionModalContainer>
                <LookQuistionModalTitle>문제보기</LookQuistionModalTitle>
                <LookQuistionModalName>{selectedQuiz.name}</LookQuistionModalName>
                {isMultiple ? (
                    <LookQuistionModalQuizWrap>
                        <LookQuistionModalSelectWrap>
                            <LookQuistionModalSelectImg src="/icons/number_1.svg"/>
                            <LookQuistionModalSelect>{selectedQuiz.choice1}</LookQuistionModalSelect>
                        </LookQuistionModalSelectWrap>
                        <LookQuistionModalSelectWrap>
                            <LookQuistionModalSelectImg src="/icons/number_2.svg"/>
                            <LookQuistionModalSelect>{selectedQuiz.choice2}</LookQuistionModalSelect>
                        </LookQuistionModalSelectWrap>
                        <LookQuistionModalSelectWrap>
                            <LookQuistionModalSelectImg src="/icons/number_3.svg"/>
                            <LookQuistionModalSelect>{selectedQuiz.choice3}</LookQuistionModalSelect>
                        </LookQuistionModalSelectWrap>
                        <LookQuistionModalSelectWrap>
                            <LookQuistionModalSelectImg src="/icons/number_4.svg"/>
                            <LookQuistionModalSelect>{selectedQuiz.choice4}</LookQuistionModalSelect>
                        </LookQuistionModalSelectWrap>
                    </LookQuistionModalQuizWrap>
                ) : (   // FIXME: 현재 받아오는 주관식 문제 데이터에 정답이 제대로 전달되지 않는 것 같습니다 
                    <LookQuistionModalSelect>{selectedQuiz.koreanAnswer}({selectedQuiz.englishAnswer})</LookQuistionModalSelect>
                )}
                <LookQuistionModalButtonWrap>
                    <BlackButtonSmall onClick={props.onClose}>확인</BlackButtonSmall>
                </LookQuistionModalButtonWrap>
            </LookQuistionModalContainer>
        </Modal>
    )
}