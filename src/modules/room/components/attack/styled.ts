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


export const MultiAnimationModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 25%;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.7) 0%,   
        rgba(170, 170, 170, 0.7) 23%,   
        rgba(68, 68, 68, 0.7) 68% 
    );
    clip-path: polygon(0% 0, 100% 0, 90% 100%, 0% 100%);
    padding: 40px 200px 40px 550px;
    border-radius: 8px;
    color: white;
    text-align: center;
    font-weight: bold;
    z-index: 9999;
    opacity: 0;
    animation: slideIn 0.5s forwards, moveRight 1.5s linear 0.5s forwards, slideOut 0.5s forwards 2s;

    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

    @keyframes slideIn {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) translateX(-100%);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) translateX(0);
        }
    }

    @keyframes moveRight {
        0% {
            transform: translate(-50%, -50%) translateX(0);
        }
        100% {
            transform: translate(-50%, -50%) translateX(20px);
        }
    }

    @keyframes slideOut {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) translateX(20px);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) translateX(100%);
        }
    }
`;


export const MultiAnimationBackgroundOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.5);
    z-index: 9998;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
`;


export const MultiAnimationTextWrap = styled.div`
    display: flex;
    gap: 24px;
    align-items: center;
`;

export const MultiAnimationTextSmall = styled.div`
    font-size: 38px;
    font-weight: 800;
    font-style: italic;
`;

export const MultiAnimationTextLarge = styled.div`
    font-size: 53px;
    font-weight: 800;
    font-style: italic;
`;