import styled from "styled-components";

export const RoomTitle = styled.div`
    padding: 8px 72px;
    background-color: rgba(150, 150, 150, 0.5);
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
`;

export const RoomTeamContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    margin-top: 100px;
`;

export const RoomTeamOne = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: end;
`

export const RoomTeamOneTitleWrap = styled.div`
    display: flex;
`;

export const RoomTeamOneTitleBackground = styled.div`
    width: 525px;
    height: 101px;
    background-color: #D3D3D3;
    opacity: 50%;
`;

export const RoomTeamOneTitle = styled.div`
    color: #fff;
    background-color: rgba(47, 105, 255,0.5);
    width: 105px;
    font-size: 22px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const RoomTeamOneUserWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const RoomTeamOneUser = styled.div`
    display: flex;
`;

export const RoomTeamOneUserName = styled.div`
    position: relative;
    width: 360px;
    height: 60px;
    padding: 0px 37px;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #002B99 0%, #0048FF 35%);
        opacity: 0.75;
        z-index: -1;
    }
`;



export const RoomTeamOneUserProfile = styled.img`
    width: 60px;
    height: 60px;
`;

export const RoomTeamOneUserHonorWrap = styled.div`
    padding: 4px 0px;
    width: 57px;
    background-color: rgba(47, 105, 255,0.75);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const RoomTeamOneUserHonor = styled.div`
    font-size: 14px;
    color: #fff;
    font-weight: 600;
`;

export const RoomTeamOneUserHonorIcon = styled.img`

`;

export const RoomTeamOnebackground = styled.div`
    width: 5px;
    height: 60px;
    background-color: #2F69FF;
`;

//##########team two#############

export const RoomTeamTwo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: left;
`

export const RoomTeamTwoTitleWrap = styled.div`
    display: flex;
`;

export const RoomTeamTwoTitleBackground = styled.div`
    width: 525px;
    height: 101px;
    background-color: #D3D3D3;
    opacity: 50%;
`;

export const RoomTeamTwoTitle = styled.div`
    color: #fff;
    background-color: rgba(238, 85, 103,0.5);
    width: 105px;
    font-size: 22px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const RoomTeamTwoUserWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const RoomTeamTwoUser = styled.div`
    display: flex;
`;

export const RoomTeamTwoUserName = styled.div`
    position: relative;
    width: 360px;
    height: 60px;
    padding: 0px 37px;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 1;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #EA001C 35%, #840010 85%);
        opacity: 0.75;
        z-index: -1;
    }
`;



export const RoomTeamTwoUserProfile = styled.img`
    width: 60px;
    height: 60px;
`;

export const RoomTeamTwoUserHonorWrap = styled.div`
    padding: 4px 0px;
    width: 57px;
    background-color: rgba(240, 64, 84,0.75);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const RoomTeamTwoUserHonor = styled.div`
    font-size: 14px;
    color: #fff;
    font-weight: 600;
`;

export const RoomTeamTwoUserHonorIcon = styled.img`

`;

export const RoomTeamTwobackground = styled.div`
    width: 5px;
    height: 60px;
    background-color: #EE5567;
`;

export const RoomTeamEmpty = styled.div`
    position: relative;
    width: 420px;
    height: 60px;
    padding: 0px 37px;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(211, 211, 211, 0.75);
        opacity: 0.75;
        z-index: -1;
    }
`;

export const RoomButtonWrap = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 90px;
`;