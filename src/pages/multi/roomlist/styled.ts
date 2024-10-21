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
    width: 20px;
    height: 20px;
`;

export const MainPageTableTbody = styled.tbody`
    cursor: pointer;
`;