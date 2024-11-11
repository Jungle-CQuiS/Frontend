import styled from "styled-components";

export const LoadingScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9999;

  div {
    width: 300px;
    max-width: 90%;
  }
`;

export const LoadingTitle = styled.div`
    margin-bottom: 10px;
    font-size: 30px;
    font-weight: 600;
`;