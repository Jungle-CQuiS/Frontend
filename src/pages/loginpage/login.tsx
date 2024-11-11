import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PrimaryButtonLong } from "../../components/buttons/styled";
import { LoginBackground, LoginContainer, LoginTitle, LoginWrap, LoginWithGoogle, LoginDividerWrap, LoginLine, LoginText, LoginInputWrap, LoginInput, LoginBottomWrap, LoginLinkWrap, LoginLink } from "./styled";
import { SERVICES } from "../../config/api/constants";
import { LoginPageProps } from "../../types/user";
import useHoverSoundEffect from "../../hook/useHoverSoundEffect";
import { useAlert } from "../../components/confirmPopup";

export default function LoginPage({ setNickname, setIsLoggedIn }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const customAlert = useAlert();
  useHoverSoundEffect();
  const handleLogin = async () => {
    const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailForm.test(email)){
      customAlert("올바르지 않은 이메일 형식입니다.");
      return;
    }

    if (email && password) {
      try {
        const response = await fetch(`/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });

        if (!response.ok) {
          throw new Error("로그인에 실패했습니다.");
        }

        const data = await response.json();
        const username = data.username;

        if (username) {
          setNickname(username);
          localStorage.setItem("username", username);
        }

        localStorage.setItem("AccessToken", data.accessToken);
        localStorage.setItem("RefreshToken", data.refreshToken);
        localStorage.setItem("uuid", data.uuid);

        setIsLoggedIn(true); // 로그인 상태 업데이트
        navigate("/main");
      } catch (error) {
        console.error("로그인 에러:", error);
        customAlert("로그인에 실패했습니다.");
      }
    } else {
      customAlert("이메일과 비밀번호를 입력해주세요.");
    }
  };

  function handleEnterkey(event: any) {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleGoogleLogin = async () => {
    const redirectUrl = `${window.location.protocol}//dev.${window.location.host}/login/oauth2/code/google`;

    window.location.href = redirectUrl;
  }

  return (
    <>
      <LoginBackground>
        <LoginContainer>
          <LoginTitle>Log In</LoginTitle>
          <LoginWrap>
            <LoginInputWrap>
              <LoginInput
                type="text"
                placeholder="이메일을 입력하세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleEnterkey}
              />
              <LoginInput
                type="password"
                placeholder="비밀번호를 입력하세요."
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
