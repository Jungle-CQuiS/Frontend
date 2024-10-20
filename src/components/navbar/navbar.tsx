import { Link } from "react-router-dom";
import { PrimaryButtonMedium } from "../buttons/styled";
import { NavBarButtonWrap, NavBarContainer, NavBarLogo } from "./styled";

export default function NavBar(){
    return (
        <NavBarContainer>
            <NavBarLogo src="/images/logo.png"/>
            <NavBarButtonWrap>
                <PrimaryButtonMedium>MY PAGE</PrimaryButtonMedium>
                <Link to="/login">
                    <PrimaryButtonMedium>LOGIN</PrimaryButtonMedium>
                </Link>
            </NavBarButtonWrap>
        </NavBarContainer>
    )
}