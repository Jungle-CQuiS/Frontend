import styled, { keyframes } from "styled-components";

export const SelectAnswerButtonWrap = styled.div`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-right: 236px;
`;

export const SelectAnswerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 36px;
`;

export const SelectAnswerModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

export const SelectAnswerModalWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
`;

export const SelectAnswerModalImg = styled.img`
    width: 126px;
    height: 126px;
`;

export const SelectAnswerModalTitle = styled.div`
    font-size: 38px;
    font-weight: 700;
`;

export const SelectAnswerModalText = styled.div`
    color: #969696;
    font-size: 20px;
    font-weight: 600;
`;

export const MultiAnimationModalContainerPop = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%, 
        rgba(0, 0, 0, 0.5) 46%,
        rgba(0, 0, 0, 0.5) 58%,  
        rgba(255, 255, 255, 0) 100%
    );
    padding: 29px;
    width: 410px;
    color: white;
    text-align: center;
    z-index: 9999;
    opacity: 0;
    animation: slideIn 0.5s forwards, centerShrink 1s linear 0.5s forwards;

    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

    @keyframes slideIn {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }

    @keyframes centerShrink {
        0% {
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            transform: translate(-50%, -50%) scale(0.8);
        }
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
    }
`;


export const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-10px); }
  40%, 80% { transform: translateX(10px); }
`;

export const ShakeContainer = styled.div`
  animation: ${shake} 0.6s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;

`;