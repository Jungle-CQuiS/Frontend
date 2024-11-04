import styled from "styled-components";

export const CreateQuistionModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const CreateQuistionModalTitle = styled.div`
    font-size: 18px;
    font-weight: 700;
    display: flex;
    justify-content: center;
`;

export const CreateQuizContainer = styled.div`
    display: flex;
    max-height: 400px;
    border: 1px solid #D3D3D3;
`

export const CreateQuizWrap = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #D3D3D3;
    border-radius: 0px 16px 16px 16px;
    padding: 0px 40px 0px 40px;
    align-items: center;
    overflow-y: scroll;
    background-color: #fff;
    align-items: flex-start;
    width: 800px;
`;

export const CreateQuiz = styled.div`
    display: flex;
    align-items: start;
    gap: 36px;
    border-bottom: 1px solid #D3D3D3;
    padding: 56px 0px 56px 0px;
    &:nth-child(2){
        border: none;
    }
    width: 100%;
`;

export const CreateQuizCheckbox = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

export const CreateQuistionModalButtonWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 15px;
`;