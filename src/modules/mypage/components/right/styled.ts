import styled, { css } from "styled-components";
import { defaultTransition } from "../../../../css";

export const MyPageRightWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MyPageCategoryContainer = styled.div`
    display: flex;
    gap: 8px;
`;

export const MyPageCategoryTab = styled.div<{ isSelected: boolean }>`
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
        `}

    ${defaultTransition};
    &:hover{
        background-color: ${({ isSelected }) => (isSelected ? "#444" : "#E7E7E7")}

    }
`   

export const MyPageProblemContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 400px;
    overflow-y: auto;
    background-color: #fff;
    padding: 36px 64px;
    border: 1px solid #D3D3D3;
    border-radius: 0px 16px 16px 16px;
    gap: 24px;
`;

export const MyPageProblemWrap = styled.div`
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-bottom: 1px solid #D3D3D3;
`;

export const MyPageProblemTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #333;
    line-height: 1.4;
    word-break: break-word;
    width: 620px;
    overflow-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const MyPageProblemSelectRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const MyPageProblemSelectImg = styled.img`
    width: 24px;
    height: 24px;
`;

export const MyPageProblemSelectText = styled.div`
    font-size: 14px;
    color: #666;
    max-width: 600px;
    overflow-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
`;
