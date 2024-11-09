import styled, { keyframes } from "styled-components";

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

export const Background = styled.div`
  width: 100%;
  height: calc(100vh - 32px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 32px;
  background-image: url('/images/game-background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: ${backgroundMove} 3s ease-in-out infinite;
`;