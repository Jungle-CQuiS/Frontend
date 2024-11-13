import { Background } from "../../components/background/styled";
import useButtonSoundEffect from "../../hook/useHoverSoundEffect";
import MyPageLeftSection from "../../modules/mypage/components/left";
import MyPageRightSection from "../../modules/mypage/components/right";
import { SignupBackground } from "../signup/styled";
import { MyPageContainer, MyPageHeader, MyPageHeaderImg, MyPageHeaderTitle } from "./styled";

export default function MyPage() {
    useButtonSoundEffect()

    return(
        <SignupBackground>
            <MyPageHeader>
                <MyPageHeaderImg src="/icons/edit.svg"/>
                <MyPageHeaderTitle>MY PAGE</MyPageHeaderTitle>
            </MyPageHeader>
            <MyPageContainer>
                <MyPageLeftSection />
                <MyPageRightSection />
            </MyPageContainer>
        </SignupBackground>
    )
}