import styled from "styled-components";
import { defaultTransition } from "../../../css";

export const MainPageTableTbodyTr = styled.tr`
  &:nth-child(odd) {
    background-color: #F6F8FC;
  }
  &:nth-child(even) {
    background-color: #FFFFFF; 
  }
  &:hover {
      background-color: #E9EBF0; 
    }
  ${defaultTransition}
`;

export const MainPageTableTbodyTd = styled.td`
    padding: 12px 40px;
    font-size: 14px;
    font-weight: 600;
    &:first-child{
        width: 1050px;
        text-align: left;
    }
    &:nth-child(2){
        width: 48px;
        text-align: right;
    }
    &:nth-child(3){
        width: 61px;
        text-align: right;
    }
`;

export const MainPageTableTbodyIcon = styled.img`
    width: 40px;
    height: 40px;
`;

export const MainPageTableTbody = styled.tbody`
    cursor: pointer;
`;

export const MultiRoomWrap = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  ${defaultTransition}
  &:hover{
    transform: scale(1.05);
    box-shadow: 4px 10px 18px rgba(0, 0, 0, 0.25);
  }
`;

export const MultiRoomContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 40px;
  gap: 32px 56px;
  padding: 16px; 
  overflow-y: scroll;
`;


export const MultiRoomName = styled.div`
  font-size: 28px;
  color: #fff;
  font-weight: 600;
  background-color: #395B9A;
  padding: 4px 15px;
  border-radius: 8px;
`;

export const MultiRoomBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MultiRoomUsersWrap = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const MultiRoomUsersIcon = styled.img`
  width: 40px;
  height: 40px;
`;

export const MultiRoomUsersText = styled.div`
  font-size: 28px;
  font-weight: 600;
`;

export const MultiRoomLock = styled.div`
  width: 40px;
`;