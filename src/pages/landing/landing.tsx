import { Link } from "react-router-dom";
import { PrimaryButtonLarge } from "../../components/buttons/styled";
import NavBar from "../../components/navbar/navbar";
import { LandingPageContainer, LandingPageText } from "./styled";

export default function LandingPage(){
    return (
    <>
        <NavBar />
        <LandingPageContainer>
            <LandingPageText>Landing Page-TODO</LandingPageText>
            <Link to="/main" >
                <PrimaryButtonLarge>시작하기</PrimaryButtonLarge>
            </Link>
        </LandingPageContainer>
    </>
    )
}