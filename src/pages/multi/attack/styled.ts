import styled from "styled-components";

export const MultiGameHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    font-weight: bold;
`;

export const MultiGameTeam = styled.div`
    text-align: center;    
    padding: 6px 13px;
    margin: 0 55px;
    background-color: #2F69FF;
    color: #FFF;
    border-radius: 8px;
    font-size: 18px;
`;

export const MultiGameTitle = styled.div`
    text-align: center;
    margin-top: 30px;
    font-size: 24px;
`;

export const MultiGameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const MultiTimeLeft = styled.div`
    text-align: right;
    height: 32px;    
    width: 100%;
    text-align: right;
    font-size: 13px;
    font-weight: bold;
    color: #000;
    margin-bottom: 20px;
    padding-right: 200px;
`;

export const MultiCenterBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 90%;
    justify-content: space-between;
    gap: 20px;
`

export const MultiGameInventory = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    gap: 10px;
`

export const MultiQuestionBox = styled.div`
    width: 70%;
    display: flex;
    gap: 15px;
    padding: 20px;
    flex-direction: column;   
    float:right;
    border: 1px solid #ddd;
`;

export const MultiGameQuestionCheckbox = styled.img`
    width: 16px;
    height: 16px;
    -webkit-user-drag: none;
    cursor: pointer;
`;

export const MultiGameChoice = styled.div`
    align-items: center;
    display: flex;
    width: 100%;
    gap: 20px;
    padding: 20px;
    justify-content: space-evenly;
`;

export const MultiGameFooter = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 15px;
    padding: 20px;
`;

export const MultiGameButton = styled.div`
    padding: 10px 20px;
    background-color: #2F69FF;
    color: white;
    border-radius: 10px;
    font-size: 16px;
    text-align: center;
`;