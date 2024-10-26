import styled from "styled-components";

export const AnswerSelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 36px;
    align-items: flex-start;
    margin-left: 336px;
`;

export const AnswerSelectWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const AnswerSelectRow = styled.div`
    display: flex;
    gap: 24px;
    align-items: center;
`;

export const AnswerSelectCheckbox = styled.img`
    width: 24px;
    height: 24px;
    -webkit-user-drag: none;
    cursor: pointer;
`;

export const AnswerSelectText = styled.div`
    font-size: 16px;
    font-weight: 600;
    max-width: 880px;
`;