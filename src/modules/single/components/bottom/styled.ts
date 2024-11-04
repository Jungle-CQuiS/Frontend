import styled from "styled-components";

export const SingleModeBottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 62px;
    width: 100%;
    align-items: center;
`;

export const SingleModeBottomInputWrap = styled.div`
    display: flex;
    gap: 36px;
    width: 100%;
`;

export const SingleModeBottomInput = styled.input`
    padding: 10px 14px;
    border: 1px solid #D3D3D3;
    border-radius: 8px;
    flex: 1;
    &::placeholder{
        color: #D3D3D3;
        font-size: 16px;
        font-weight: 400;
    }
`;