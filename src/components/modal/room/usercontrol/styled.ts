import styled from "styled-components";
import { SecondaryButtonShort } from "../../../buttons/styled";

export const UserControlWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
`;

export const UserControlBtn = styled(SecondaryButtonShort)`
  width: 130px;
`;