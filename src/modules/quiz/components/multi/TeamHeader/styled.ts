import styled from "styled-components";

export const TeamHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
`;

export const TeamHeaderTag = styled.div<{ teamId: number}>`
    background-color: ${({ teamId }) => (teamId === 1 ? '#2F69FF' : '#EE5567')};
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    padding: 6px 32px;
    border-radius: 8px;
    text-align: center;
`;

export const TeamHeaderTitle = styled.div`
    font-size: 26px;
    font-weight: 700;
`;