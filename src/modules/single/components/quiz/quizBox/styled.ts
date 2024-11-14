import styled from "styled-components";

export const SingleModeQuizBoxcontainer = styled.div`
    display: flex;
    gap: 30px;
    padding: 59px 52px;
    border-radius: 16px;
    background-color: #fff;
`;

export const SingleModeQuizBoxNumber = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: #969696;
`;

export const SingleModeQuizBoxWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 36px;
`;

export const SingleModeQuizBoxTitleWrap =styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: end;
    gap: 7px;
`

export const SingleModeQuizBoxUsername = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: #969696;
`

export const SingleModeQuizBoxTitle = styled.div`
    font-size: 25px;
    font-weight: 700;
    width: 790px;
`;

export const SingleModeQuizBoxBottom = styled.div`
    display: flex;
    align-items: end;
    justify-content: flex-end;
`;

export const SingleModeQuizBoxBottomSelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const SingleModeQuizBoxBottomSelectWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const SingleModeQuizBoxBottomSelectImg = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

export const SingleModeQuizBoxBottomSelect = styled.div`
    font-size: 20px;
    font-weight: 500;
    width: 600px;
`

export const SingleModeQuizBoxBottomBadWrap = styled.div<{ $hasVoted: boolean}>`
    display: flex;
    gap: 8px;
    padding: 9px 16px;
    align-items: center;
    border: ${({ $hasVoted }) => ($hasVoted ? "1px solid #D3D3D3" : "1px solid #969696")};
    background-color: ${({ $hasVoted }) => ($hasVoted ? "#E7E7E7" : "#fff")};
    border-radius: 80px;
    width: 110px;
    height: fit-content;
    cursor: ${({ $hasVoted }) => ($hasVoted ? "default" : "pointer")};
`;

export const SingleModeQuizBoxBottomBadImg = styled.img`
    width: 24px;
    height: 24px;
`;

export const SingleModeQuizBoxBottomBadText = styled.div<{ $hasVoted: boolean}>`
    font-size: 20px;
    font-weight: 500;
    letter-spacing : -1px;
    color: ${({ $hasVoted}) => ($hasVoted ? "#D3D3D3" : "#969696")};
`;