import styled from "styled-components";

export const AnswerSelectContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 36px;
    margin-left: 320px;
`;

export const AnswerSelectWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const AnswerSelectRow = styled.div`
    display: flex;
    gap: 24px;
    align-items: center;
`;

export const AnswerSelectCheckbox = styled.img`
    width: 24px;
    height: 24px;
    -webkit-user-drag: none;
    cursor: pointer;
`;

export const AnswerSelectText = styled.div`
    font-size: 16px;
    font-weight: 600;
    max-width: 880px;
`;

export const ScreenSharedBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 15px solid #444444;
  pointer-events: none;  // 클릭 이벤트가 뒤 요소로 전달되도록
  z-index: 1;           // 다른 요소들 위에 표시되도록
  height: 100vh;
`;

export const ScreenSharedText = styled.div`
    position: absolute;
    top: 20px;  // 위쪽에서의 간격
    left: 50%;  // 왼쪽에서 50% 위치
    transform: translateX(-50%);  // 텍스트 자체의 50%만큼 왼쪽으로 이동하여 중앙 정렬
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 30px;
    font-weight: 600;
    background-color: grey; 
    padding: 5px 10px;      
    
    // 깜빡임 애니메이션
    animation: blink 1.5s infinite;
    
    @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
    }
`;

export const SelectText = styled.div`
    font-size: 26px;
    font-weight: 600;
`;

export const SelectBox = styled.div`
    padding: 15px 48px;
    background-color: #fff;
    border-radius: 24px;
`;

export const SelectContainer = styled.div`

`;