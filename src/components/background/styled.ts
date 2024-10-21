import styled from "styled-components";

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
  overflow: hidden;
`;