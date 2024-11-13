// styled.ts
import styled from "styled-components";

export const AddProblemContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 80px;
`;

export const AddProblemHeader = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
`;

export const AddProblemHeaderImg = styled.img`
    width: 30px;
    height: 30px;
`;

export const TooltipContainer = styled.div`
    .tooltip-custom {
        background-color: #333;
        color: #fff;
        font-size: 17px;
        border-radius: 6px;
        gap: 15px;
        padding: 25px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        text-align: center;
        max-width: 333px; /* 너비 제한 */
        z-index: 1000; /* z-index로 nav 위로 올리기 */
        white-space: pre-line;
        line-height: 2.5;
    }

    .tooltip-custom:after {
        border-top-color: #333;
    }
`;

export const AddProblemHeaderTitle = styled.div`
    font-size: 32px;
    font-weight: 600;
`;

export const AddProblemWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

export const AddProblemCategoryWrap = styled.div`
    display: flex;
    gap: 20px;
`;

export const AddProblemLabel = styled.label`
    font-size: 20px;
    font-weight: 600;
`;

export const AddProblemTab = styled.div<{ isSelected?: boolean }>`
    padding: 8px 19px;
    border: ${({ isSelected }) => (isSelected ? "none" : "1px solid #969696")};
    color: ${({ isSelected }) => (isSelected ? "#FFF" : "#969696")};
    font-size: 16px;
    font-weight: 500;
    border-radius: 4px;
    background-color: ${({ isSelected }) => (isSelected ? "#395B9A" : "#FFF")};
    cursor: pointer;
`;

export const AddProblemInputLong = styled.textarea`
    padding: 15px 15px;   
    font-size: 18px;
    font-weight: 500;
    border: 1px solid #D3D3D3;
    width: 850px;
    height: 200px;
    border-radius: 8px;
    &::placeholder{
        color: #969696;
    }
`;

export const AddProblemInput = styled.input`
    padding: 10px 14px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #D3D3D3;
    width: 854px;
    border-radius: 8px;
    &::placeholder{
        color: #D3D3D3;
    }
`;

export const AddProblemSelectRow = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

export const AddProblemSelectImg = styled.img`
    width: 24px;
    height: 24px;
`;

export const AddProblemButtonWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: flex-end;
`;

export const CreateQuizNumber = styled.input`
    padding: 10px 4px 10px 14px;
    border: 1px solid #D3D3D3;
    font-size: 12px;
    border-radius: 8px;
    &:hover {
        box-shadow: 0 0px 10px #e6e8f6, 0 5px 5px #e6e8f6;
    }
    &:focus {
        border: 1px solid #2F69FF;
    }
    &::placeholder {
        color: #D3D3D3;
    }
`;

export const CreateQuestion = styled.div`
    padding-top: 150px;
    font-size: 30px;
    font-weight: 800;
    color: #fff;
`;

export const LoadingQuestionContainer = styled.div`
    position: fixed; // 화면에 고정
  top: 0;
  left: 0;
  width: 100%; // 전체 화면 너비
  height: 100vh; // 전체 화면 높이
  display: flex;
  justify-content: center; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 9999; // 다른 요소들 위에 표시

  // 로티 애니메이션이 들어갈 div 스타일링
  div {
    width: 300px; // 원하는 애니메이션 크기
    max-width: 90%; // 모바일 대응
  }
`;