import styled from "styled-components";

export const FlipCoinBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const FlipCoinScreen = styled.div`
    width: 600px;
    z-index: 1001;
    position: relative;
`;
