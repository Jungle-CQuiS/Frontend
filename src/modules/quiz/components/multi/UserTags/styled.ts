import styled from "styled-components";

export const UserTagsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: center;
`;

export const UserTag = styled.div<{ teamId: number }>`
    background: ${({ teamId }) => (teamId ===1 ? "linear-gradient(90deg, #2f69ff 2%, #2f69ff 60%, #2952bc 100%)" : "linear-gradient(90deg, #EE5567 2%, #EE5567 60%, #A82D3B 100%)")};
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    padding: 16px 16px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;  // 이모티콘 위치 기준점
`;

export const UserTagImg = styled.img`
    width: 19px;
    height: 25px;
`;

export const UserEmoji = styled.img`
  position: absolute;
  top: -20px;  // 태그 위에 위치
  right: 0;
  width: 24px;
  height: 24px;
`;
