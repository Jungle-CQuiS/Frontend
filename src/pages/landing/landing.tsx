import { Link } from "react-router-dom";
import { PrimaryButtonLarge } from "../../components/buttons/styled";
import NavBar from "../../components/navbar/navbar";
import { LandingPageContainer, LandingPageText, LandingPageTextContainer, LandingPageTextPrimary, LandingPageTextSecondary, LandingPageTextWrap, LandingPageWrap } from "./styled";

export default function LandingPage(){
    return (
    <>
        <NavBar />
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
                    <Link to="/main" >
                        <PrimaryButtonLarge>시작하기</PrimaryButtonLarge>
                    </Link>
            </LandingPageWrap>
        </LandingPageContainer>
    </>
    )
}