import styled from "styled-components";

export const SingleGradingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 100px;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const SingleGradingWrap = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 24px 140px 40px 140px;
    border-radius: 16px;
    gap: 36px;
    align-items: center;
`;

export const SingleGradingimg = styled.img`
    width: 246px;
    height: 246px;
`;

export const SingleGradingResult = styled.div`
    font-size: 26px;
    font-weight: 600;
`;

export const SingleGradingButtonWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const SingleGradingResultWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const SingleGradingResultText = styled.div`
    font-size: 26px;
    font-weight: 600;
    color: #969696;
`;