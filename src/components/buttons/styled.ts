import styled from "styled-components";
import { defaultTransition } from "../../css";

export const ButtonBase = styled.button`
  font-size: 16px;
  font-weight: 500;
  width: fit-content;
  border-radius: 4px;
  cursor: pointer;
  &.active {
    color: #fff;
    background-color: #ff7344;
  }

  border: 0px;
  ${defaultTransition}
  &:disabled, &.disabled {
    cursor: default;
    opacity: 0.4;
  }
`;

export const SecondaryButton = styled(ButtonBase)`
  color: #2F69FF;
  background-color: #fff;
  padding: 8px 24px;
  border: 1px solid #E7E7E7;
  &:hover {
    background-color: #F6F6F6;
  }
`;

export const PrimaryButtonLarge = styled(ButtonBase)`
  color: #fff;
  background-color: #2F69FF;
  padding: 12px 24px;
  &:hover {
    background-color: #5384FF;
  }
`;

export const PrimaryButtonMedium = styled(ButtonBase)`
  color: #fff;
  background-color: #2F69FF;
  padding: 8px 24px;
  &:hover {
    background-color: #5384FF;
  }
`;

export const PrimaryButtonSmall = styled(ButtonBase)`
  color: #fff;
  font-size: 14px;
  background-color: #2F69FF;
  padding: 6px 24px;
  &:hover {
    background-color: #5384FF;
  }
`;

export const PrimaryButtonLong = styled(ButtonBase)`
  color: #fff;
  background-color: #2F69FF;
  padding: 8px 24px;
  width: 320px;
  &:hover {
    background-color: #5384FF;
  }
`;

export const PrimaryButtonMiddle = styled(ButtonBase)`
  color: #fff;
  font-size: 20px;
  background-color: #2F69FF;
  padding: 12px 24px;
  width: 232px;
  &:hover {
    background-color: #5384FF;
  }
`;

export const PrimaryButtonShort = styled(ButtonBase)`
  color: #fff;
  font-size: 14px;
  background-color: #2F69FF;
  padding: 12px 20px;
  width: 87px;
  &:hover {
    background-color: #5384FF;
  }
`;

export const SecondaryButtonShort = styled(ButtonBase)`
  color: #fff;
  font-size: 14px;
  background-color: #DB4453;
  padding: 12px 20px;
  width: 87px;
  &:hover {
    background-color: #EC6B78;
  }
`;


export const SecondaryButtonSmall = styled(ButtonBase)`
  color: #fff;
  font-size: 16px;
  background-color: #DB4453;
  padding: 8px 20px;
  width: 87px;
  &:hover {
    background-color: #EC6B78;
  }
`;

export const BlackButtonSmall = styled(ButtonBase)`
  color: #fff;
  font-size: 16px;
  background-color: #444;
  padding: 8px 24px;
  &:hover {
    background-color: #969696;
  }
`;



