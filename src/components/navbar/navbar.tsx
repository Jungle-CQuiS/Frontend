import { Link } from "react-router-dom";
import { PrimaryButtonMedium } from "../buttons/styled";
import { NavBarButtonWrap, NavBarContainer, NavBarLogo } from "./styled";

export default function NavBar(){
    return (
        <NavBarContainer>
            <Link to="/">
                <NavBarLogo src="/images/logo.png"/>
            </Link>
            <NavBarButtonWrap>
                <PrimaryButtonMedium>MY PAGE</PrimaryButtonMedium>
                <Link to="/login">
                    <PrimaryButtonMedium>LOGIN</PrimaryButtonMedium>
                </Link>
            </NavBarButtonWrap>
        </NavBarContainer>
    )
}