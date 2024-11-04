import { useNavigate } from "react-router-dom";
import { IModalProps, Modal } from ".."
import SingleModeHeaderComponent from "../../../modules/single/components/header"
import { PrimaryButtonMedium, SecondaryButton } from "../../buttons/styled"
import { SingleModeSelectModalButtonWrap, SingleModeSelectModalConatiner, SingleModeSelectModalLabel, SingleModeSelectModalRow, SingleModeSelectModalRowBottom, SingleModeSelectModalTag, SingleModeSelectModalTagWrap, SingleModeSelectModalWrap } from "./styled"

interface SingleModeSelectModalProps extends IModalProps {
    selectedTopic: string;
    selectedNumber: string;
    selectedMode: string;
}

export const SingleModeSelectModal = ({
    selectedTopic,
    selectedNumber,
    selectedMode,
    ...props
}: SingleModeSelectModalProps) => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/single/quiz", { state: { selectedMode } });
    };

    return (
        <Modal {...props}>
            <SingleModeSelectModalConatiner>
                <SingleModeHeaderComponent />
                <SingleModeSelectModalWrap>
                    <SingleModeSelectModalRow>
                        <SingleModeSelectModalLabel>주제</SingleModeSelectModalLabel>
                        <SingleModeSelectModalTagWrap>
                            <SingleModeSelectModalTag>{selectedTopic}</SingleModeSelectModalTag>
                        </SingleModeSelectModalTagWrap>
                    </SingleModeSelectModalRow>
                    <SingleModeSelectModalRowBottom>
                        <SingleModeSelectModalRow>
                            <SingleModeSelectModalLabel>문제 수</SingleModeSelectModalLabel>
                            <SingleModeSelectModalTag>{selectedNumber}</SingleModeSelectModalTag>
                        </SingleModeSelectModalRow>
                        <SingleModeSelectModalRow>
                            <SingleModeSelectModalLabel>플레이모드</SingleModeSelectModalLabel>
                            <SingleModeSelectModalTag>{selectedMode}</SingleModeSelectModalTag>
                        </SingleModeSelectModalRow>
                    </SingleModeSelectModalRowBottom>
                </SingleModeSelectModalWrap>
                <SingleModeSelectModalButtonWrap>
                    <SecondaryButton onClick={props.onClose}>다시 선택</SecondaryButton>
                    <PrimaryButtonMedium onClick={handleStart}>시작하기</PrimaryButtonMedium>
                </SingleModeSelectModalButtonWrap>
            </SingleModeSelectModalConatiner>
        </Modal>
    );
};
