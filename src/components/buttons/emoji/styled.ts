import styled from "styled-components";

export const ButtonContainer = styled.div`
  position: relative;
  background: none;  // 배경 명시적으로 제거
  z-index: 1;       // z-index 추가
`;

export const EmojiButtonWrap = styled.button`
  font-size: 40px;    
  background: none; 
  border: none;    
  cursor: pointer;  
  transition: transform 0.2s ease; 
  padding: 0;     // 불필요한 패딩 제거
  margin: 0;      // 불필요한 마진 제거
  
  &:hover {
    transform: scale(1.1);  
  }

  &:active {
    transform: scale(0.95); 
  }
`;