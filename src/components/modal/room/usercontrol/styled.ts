import styled from "styled-components";
import { ButtonBase } from "../../../buttons/styled";

export const UserControlWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const UserControlBtn = styled(ButtonBase)`
  width: 130px;
  background-color: #fff;
  padding : 10px;
  &:hover {
    background-color:  #2F69FE;
    color : #fff;
  }
`;

export const UserControlKickBtn = styled(ButtonBase)`
  width: 130px;
  background-color: #fff;
  padding : 10px;
  color : #DB4453;
  &:hover {
    background-color:  #2F69FE;
  }
`;