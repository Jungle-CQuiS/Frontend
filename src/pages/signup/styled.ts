import styled from "styled-components";

export const SignupBackground = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background-image: url('/images/background_base.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
`;

export const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;
    border: 4px solid #F6F8FC;
    background-color: #fff;
    padding: 57px 93px;
    border-radius: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const SignUpInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const SignupInputWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const SignupLabel = styled.label`
    font-size: 14px;
    font-weight: 600;
`;
