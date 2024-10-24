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
        // 유저가 입력한 username과 password를 URL 경로에 추가
        const response = await fetch(`api/auth/login/${username}/${password}`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("로그인에 실패했습니다.");
        }

        const data = await response.json();
        
        // 백엔드에서 받은 uuid와 username을 저장
        localStorage.setItem("uuid", data.data); // 유저의 uuid 저장
        localStorage.setItem("username", data.username); // 유저 이름도 저장
        
        // 로그인 후 메인 페이지로 이동
        navigate("/main");
      } catch (error) {
        console.error("로그인 에러:", error);
        alert("로그인에 실패했습니다.");
      }
    } else {
      alert("닉네임과 비밀번호를 입력해주세요.");
    }
  };

  return (
    <>
      <NavBar />
      <LoginBackground>
        <LoginContainer>
          <LoginTitle>테스트!</LoginTitle>
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
                placeholder="닉네임"
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
