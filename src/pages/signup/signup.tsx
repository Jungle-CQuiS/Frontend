
import NavBar from "../../components/navbar/navbar";
import { PrimaryButtonLong } from "../../components/buttons/styled";
import { SignupBackground, SignUpInputContainer, SignupInputWrap, SignupLabel } from "./styled";
import { LoginContainer, LoginTitle, LoginWrap, LoginWithGoogle, LoginDividerWrap, LoginLine, LoginText, LoginInput, LoginBottomWrap } from "../loginpage/styled";



export default function SignupPage() {

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
                    <LoginInput placeholder="닉네임을 입력해주세요"/>
                </SignupInputWrap>
                <SignupInputWrap>
                    <SignupLabel>이메일</SignupLabel>
                    <LoginInput placeholder="이메일을 입력해주세요"/>
                </SignupInputWrap>
                <SignupInputWrap>
                    <SignupLabel>비밀번호</SignupLabel>
                    <LoginInput placeholder="비밀번호를 입력해주세요"/>
                </SignupInputWrap>
            </SignUpInputContainer>
            <LoginBottomWrap>
              <PrimaryButtonLong>회원가입</PrimaryButtonLong>
            </LoginBottomWrap>
          </LoginWrap>
        </LoginContainer>
      </SignupBackground>
    </>
  );
}