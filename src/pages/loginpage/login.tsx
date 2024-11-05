import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PrimaryButtonLong } from "../../components/buttons/styled";
import { LoginBackground, LoginContainer, LoginTitle, LoginWrap, LoginWithGoogle, LoginDividerWrap, LoginLine, LoginText, LoginInputWrap, LoginInput, LoginBottomWrap, LoginLinkWrap, LoginLink } from "./styled";
import { SERVICES } from "../../config/api/constants";
import { LoginPageProps } from "../../types/user";

export default function LoginPage({ setNickname, setIsLoggedIn }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await fetch(`/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: username, password: password }),
        });

        if (!response.ok) {
          throw new Error("로그인에 실패했습니다.");
        }

        const data = await response.json();
        const userNickname = data.username;

        if (userNickname) {
          setNickname(userNickname);
          localStorage.setItem("nickname", userNickname);
        }

        localStorage.setItem("AccessToken", data.accessToken);
        localStorage.setItem("RefreshToken", data.refreshToken);
        localStorage.setItem("uuid", data.uuid);

        setIsLoggedIn(true); // 로그인 상태 업데이트
        navigate("/main");
      } catch (error) {
        console.error("로그인 에러:", error);
        alert("로그인에 실패했습니다.");
      }
    } else {
      alert("이메일과 비밀번호를 입력해주세요.");
    }
  };

  function handleEnterkey(event: any) {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <LoginBackground>
        <LoginContainer>
          <LoginTitle>Log In</LoginTitle>
          <LoginWrap>
            <LoginWithGoogle><img src="/icons/google.svg" alt="Google" />구글 계정으로 로그인</LoginWithGoogle>
            <LoginDividerWrap>
              <LoginLine></LoginLine>
              <LoginText>OR</LoginText>
              <LoginLine></LoginLine>
            </LoginDividerWrap>
            <LoginInputWrap>
              <LoginInput
                type="text"
                placeholder="이메일"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleEnterkey}
              />
              <LoginInput
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleEnterkey}
              />
            </LoginInputWrap>
            <LoginBottomWrap>
              <PrimaryButtonLong onClick={handleLogin}>로그인</PrimaryButtonLong>
              <LoginLinkWrap>
                <LoginLink>비밀번호 찾기</LoginLink>
                <LoginLink>|</LoginLink>
                <Link to={SERVICES.SIGNUP}
                  style={{ textDecoration: "none" }}>
                  <LoginLink>회원가입</LoginLink>
                </Link>
              </LoginLinkWrap>
            </LoginBottomWrap>
          </LoginWrap>
        </LoginContainer>
      </LoginBackground>
    </>
  );
}
