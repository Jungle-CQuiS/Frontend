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