import styled from "styled-components";

export const MultiGameBackground = styled.div`
    display: flex;
    flex-direction: column;
    gap: 36px;
    width: 70%;
`;

export const MultiGameHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    font-weight: bold;
`;

export const MultiGameAttackContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const MutliGameAttackTimerWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const MultiGameAttackTimer = styled.div`
    color: #DB4453;
    font-size: 16px;
    font-weight: 600;
    padding-left: 8px;
    width: 40px;
    text-align: right;
`;

export const MultiGameAttackTimerText = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

export const MultiGameAttackQuizContainer = styled.div`
    display: flex;
    max-height: 450px;
`;

export const MultiGameAttackQuizWrap = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #D3D3D3;
    border-radius: 0px 16px 16px 16px;
    padding: 0px 40px 0px 40px;
    align-items: center;
    overflow-y: scroll;
    background-color: #fff;
    align-items: flex-start;
`;

export const MultiGameAttackQuiz = styled.div`
    display: flex;
    align-items: start;
    gap: 36px;
    border-bottom: 1px solid #D3D3D3;
    padding: 56px 0px 56px 0px;
    &:nth-child(2){
        border: none;
    }
    width: 100%;
`;

export const MultiGameAttackQuizCheckbox = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

export const MultiGameAttackQuizDivider = styled.div`
    height: 1px;
    width: 400px;
    background-color: #D3D3D3;
`;

export const MultiGameAttackButtonWrap = styled.div`
    display: flex;
    gap: 16px;
    justify-content: flex-end;
    margin-top: 8px;
`;