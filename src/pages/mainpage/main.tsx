import { Link, useNavigate } from "react-router-dom";
import { MainPageContainer, GameModeButton, GameModeWrapper, Icon, IconWrap, MainPageBottom, MainPageSubText, MainPageText } from "./styled";


export default function MainPage(){

    const navigate = useNavigate();

    const handleToSingleMode = () => {
        navigate("/single");
    }

    const handleToMultiMode = () => {
        navigate("/multi");
    }


    return (
    <>
        <MainPageContainer>
            <GameModeWrapper>
                    <GameModeButton onClick={handleToSingleMode}>
                        <IconWrap>
                            <Icon src="/icons/mdi_user.svg" alt="Single Play Icon" />
                        </IconWrap>
                        <MainPageBottom>
                            <MainPageText>싱글모드</MainPageText>
                            <MainPageSubText>혼자 공부하기</MainPageSubText>
                        </MainPageBottom>
                    </GameModeButton>
                    <GameModeButton onClick={handleToMultiMode}>
                        <IconWrap>
                            <Icon src="/icons/mdi_users.svg" alt="Multi Play Icon" />
                        </IconWrap>
                        <MainPageBottom>
                            <MainPageText>멀티모드</MainPageText>
                            <MainPageSubText>같이 공부하기</MainPageSubText>
                        </MainPageBottom>
                    </GameModeButton>
            </GameModeWrapper>
        </MainPageContainer>
    </>
    )
}
