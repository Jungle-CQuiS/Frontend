import styled, { keyframes } from 'styled-components';


export const floatAndFade = keyframes`
    0% {
        transform: translate(0, 0);
        opacity: 1;
    }
    100% {
        transform: translate(0, -100px);
        opacity: 0;
    }
`;

export const AnimatedImage = styled.img<{ $startX: number; $startY: number }>`
    position: fixed;
    left: ${props => props.$startX}px;
    top: ${props => props.$startY}px;
    width: 100px;
    height: 100px;
    animation: ${floatAndFade} 1s ease-out forwards;
    pointer-events: none;
    z-index: 9999;
`;
