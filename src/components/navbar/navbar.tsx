import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PrimaryButtonMedium } from "../buttons/styled";
import { NavBarButtonWrap, NavBarContainer, NavBarLogo } from "./styled";

export default function NavBar(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 로컬 스토리지에 uuid가 있는지 확인해서 로그인 상태 확인
        const userUuid = localStorage.getItem("uuid");
        setIsLoggedIn(!!userUuid);  // uuid가 있으면 true, 없으면 false
    }, []);

    const handleLogout = () => {
        // 로그아웃 처리 (로컬 스토리지에서 uuid 제거)
        localStorage.removeItem("uuid");
        localStorage.removeItem("username");
        setIsLoggedIn(false);  // 로그아웃 상태로 변경
        navigate("/login");  // 로그아웃 후 로그인 페이지로 이동
    };

    return (
        <NavBarContainer>
            <Link to="/">
                <NavBarLogo src="/images/logo.png"/>
            </Link>
            <NavBarButtonWrap>
                <PrimaryButtonMedium>MY PAGE</PrimaryButtonMedium>
                {/* 로그인 상태에 따른 조건부 렌더링 */}
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
