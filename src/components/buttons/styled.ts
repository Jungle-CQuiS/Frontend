import styled from "styled-components";
import { defaultTransition } from "../../css";

export const ButtonBase = styled.button`
  font-size: 20px;
  font-weight: 500;
  width: fit-content;
  border-radius: 4px;
  cursor: pointer;
  &.active {
    color: #fff;
    background-color: #395B9A;
  }

  border: 0px;
  ${defaultTransition}
  &:disabled, &.disabled {
    cursor: default;
    opacity: 0.4;
  }
`;

export const SecondaryButton = styled(ButtonBase)`
  color: #395B9A;
  background-color: #fff;
  padding: 8px 24px;
  border: 1px solid #E7E7E7;
  &:hover {
    background-color: #F6F6F6;
  }
`;

export const LandingPageTooltipContainer = styled.div`
  .tooltip-custom {
    background-color: #333;
    color: #fff;
    font-size: 24px;
    border-radius: 6px;
    gap: 15px;
    padding: 25px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 333px; /* 너비 제한 */
    z-index: 1000; /* z-index로 nav 위로 올리기 */
    white-space: pre-line;
    line-height: 2.5;
  }

  .tooltip-custom:after {
    border-top-color: #333;
  }
`

export const LandingPageAddProblemHeaderImg = styled.img`
  width: 30px;
  height: 30px;
`

export const PrimaryButtonLarge = styled(ButtonBase)`
  color: #fff;
  background-color: #395B9A;
  padding: 12px 24px;
  &:hover {
    background-color: #5384FF;
  }
`;

export const PrimaryButtonMedium = styled(ButtonBase)`
  color: #fff;
  background-color: #395B9A;
  padding: 8px 24px;
  &:hover {
    background-color: #5384FF;
  }
`;

export const PrimaryButtonSmall = styled(ButtonBase)`
  color: #fff;
  font-size: 14px;
  background-color: #395B9A;
  padding: 6px 24px;
  &:hover {
    background-color: #5384FF;
  }
`;

export const PrimaryButtonLong = styled(ButtonBase)`
  color: #fff;
  background-color: #395B9A;
  padding: 8px 24px;
  width: 320px;
  &:hover {
    background-color: #5384FF;
  }
`;

export const PrimaryButtonMiddle = styled(ButtonBase)`
  color: #fff;
  font-size: 20px;
  background-color: #395B9A;
  padding: 12px 24px;
  width: 232px;
  &:hover {
    background-color: #5384FF;
  }
`;

export const PrimaryButtonShort = styled(ButtonBase)`
  color: #fff;
  font-size: 14px;
  background-color: #395B9A;
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
  font-size: 24px;
  background-color: #DB4453;
  padding: 8px 20px;
  &:hover {
    background-color: #EC6B78;
  }
`;

export const BlackButtonSmall = styled(ButtonBase)`
  color: #fff;
  font-size: 24px;
  background-color: #444;
  padding: 8px 24px;
  &:hover {
    background-color: #969696;
  }
`;



