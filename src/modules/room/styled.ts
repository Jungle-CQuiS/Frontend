import styled from "styled-components";

export const RoomListLoadingScreenContainer = styled.div`
  width: 125%;  // 테이블 너비에 맞춤
  height: 600px;  // 적절한 높이 설정
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;  // 배경색 제거

  div {
    width: 400px;  // 애니메이션 크기 조절
    max-width: 90%;
  }
`;