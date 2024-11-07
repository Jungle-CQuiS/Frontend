import styled from "styled-components";
import { defaultTransition } from "../../../css";

export const MultiResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 88px;
`;

export const MultiResultHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

export const MultiResultHeaderTag = styled.div<{teamId: number}>`
    background-color: ${({ teamId }) => (teamId === 1 ? '#2F69FF' : '#EE5567')};
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    padding: 6px 32px;
    border-radius: 8px;
    text-align: center;
`;

export const MultiResultHeaderText = styled.div`
    font-size: 26px;
    font-weight: 700;
`;

export const MultiResultCardContainer = styled.div`
    max-width: 256px;
    max-height: 391px;
    display: flex;
    gap: 16px;
    justify-content: center;
`;

export const MultiResultCardWrap = styled.div<{ isSelected: boolean; isVoted: boolean }>`
  background: linear-gradient(360deg, rgba(193, 17, 38, 0.5) 0%, #ee5567 100%);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgba(238, 85, 103, 0.75);
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 6px 8px rgba(238, 85, 103, 0.75);
  cursor: pointer;

  &:hover {
    ${({ isSelected, isVoted }) =>
      !isSelected && !isVoted &&
      `
      transform: scale(1.05);
      box-shadow: 4px 10px 18px rgba(238, 85, 103, 0.75);
    `}
  }

  ${({ isSelected, isVoted }) =>
    isSelected && isVoted && `
    transform: scale(1.05);
    box-shadow: 4px 10px 18px rgba(238, 85, 103, 0.75);
  `}
`;

export const MultiResultCard = styled.div`
    border-radius: 8px;
    border: 2px solid #fff;
    display: flex;
    flex-direction: column;
    padding: 24px;
`;

export const MultiResultCardProfileWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    margin-top: 36px;
`;

export const MultiResultCardProfileImg = styled.img`
    width: 96px;
    height: 96px;
    border: 1px solid #fff;
`;

export const MultiResultCardProfileNameWrap = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

export const MultiResultCardProfileBadge = styled.img`
    width: 17px;
    height: 22px;
`;

export const MultiResultCardProfileName = styled.div`
    color: #fff;
    font-size: 22px;
    font-weight: 600;
    width: 115px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
`;

export const MultiResultCardBottom = styled.div`
    display: flex;
    height: 33px;
    margin-top: 90px;
    align-items: center;
    justify-content: center;
    width: 170px;
`;

export const MultiResultCardBottomSelected = styled.img`
    width: 40px;
    height: 40px;
`;

export const MultiResultCardBottomVoteWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const MultiResultCardBottomVoteImg = styled.img`
    width: 16px;
    height: 16px;
`;

export const MultiResultCardBottomVoteNumber = styled.div`
    color: #fff;
    font-size: 16px;
    font-weight: 600;
`;

export const MultiResultButtonWrap = styled.div`
    display: flex;
    gap: 27px;
`;