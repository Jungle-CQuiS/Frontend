import styled from "styled-components";
import { defaultTransition } from "../../css";

export const LoginBackground = styled.div`
    width: 100%;
    height: calc(100vh - 120px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding-top: 120px;
    background-image: url('/images/login_background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
`;

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;
    border: 4px solid #F6F8FC;
    background-color: #fff;
    padding: 57px 93px;
    border-radius: 16px;
`;

export const LoginTitle = styled.div`
    font-size: 56px;
    font-weight: 700;
`;

export const LoginWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`

export const LoginWithGoogle = styled.button`
    padding: 10px 14px;
    border: 1px solid #D3D3D3;
    font-size: 14px;
    font-weight: 600;
    background-color: #fff;
    width: 320px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    ${defaultTransition}
    cursor: pointer;
    &:hover{
        background-color: #FAFAFA;
    }
`;

export const LoginDividerWrap = styled.div`
    display: flex;
    gap: 18px;
    align-items: center;
`;

export const LoginLine = styled.div`
    width: 253px;
    height: 1px;
    background-color: #E7E7E7;
`

export const LoginText = styled.div`
    font-size: 14px;
    font-weight: 500;
`

export const LoginInputWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const LoginInput = styled.input`
    padding: 10px 14px;
    border: 1px solid #D3D3D3;
    font-size: 14px;
    font-weight: 600;
    background-color: #fff;
    width: 296px;
    border-radius: 8px;
    ${defaultTransition}
    &:focus{
        border: 1px solid #2F69FF;
    }
    &:hover{
        background-color: #FAFAFA;
    }
    &::placeholder{
        color: #D3D3D3;
    }
`;

export const LoginBottomWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
`;

export const LoginLinkWrap = styled.div`
    display: flex;
    gap: 8px;
`;

export const LoginLink = styled.div`
    font-size: 12px;
    color: #D3D3D3;
    font-weight: 600;
    cursor: pointer;
`;
