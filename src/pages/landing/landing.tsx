import { Link, useNavigate } from "react-router-dom";
import { PrimaryButtonLarge } from "../../components/buttons/styled";
import { LandingPageContainer, LandingPageText, LandingPageTextContainer, LandingPageTextPrimary, LandingPageTextSecondary, LandingPageTextWrap, LandingPageWrap } from "./styled";
import { SERVICES } from "../../config/api/constants";

export default function LandingPage() {

    const navigate = useNavigate();

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
                        <LandingPageTextWrap>
                            <LandingPageText>공부를 더 &nbsp;</LandingPageText>
                            <LandingPageTextPrimary>즐겁게</LandingPageTextPrimary>
                            <LandingPageText>!</LandingPageText>
                        </LandingPageTextWrap>
                        <LandingPageTextWrap>
                            <LandingPageTextSecondary>맞춤형 퀴즈</LandingPageTextSecondary>
                            <LandingPageText>들을 통해</LandingPageText>
                        </LandingPageTextWrap>
                        <LandingPageTextWrap>
                            <LandingPageTextPrimary>성장하는 내 모습</LandingPageTextPrimary>
                            <LandingPageText>을 확인하세요!</LandingPageText>
                        </LandingPageTextWrap>
                    </LandingPageTextContainer>
                    <PrimaryButtonLarge onClick={handleLoginStatus}>시작하기</PrimaryButtonLarge>
                </LandingPageWrap>
            </LandingPageContainer>
        </>
    )
}