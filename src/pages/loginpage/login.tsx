import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PrimaryButtonLong } from "../../components/buttons/styled";
import NavBar from "../../components/navbar/navbar";
import { LoginBackground, LoginContainer, LoginTitle, LoginWrap, LoginWithGoogle, LoginDividerWrap, LoginLine, LoginText, LoginInputWrap, LoginInput, LoginBottomWrap, LoginLinkWrap, LoginLink } from "./styled";

export default function LoginPage() {
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
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        });
  
        if (!response.ok) {
          throw new Error("로그인에 실패했습니다.");
        }
  
        // 응답 텍스트를 가져오고 "Login Success" 메시지를 제거
        const textData = await response.text();
        console.log("서버 응답:", textData);
  
        // "Login Success" 메시지 제거 후 JSON 파싱
        const jsonData = textData.split("Login Success")[0];
        const data = JSON.parse(jsonData);
  
        // AccessToken과 RefreshToken이 있는지 확인
        if (!data.AccessToken || !data.RefreshToken) {
          throw new Error("응답 데이터에 AccessToken 또는 RefreshToken이 없습니다.");
        }
  
        // AccessToken과 RefreshToken 저장
        localStorage.setItem("AccessToken", data.AccessToken);
        localStorage.setItem("RefreshToken", data.RefreshToken);
  
        // 로그인 후 메인 페이지로 이동
        navigate("/main");
      } catch (error) {
        console.error("로그인 에러:", error);
        alert("로그인에 실패했습니다.");
      }
    } else {
      alert("이메일과 비밀번호를 입력해주세요.");
    }
  };
  

  return (
    <>
      <NavBar />
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
              />
              <LoginInput
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </LoginInputWrap>
            <LoginBottomWrap>
              <PrimaryButtonLong onClick={handleLogin}>로그인</PrimaryButtonLong>
              <LoginLinkWrap>
                <LoginLink>비밀번호 찾기</LoginLink>
                <LoginLink>|</LoginLink>
                <Link to="/signup" style={{textDecoration: "none"}}>
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
