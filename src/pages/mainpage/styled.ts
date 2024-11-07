import styled from "styled-components";
import { defaultTransition } from "../../css";

export const MainPageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 150px;
  background-image: url('/images/game-background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

export const GameModeWrapper = styled.div`
  display: flex;
  gap: 145px; 
`;

export const GameModeButton = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  ${defaultTransition};
  &:hover {
    background-color: ${(props) => (props.disabled ? "#3B82F6" : "#2563EB")};
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
  background: linear-gradient( #2F69FF 22%, #1C3F99 100%);
  opacity: 90%;
`;

export const MainPageBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  padding: 73px 129px;
  background-color: #fff;
`;

export const MainPageText = styled.div`
  font-size: 32px;
  font-weight: 600;
`;

export const MainPageSubText = styled.div`
  color: #969696;
  font-size: 15px;
  font-weight: 600;
`;
