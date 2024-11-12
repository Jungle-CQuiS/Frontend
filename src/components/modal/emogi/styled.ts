import styled, { css } from "styled-components";
import { defaultTransition } from "../../../css";


export const EmojiModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const EmojiCategoryContainer = styled.div`
    display: flex;
    margin-bottom: -1px;  
    position: relative; 
    z-index: 1;         
`;

export const EmojiCategoryTab = styled.div<{ isSelected: boolean }>`
    padding: 9px 24px;
    border: 1px solid #D3D3D3;
    border-bottom: none;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px 8px 0px 0px;
    cursor: pointer;
    background-color: #fff;

    ${({ isSelected }) =>
        isSelected &&
        css`
            background-color: #444;
            color: #fff;
            &::after {  // 선택된 탭의 아래쪽 border를 제거
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 1px;
                background-color: #444;
            }
        `}

    ${defaultTransition};
    &:hover{
        background-color: ${({ isSelected }) => (isSelected ? "#444" : "#E7E7E7")}

    }
`

export const EmojiContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

export const EmojiContentBox = styled.div`
    padding: 15px 15px;   
    font-size: 18px;
    font-weight: 500;
    border: 1px solid #D3D3D3;
    border-radius: 0 0 8px 8px; 
    margin-top: -1px; 
`