import styled, { keyframes } from "styled-components";
import { defaultTransition } from "../../css";

const backgroundMove = keyframes`
  0% {
    background-position: center top;
  }
  50% {
    background-position: center 20px; /* 원하는 만큼 이동 */
  }
  100% {
    background-position: center top;
  }
`;


export const MainPageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 150px;
  background-image: url('/images/background_base.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  animation: ${backgroundMove} 3s ease-in-out infinite;
`;

export const GameModeWrapper = styled.div`
  display: flex;
  gap: 145px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
`;

export const GameModeButton = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;

  ${defaultTransition};
  &:hover {
    transform: scale(1.05);
    box-shadow: 4px 10px 18px rgba(0, 0, 0, 0.25);
  }

  ${(props) =>
    props.disabled &&
    `
    pointer-events: none;  // 클릭 불가능
    background-color: #80A2F9;
    color: #BECFFA;
  `}
`;

export const Icon = styled.img`
  width: 220px;
  height: 220px;
  margin-bottom: 12px;
  
`;

export const IconWrap = styled.div`
  padding: 14px 74px;
  background-color: #395B9A;
  border-radius: 24px 24px 0px 0px;
  padding: 0px 88px;
`;

export const MainPageBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  padding: 73px 108px;
  background-color: #fff;
  border-radius: 0px 0px 24px 24px;
`;

export const MainPageText = styled.div`
  font-size: 45px;
  font-weight: 600;
`;

export const MainPageSubText = styled.div`
  color: #969696;
  font-size: 27px;
  font-weight: 600;
`;
