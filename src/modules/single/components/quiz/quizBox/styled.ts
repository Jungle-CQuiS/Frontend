import styled from "styled-components";

export const SingleModeQuizBoxcontainer = styled.div`
    display: flex;
    gap: 30px;
    padding: 59px 52px;
    background-color: #fff;
    box-shadow: 0 0px 10px #e6e8f6, 0 5px 5px #e6e8f6;
`;

export const SingleModeQuizBoxNumber = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: #969696;
`;

export const SingleModeQuizBoxWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 36px;
`;

export const SingleModeQuizBoxTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
`;

export const SingleModeQuizBoxBottom = styled.div`
    display: flex;
    align-items: end;
    justify-content: flex-end;
`;

export const SingleModeQuizBoxBottomSelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const SingleModeQuizBoxBottomSelectWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const SingleModeQuizBoxBottomSelectImg = styled.img`
    width: 24px;
    height: 24px;
`;

export const SingleModeQuizBoxBottomSelect = styled.div`
    font-size: 16px;
    font-weight: 500;
    width: 648px;
`

export const SingleModeQuizBoxBottomBadWrap = styled.div`
    display: flex;
    gap: 8px;
    padding: 9px 11px;
    border: 1px solid #969696;
    border-radius: 80px;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
`;

export const SingleModeQuizBoxBottomBadImg = styled.img`
    width: 24px;
    height: 24px;
`;

export const SingleModeQuizBoxBottomBadText = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #969696;
`;