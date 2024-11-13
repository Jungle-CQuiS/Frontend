import styled from "styled-components";

export const SingleResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const SingleResultWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  padding-bottom: 50px;
`;

export const SingleResultTitle = styled.div`
  font-size: 26px;
  font-weight: 700;
`;

export const SingleResultBox = styled.div`
  padding: 40px 72px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 두 열로 설정 */
  gap: 24px 40px; /* 카드 사이 간격 */
`;

export const SingleResultBoxRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SingleResultBoxRowLabel = styled.div`
  font-size: 20px;
  color: #969696;
  font-weight: 600;
`;

export const SingleResultBoxBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const SingleResultBoxBarTextWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SingleResultBoxBarText = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #969696;
`;

export const SingleResultBoxBarWrap = styled.div`
  width: 422px;
  height: 25px;
  background-color: #E7E7E7;
  overflow: hidden;
  border-radius: 5px;
`;

export const SingleResultBoxBar = styled.div`
  height: 100%;
  background-color: #2F69FF;
  transition: width 0.3s ease;
`;

export const SingelResultButtonWrap = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
