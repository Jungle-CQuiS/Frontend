import styled from "styled-components";

export const LoadingScreenContainer = styled.div`
  position: fixed; // 화면에 고정
  top: 0;
  left: 0;
  width: 100%; // 전체 화면 너비
  height: 100vh; // 전체 화면 높이
  display: flex;
  justify-content: center; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬
  background-color: rgba(255, 255, 255, 0.9); // 배경색 (선택사항)
  z-index: 9999; // 다른 요소들 위에 표시

  // 로티 애니메이션이 들어갈 div 스타일링
  div {
    width: 300px; // 원하는 애니메이션 크기
    max-width: 90%; // 모바일 대응
  }
`;
