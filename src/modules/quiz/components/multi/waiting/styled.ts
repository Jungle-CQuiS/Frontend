import styled from "styled-components";

export const WaitingScreenContainer = styled.div`
    width: 800px;
    background-color: transparent;

    svg path {
        fill: none; /* svg 배경을 투명하게 설정 */
    }
`;

export const WaitingScreenButtonWrap = styled.div`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-right: 100px;
`