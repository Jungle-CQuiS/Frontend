import { Link, useNavigate } from "react-router-dom";
import { LandingPageAddProblemHeaderImg, LandingPageTooltipContainer, PrimaryButtonLarge } from "../../components/buttons/styled";
import { LandingPageContainer, LandingPageText, LandingPageTextContainer, LandingPageTextPrimary, LandingPageTextSecondary, LandingPageTextWrap, LandingPageWrap, WaveLetter } from "./styled";
import { SERVICES } from "../../config/api/constants";
import useHoverSoundEffect from "../../hook/useHoverSoundEffect";
import { Tooltip } from "react-tooltip";

export default function LandingPage() {

    const navigate = useNavigate();
    useHoverSoundEffect();

    const handleLoginStatus = () => {
        const accessToken = localStorage.getItem("AccessToken"); // 토큰이 존재하는지 확인
        if (accessToken) {
            // 토큰이 있으면 메인 페이지로 이동
            navigate(SERVICES.MAIN);
        } else {
            // 토큰이 없으면 로그인 페이지로 이동
            navigate(SERVICES.LOGIN);
        }
    };

    return (
        <>
            <LandingPageContainer>
                <LandingPageWrap>
                    <LandingPageTextContainer>
                        <LandingPageText src="/images/landing_text.png" />
                    </LandingPageTextContainer>
                    <div style={{
                        display: "flex", alignItems: "center", gap: "16px"
                    }}>
                        <PrimaryButtonLarge onClick={handleLoginStatus}>시작하기</PrimaryButtonLarge>
                        <LandingPageTooltipContainer>
                            <LandingPageAddProblemHeaderImg
                                src="/icons/question.svg"
                                data-tooltip-id="tooltip"
                            />
                            <Tooltip id="tooltip" place="bottom" className="tooltip-custom">
                                Cquis란? CS와 Quiz를 결합한<br />
                                Squid(오징어)를 연상시키는 단어입니다.
                            </Tooltip>
                        </LandingPageTooltipContainer>
                    </div>
                </LandingPageWrap>
            </LandingPageContainer>
        </>
    )
}