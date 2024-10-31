import styled from "styled-components";

export const ConfirmPopupBackdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  min-width: 100dvw;
  height: 100%;
  min-height: 100dvh;
  background-color: lightgray;
  opacity: 0.8;
  backdrop-filter: blur(12px);
  z-index: 1000;
  display: ${({ $open }) => ($open ? "block" : "none")};
`;

export const ConfirmPopupBase = styled.div<{ $open: boolean }>`
  position: fixed;
  width: fit-content;
  max-width: 328px;
  width: 100%;
  height: auto;
  /* min-height: 196px; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background-color: #fff;
  z-index: 1001;
  padding-top: 28px;
  flex-direction: column;
  gap: 20px;
  display: ${({ $open }) => ($open ? "flex" : "none")};
  justify-content: space-between;
`;

export const ConfirmPopupTitle = styled.h5`
  font-size: 18px;
  font-weight: 500;
  color: #050c16;
  padding: 0px 20px;
`;

export const ConfirmPopupMessage = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  height: 100%;
  flex: 1;
  padding: 0px 20px;
`;

export const ConfirmPopupButtonContainer = styled.div`
  border-top: solid 1px #eaecf0;
  border-radius: 0px 0px 8px 8px;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    padding: 16px;
    &:hover {
      cursor: pointer;
      background-color: #f1f1f1;
    }
  }
`;
export const ConfirmPopupCloseButton = styled.div`
  color: #aaa;
  border-radius: 0px 0px 8px 8px;
  width: 100%;
  flex: 1;
`;
export const ConfirmPopupConfirmButton = styled.div`
  color: #2F69FF;
  border-radius: 0px 0px 8px 8px;
  width: 100%;
  flex: 1;
`;
