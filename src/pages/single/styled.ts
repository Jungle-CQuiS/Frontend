import styled from "styled-components";
import { defaultTransition } from "../../css";

export const SingleModeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 80px;
`;

export const SingleModeTop = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const SingleModeWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const SingleModeLabel = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

export const SingleModeTabWrap = styled.div`
    display: flex;
    gap: 16px;
`;

export const SingleModeTab = styled.div<{ isSelected?: boolean }>`
    padding: 8px 19px;
    border: ${({ isSelected }) => (isSelected ? "none" : "1px solid #969696")};
    color: ${({ isSelected }) => (isSelected ? "#FFF" : "#969696")};
    font-size: 13px;
    font-weight: 500;
    border-radius: 4px;
    background-color: ${({ isSelected }) => (isSelected ? "#444" : "#FFF")};
    cursor: pointer;
`;

export const SingleModeSelectModeContainer = styled.div`
    display: flex;
    gap: 72px;
`;

export const SingleModeSelectModeWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    ${defaultTransition};
    &:hover{
        transform: scale(1.05);
        box-shadow: 4 10px 18px rgba(238,85,103,0.75);
    }
`;

export const SingleModeSelectMode = styled.div`
    background: linear-gradient(rgba(47, 105, 255, 0.8) 49%, rgba(28, 63, 153, 0.8) 100%);
    padding: 60px 81px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
`;

export const SingleModeSelectModeImg = styled.img`

`;

export const SingleModeSelectModeText = styled.div`
    color: #fff;
    font-size: 32px;
    font-weight: 700;
`;

export const SingleModeSelectModeBox = styled.div`
    height: 17px;
    width: 320px;
    background-color: #4A66AF;
`;