import exp from "constants";
import styled from "styled-components";

export const UserTagsContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: center;
    overflow: visible;  // overflow 제한 제거
`;

export const UserTag = styled.div<{ teamId: number }>`
    position: relative;
    background: ${({ teamId }) => (teamId === 1 ? "linear-gradient(90deg, #2f69ff 2%, #2f69ff 60%, #2952bc 100%)" : "linear-gradient(90deg, #EE5567 2%, #EE5567 60%, #A82D3B 100%)")};
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    padding: 16px 16px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
`;

export const UserTagImg = styled.img`
    width: 19px;
    height: 25px;
`;

export const EmojiButtonWrapper = styled.div`
     position: relative;
    z-index: 1;
    display: inline-block;
`;

export const CooldownMessage = styled.div`
   font-size: 14px;
    z-index: 9999;  // 추가
   background-color: #333;  // 임시로 변경
   color: white;
   padding: 8px 12px;
   border-radius: 8px;
   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
   position: absolute;
   left: 50%;
   transform: translateX(-50%);
   bottom: -40px;  // 버튼 아래로 위치 조정
   
   // 말풍선 화살표를 위로 변경
   &:before {
       content: '';
       position: absolute;
       top: -6px;
       left: 50%;
       transform: translateX(-50%);
       width: 0;
       height: 0;
       border-left: 6px solid transparent;
       border-right: 6px solid transparent;
       border-bottom: 6px solid #333;  // 배경색과 맞춤
   }

   animation: popIn 0.3s ease-out;

   @keyframes popIn {
       0% {
           opacity: 0;
           transform: translateX(-50%) scale(0.8);
       }
       100% {
           opacity: 1;
           transform: translateX(-50%) scale(1);
       }
   }
`;