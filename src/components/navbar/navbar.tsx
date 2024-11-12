import { Link, useNavigate } from "react-router-dom";
import { PrimaryButtonMedium } from "../buttons/styled";
import { NavBarButtonWrap, NavBarContainer, NavBarLogo } from "./styled";
import { NavBarProps } from "../../types/user";

export default function NavBar({ nickname, setNickname, isLoggedIn, setIsLoggedIn }: NavBarProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setNickname(null);
        localStorage.clear(); // 모든 항목 제거
        setIsLoggedIn(false); // 로그아웃 상태로 변경
        navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
    };

    const handleGoToMypage = () => {
        navigate("/mypage");
    }

    return (
        <NavBarContainer>
            <Link to="/">
                <NavBarLogo src="/images/logo.png" />
            </Link>
            <NavBarButtonWrap>
                <PrimaryButtonMedium onClick={handleGoToMypage}>{nickname || "MY PAGE"}</PrimaryButtonMedium>
                {isLoggedIn ? (
                    <PrimaryButtonMedium onClick={handleLogout}>LOGOUT</PrimaryButtonMedium>
                ) : (
                    <Link to="/login">
                        <PrimaryButtonMedium>LOGIN</PrimaryButtonMedium>
                    </Link>
                )}
            </NavBarButtonWrap>
        </NavBarContainer>
    );
}
