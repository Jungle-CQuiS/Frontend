
import { PrimaryButtonLong } from "../../components/buttons/styled";
import { SignupBackground, SignupContainer, SignUpInputContainer, SignupInputWrap, SignupLabel } from "./styled";
import { LoginTitle, LoginWrap, LoginInput, LoginBottomWrap } from "../loginpage/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHoverSoundEffect from "../../hook/useHoverSoundEffect";
import { useAlert} from "../../components/confirmPopup";



export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useHoverSoundEffect();
  const customAlert = useAlert();

  const handleSignup = async () => {
    // 이메일 폼 체크
    const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailForm.test(email)) {
      customAlert("올바르지 않은 이메일 형식입니다.");
      return;
    }
    // 비밀번호 4자리 이상 15자리 이하
    const passwordForm = /^.{4,15}$/;
    if (!passwordForm.test(password)){
      customAlert("비밀번호는 4자리 이상 15자리 이하로 설정해주세요.")
      return;
    }

    if (email && username && password) {
      try {
        // 이메일 중복 체크      
        const emailResponse = await fetch(`/api/auth/email/${email}/duplicate-check`);
        const emailData = await emailResponse.json();
        if (emailData.data.emailIsDuplicate === true) {
          customAlert("이미 사용 중인 이메일입니다.");
          return;
        }
        // 닉네임 중복 체크    
        const usernameResponse = await fetch(`/api/auth/username/${username}/duplicate-check`);
        const usernameData = await usernameResponse.json();
        if (usernameData.data.usernameIsDuplicate === true) {
          customAlert("중복된 닉네임입니다. 다른 닉네임을 사용해주세요.");
          return;
        }
        const response = await fetch(`/api/auth/signup`, {
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
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("회원가입 오류:", error);
      }
    }
  };

  return (
    <>
      <SignupBackground>
        <SignupContainer>
          <LoginTitle>Sign Up</LoginTitle>
          <LoginWrap>
            <SignUpInputContainer>
              <SignupInputWrap>
                <SignupLabel>닉네임</SignupLabel>
                <LoginInput
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              </SignupInputWrap>
              <SignupInputWrap>
                <SignupLabel>이메일</SignupLabel>
                <LoginInput
                  type="text"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
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
        </SignupContainer>
      </SignupBackground>
    </>
  );
}