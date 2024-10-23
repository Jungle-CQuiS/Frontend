import styled from 'styled-components';

export const ReadyText = styled.div<{
    $align ?: string;
  }>`
  position: absolute;
  left: ${({$align}) => $align === 'left' ? '0px' : 'none'};       
  right : ${({$align}) => $align === 'right' ? '0px' : 'none'};
  top: 50%;          // 세로 중앙 정렬
  transform: translateY(-50%);  // 정확한 세로 중앙 정렬
  text-align: ${({$align}) => $align === 'right' ? 'right' : 'left'};
  font-style: italic;
  font-weight: 900;
  font-size: 30px;
  background:  ${({$align}) => $align === 'left' ? 'linear-gradient(to right, #4061B5, #FFFF)' : 'linear-gradient(to left, #A82D3B, #FFFF)'}; 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding : 10px;
  flex-shrink: 0;      // 크기 유지
  width: fit-content; // 내용물 만큼만 너비 차지
`;
