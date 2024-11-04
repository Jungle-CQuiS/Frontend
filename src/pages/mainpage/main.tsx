import { Link } from "react-router-dom";
import { MainPageContainer, GameModeButton, GameModeWrapper, Icon } from "./styled";


export default function MainPage(){
    return (
    <>
        <MainPageContainer>
            <GameModeWrapper>
                <Link to="/single" style={{ textDecoration: "none" }}>
                    <GameModeButton>
                        <Icon src="/icons/mdi_user.svg" alt="Single Play Icon" />
                        <span>Play</span>
                    </GameModeButton>
                </Link>
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
