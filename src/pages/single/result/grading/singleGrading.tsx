import { useNavigate } from "react-router-dom";
import { SecondaryButtonSmall, BlackButtonSmall } from "../../../../components/buttons/styled";
import { useConfirm } from "../../../../components/confirmPopup";
import { HeaderTagComponent } from "../../../../modules/single/components/headerTag";
import { SingleGradingContainer, SingleGradingWrap, SingleGradingimg, SingleGradingResult, SingleGradingButtonWrap, SingleGradingResultText, SingleGradingResultWrap } from "./styled";
import useButtonSoundEffect from "../../../../hook/useHoverSoundEffect";

interface SingleGradingPageProps {
    isCorrect?: boolean | null;
    correctAnswer?: string | null;
    onNext?: () => void;
}
  
export const SingleGradingPage = ({
    isCorrect = null,
    correctAnswer = null,
    onNext = () => {},
    selectedMode = "주관식",
}: SingleGradingPageProps & { selectedMode: "객관식" | "주관식" | "타임어택" }) => {

    const confirm = useConfirm();
    const navigate = useNavigate();
    useButtonSoundEffect()


    const handleExit = async () => {
        const confirmed = await confirm("퀴즈를 중단하고 나가시겠습니까?")
        if (confirmed) {
            navigate("/single");
        } 
    }
    return (
        <SingleGradingContainer>
            <HeaderTagComponent type={selectedMode} /> 
            <SingleGradingWrap>
                <SingleGradingimg src={isCorrect ? "/icons/correct.svg" : "/icons/wrong.svg"} />
                <SingleGradingResult>
                    {isCorrect ? (
                        <span>정답입니다!</span>
                    ) : (
                        <SingleGradingResultWrap>
                            <SingleGradingResultText>정답</SingleGradingResultText>
                            <div>{correctAnswer}</div>
                        </SingleGradingResultWrap>
                    )}
                </SingleGradingResult>
            </SingleGradingWrap>
            <SingleGradingButtonWrap>
                <SecondaryButtonSmall className="click-sound" onClick={handleExit}>나가기</SecondaryButtonSmall>
                <BlackButtonSmall className="click-sound" onClick={onNext}>다음 문제</BlackButtonSmall>
            </SingleGradingButtonWrap>
        </SingleGradingContainer>
    );
};

