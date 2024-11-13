import styled from "styled-components";

export const ButtonContainer = styled.div`
  position: relative;
`;

export const EmojiButtonWrap = styled.button`
  font-size: 40px;    
  background: none; 
  border: none;    
  cursor: pointer;  
  transition: transform 0.2s ease; 
  
  &:hover {
    transform: scale(1.1);  
  }

  &:active {
    transform: scale(0.95); 
  }
`;

export const TooltipModal = styled.div<{ top?: number; left?: number }>`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  // 또는 특정 위치로 고정:
  top: calc(100% + 10px);  // 버튼 아래 10px
  left: 0;
  
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
`;
