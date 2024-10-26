import { IModalProps, Modal } from ".."
import { BlackButtonSmall } from "../../buttons/styled"
import QuizProblemsComponent from "../../quiz"
import { LookQuistionModalButtonWrap, LookQuistionModalContainer, LookQuistionModalTitle } from "./styled"

export const LookQuestionModal = ({
    ...props
}: IModalProps) => {
    return(
        <Modal {...props}>
            <LookQuistionModalContainer>
                <LookQuistionModalTitle>문제보기</LookQuistionModalTitle>
                <QuizProblemsComponent />
                <LookQuistionModalButtonWrap>
                    <BlackButtonSmall onClick={props.onClose}>확인</BlackButtonSmall>
                </LookQuistionModalButtonWrap>
            </LookQuistionModalContainer>
        </Modal>
    )
}