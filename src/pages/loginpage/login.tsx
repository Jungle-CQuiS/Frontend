import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginBackground, LoginBottomWrap, LoginContainer, LoginDividerWrap, LoginInput, LoginInputWrap, LoginLine, LoginLink, LoginLinkWrap, LoginText, LoginTitle, LoginWithGoogle, LoginWrap } from "./styled";
import NavBar from "../../components/navbar/navbar";
import { PrimaryButtonLong } from "../../components/buttons/styled";

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = (c === 'x') ? r : ((r & 0x3) | 0x8); 
    return v.toString(16);
  });
};


export default function LoginPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username) {
      // 임시로 uuid 생성 후 로컬 스토리지에 저장
      const userUuid = generateUUID();
      localStorage.setItem("uuid", userUuid); // 유저의 uuid 저장
      localStorage.setItem("username", username); // 유저 이름도 저장
      
      // 로그인 후 메인 페이지로 이동
      navigate("/main");
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
                placeholder="닉네임"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <LoginInput placeholder="비밀번호"/>
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