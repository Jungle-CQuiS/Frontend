import { Link } from "react-router-dom";
import { MainPageContainer, GameModeButton, GameModeWrapper, Icon } from "./styled";

// 아이콘 경로를 절대 경로로 설정
export default function MainPage(){
    return (
    <>
        <MainPageContainer>
            <GameModeWrapper>
                <GameModeButton disabled>
                    <Icon src="/icons/mdi_user-disabled.svg" alt="Single Play Icon" />
                    <span>Single Play</span>
                    <span>Coming Soon</span>
                </GameModeButton>
                <Link to="/multi" style={{ textDecoration: "none" }}>
                    <GameModeButton>
                        <Icon src="/icons/mdi_users.svg" alt="Multi Play Icon" />
                        <span>Multi Play</span>
                    </GameModeButton>
                </Link>
            </GameModeWrapper>
        </MainPageContainer>
    </>
    )
}
