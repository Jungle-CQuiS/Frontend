import styled from "styled-components";

export const SolvingHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 36px;
`;

export const TeamOneHealthBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const TeamOneHealthBarTop = styled.div`
    display: flex;
`;

export const TeamOneHealthBarTopBackground = styled.div`
    width: 300px;
    height: 41px;
    background-color: #2F69FF;
    opacity: 50%;
`;

export const TeamOneHealthBarTopTitle = styled.div`
    font-size: 17px;
    font-weight: 500;
    color: #fff;
    background-color: #2F69FF;
    padding: 7px 9px;
`;

export const TeamOneHealthBarWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 11px;
    align-items: center;
`;

export const TeamOneHealthBarText = styled.div`
    font-size: 17px;
    font-weight: 500;
`;

export const SolvingHeaderTitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

export const SolvingHeaderTitle = styled.div`
    font-size: 26px;
    font-weight: 700;
`;

export const SolvingTimerWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const SolvingTimer = styled.div`
    color: #DB4453;
    font-size: 16px;
    font-weight: 600;
    padding-left: 8px;
`;

export const SolvingTimerText = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

export const TeamTwoHealthBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const TeamTwoHealthBarTop = styled.div`
    display: flex;
`;

export const TeamTwoHealthBarTopBackground = styled.div`
    width: 300px;
    height: 41px;
    background-color: #EE5567;
    opacity: 50%;
`;

export const TeamTwoHealthBarTopTitle = styled.div`
    font-size: 17px;
    font-weight: 500;
    color: #fff;
    background-color: #EE5567;
    padding: 7px 9px;
`;

export const TeamTwoHealthBarWrap = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 11px;
    align-items: center;
`;

export const TeamTwoHealthBarText = styled.div`
   font-size: 17px;
   font-weight: 500;
`;

export const HealthBarUnit = styled.div<{ active: boolean; team: number }>`
  width: 22px;
  height: 35px;
  background-color: ${({ active, team }) => {
    if (team === 1) return active ? "#97B4FF" : "#FFF";
    if (team === 2) return active ? "#F7AAB3" : "#FFF";
  }};
  margin: 0 2px;
  display: inline-block;
  border-radius: 3px;
  transform: skewX(-20deg);
`;
