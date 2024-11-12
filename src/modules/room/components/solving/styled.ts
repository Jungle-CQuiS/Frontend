import styled from "styled-components";
import { defaultTransition } from "../../../../css";

export const SolvingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 60px;
    width: 100%;
    align-items: center;
`;

export const SolvingBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 8px;
`;

export const SovlingInputWrap = styled.div`
    display: flex;
    gap: 8px;
`;

export const SovlingInput = styled.input`
    width: 400px;
    border: 1px solid #D3D3D3;
    border-radius: 8px;
    padding: 10px 14px;
    &::placeholder{
        color: #D3D3D3;
    }
    ${defaultTransition}
    &:hover {
        box-shadow: 0 0px 10px #e6e8f6, 0 5px 5px #e6e8f6;
    }
    &:focus {
        border: 1px solid #2F69FF;
    }
`;