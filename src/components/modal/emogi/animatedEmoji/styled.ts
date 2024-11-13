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
    position: absolute;  // fixed -> absolute로 변경
    left: ${props => props.$startX}px;
    top: ${props => props.$startY}px;
    width: 100px;
    height: 100px;
    animation: ${floatAndFade} 1s ease-out forwards;
    pointer-events: none;
    z-index: 9999;
`;

export const StyledAnimatedEmoji = styled.img<{ $startX: number; $startY: number }>`
    position: absolute;
    left: ${props => props.$startX}px;
    top: ${props => props.$startY}px;
    width: 100px;
    height: 100px;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 9999;
    animation: floatUp 1s ease-out forwards;

    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50px) scale(1.5);
        }
    }
`;