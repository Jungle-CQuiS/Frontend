import styled from 'styled-components';

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