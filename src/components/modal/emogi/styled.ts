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
    padding: 9px 15px;
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
    padding: 0px 0px;   
    font-size: 18px;
    font-weight: 500;
    border: 1px solid #D3D3D3;
    border-radius: 0 0 8px 8px;
    height: 106px;        // 정확히 한 줄 높이로 설정 (이미지 100px + 패딩 3px * 2)
    overflow-y: auto;
     overflow-x: hidden;
    /* 스크롤 스냅 설정 */
    scroll-snap-type: y mandatory;  
    scroll-behavior: smooth;

    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

export const EmojiGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const EmojiRow = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    height: 106px;
`;

export const EmojiButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 3px;
    transition: transform 0.2s;
    
    &:hover {
        transform: scale(1.1);
    }
    
    img {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }
`;