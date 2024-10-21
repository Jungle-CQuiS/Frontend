import styled from "styled-components";

export const ModalBackdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  min-width: 100dvw;
  height: 100%;
  min-height: 100dvh;
  background-color: darkgray;
  opacity: 0.8;
  backdrop-filter: blur(12px);
  z-index: 900;
  display: ${({ $open }) => ($open ? "block" : "none")};
`;

export const ModalBase = styled.div<{ $open: boolean }>`
  position: fixed;
  width: fit-content;
  min-width: 711px;
  height: auto;
  /* min-height: 196px; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 24px;
  background-color: #fff;
  z-index: 901;
  padding: 40px 56px;
  display: ${({ $open }) => ($open ? "block" : "none")};
`;

export const ModalTitleWrap = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
`;

export const ModalTitleIcon = styled.img`

`;

export const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
`

export const ModalSubTitle = styled.h2`
  font-size: 14px;
  font-weight: 300;
`

