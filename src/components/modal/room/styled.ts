import styled from "styled-components";
import { defaultTransition } from "../../../css";

export const CreateRoomModalBodyWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 36px;
    margin-top: 40px;
`;

export const CreateRoomModalRowContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CreateRoomModalRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;


export const CreateRoomModalLabel = styled.label`
    font-size: 24px;
    font-weight: 700;
`;

export const CreateRoomModalInput = styled.input`
    padding: 10px 14px;
    border: 1px solid #D3D3D3;
    font-size: 20px;
    border-radius: 8px;
    ${defaultTransition}
    &:hover {
        box-shadow: 0 0px 10px #e6e8f6, 0 5px 5px #e6e8f6;
    }
    &:focus {
        border: 1px solid #2F69FF;
    }
    &::placeholder {
        color: #D3D3D3;
    }
`;

export const CreateRoomModalPasswordWrap = styled.div`
    display: flex;
    gap: 40px;
`;

export const CreateRoomModalPasswordRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

export const CreateRoomModalPasswordCheckbox = styled.img`
    width: 16px;
    height: 16px;
    -webkit-user-drag: none;
    cursor: pointer;
`;

export const CreateRoomModalPasswordInput = styled.input`
    padding: 10px 14px;
    border: 1px solid #D3D3D3;
    min-width: 180px;
    font-size: 12px;
    border-radius: 8px;
    ${defaultTransition}
    &:hover {
        box-shadow: 0 0px 10px #e6e8f6, 0 5px 5px #e6e8f6;
    }
    &:focus {
        border: 1px solid #2F69FF;
    }
    &::placeholder {
        color: #D3D3D3;
    }
    &:disabled {
        background-color: #E7E7E7;
        border: 1px solid #E7E7E7;
        &:hover{
            box-shadow: none;
        }
        &::placeholder{
            color: #E7E7E7;
        }
    }
`;

export const CreateRoomModalText = styled.div`
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
`;

export const CreateRoomModalNumberWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const CreateRoomModalNumber = styled.input`
    padding: 10px 4px 10px 14px;
    border: 1px solid #D3D3D3;
    font-size: 20px;
    border-radius: 8px;
    ${defaultTransition}
    &:hover {
        box-shadow: 0 0px 10px #e6e8f6, 0 5px 5px #e6e8f6;
    }
    &:focus {
        border: 1px solid #2F69FF;
    }
    &::placeholder {
        color: #D3D3D3;
    }
`;

export const CreateRoomModalNumberInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const CreateRoomModalNumberInfoImg = styled.img`
    width: 16px;
    height: 16px;
`;

export const CreateRoomModalNumberInfoText = styled.div`
    font-size: 14px;
    color: #969696;
`;

export const CreateRoomModalButtonWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-end;
`;