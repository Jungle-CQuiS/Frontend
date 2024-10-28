
import NavBar from "../../components/navbar/navbar";
import { PrimaryButtonLong } from "../../components/buttons/styled";
import { SignupBackground, SignUpInputContainer, SignupInputWrap, SignupLabel } from "./styled";
import { LoginContainer, LoginTitle, LoginWrap, LoginWithGoogle, LoginDividerWrap, LoginLine, LoginText, LoginInput, LoginBottomWrap } from "../loginpage/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (email && username && password) {
      try {
        // 이메일 중복 체크      
        const emailResponse = await fetch(`/auth/email/${email}/duplicate-check`);
        const emailData = await emailResponse.json();
        if (emailData.data.emailIsDuplicate === 1) {
          alert("이미 사용 중인 이메일입니다.");
          return;
        }
        // 닉네임 중복 체크    
        const usernameResponse = await fetch(`/auth/username/${username}/duplicate-check`);
        const usernameData = await usernameResponse.json();
        if (usernameData.data.usernameIsDuplicate === 1) {
          alert("중복된 닉네임입니다.");
          return;
        }
        const response = await fetch(`/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            username,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error("회원가입에 실패하였습니다.");
        } else {
          const checksignupData = await response.json();
          if (checksignupData.code === "S001") {
            navigate("/main");
          }
        }
      } catch (error) {
        console.error("회원가입 오류:", error);
      }
    }
  };

  return (
    <>
      <NavBar />
      <SignupBackground>
        <LoginContainer>
          <LoginTitle>Sign Up</LoginTitle>
          <LoginWrap>
            <LoginWithGoogle><img src="/icons/google.svg" alt="Google" />구글 계정으로 가입하기</LoginWithGoogle>
            <LoginDividerWrap>
              <LoginLine></LoginLine>
              <LoginText>OR</LoginText>
              <LoginLine></LoginLine>
            </LoginDividerWrap>
            <SignUpInputContainer>
              <SignupInputWrap>
                <SignupLabel>닉네임</SignupLabel>
                <LoginInput
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </SignupInputWrap>
              <SignupInputWrap>
                <SignupLabel>이메일</SignupLabel>
                <LoginInput
                  type="text"
                  placeholder="이메일을 입력해주세요"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              </SignupInputWrap>
              <SignupInputWrap>
                <SignupLabel>비밀번호</SignupLabel>
                <LoginInput
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </SignupInputWrap>
            </SignUpInputContainer>
            <LoginBottomWrap>
              <PrimaryButtonLong onClick={handleSignup}>회원가입</PrimaryButtonLong>
            </LoginBottomWrap>
          </LoginWrap>
        </LoginContainer>
      </SignupBackground>
    </>
  );
}