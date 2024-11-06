import { useNavigate } from "react-router-dom";
import { BlackButtonSmall, SecondaryButtonSmall } from "../../../../components/buttons/styled";
import { useConfirm } from "../../../../components/confirmPopup";
import { SingleModeBottomContainer, SingleModeBottomInput, SingleModeBottomInputWrap } from "./styled";

interface SingleModeBottomComponentProps {
    onSubmit?: () => void;
    userAnswer?: string;
    setUserAnswer?: (answer: string) => void;
    isMultipleChoice?: boolean;
}

export const SingleModeBottomComponent = ({ onSubmit, userAnswer, setUserAnswer, isMultipleChoice }: SingleModeBottomComponentProps) => {
    const confirm = useConfirm();
    const navigate = useNavigate();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onSubmit) {
            onSubmit();
        }
    };

    const handleExit = async () => {
        const confirmed = await confirm("퀴즈를 중단하고 나가시겠습니까?")
        if (confirmed) {
            navigate("/single");
        } 
    }

    return (
        <SingleModeBottomContainer>
            {!isMultipleChoice && (
                <SingleModeBottomInputWrap>
                    <SingleModeBottomInput
                        type="text"
                        placeholder="정답을 입력하세요"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer?.(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <BlackButtonSmall onClick={onSubmit}>제출하기</BlackButtonSmall>
                </SingleModeBottomInputWrap>
            )}
            {isMultipleChoice && (
                <BlackButtonSmall onClick={onSubmit}>제출하기</BlackButtonSmall>
            )}
            <SecondaryButtonSmall onClick={handleExit}>나가기</SecondaryButtonSmall>
        </SingleModeBottomContainer>
    );
};
