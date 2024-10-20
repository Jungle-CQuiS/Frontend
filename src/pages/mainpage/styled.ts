import styled from "styled-components";

export const MainPageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 150px;
  background-image: url('/images/mainpage-background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

export const GameModeWrapper = styled.div`
  display: flex;
  gap: 145px; 
`;

export const GameModeButton = styled.button<{ disabled?: boolean }>`
  width: 378px;
  height: 378px;
  background-color: #3B82F6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 32px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.disabled ? "#3B82F6" : "#2563EB")};
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
