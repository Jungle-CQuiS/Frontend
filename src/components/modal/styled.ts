import styled from "styled-components";

export const ModalBackdrop = styled.div<{ $open: boolean ; $backdropcolor :boolean}>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  min-width: 100dvw;
  height: 100%;
  min-height: 100dvh;
  background-color: ${({ $backdropcolor }) => ($backdropcolor ? "darkgray" : "transparent")};
  opacity: 0.8;
  backdrop-filter: ${({ $backdropcolor }) => ($backdropcolor ? "blur(12px)" : "none")};
  z-index: 900;
  display: ${({ $open }) => ($open ? "block" : "none")};
`;

export const ModalBase = styled.div<{ 
  $open: boolean; 
  $width?: string; 
  $height?: string ;
  $position?: 'fixed' | 'absolute';
  $top?: number | string;
  $left?: number | string;
  $round ?:string;
  $border ?: string;
  $transform?: string;
  $padding?: string;  
  }>`
  position:  ${({ $position }) => $position || 'fixed'};
  width: ${({ $width }) => $width || 'fit-content'};
  min-width: ${({ $width }) => $width || '711px'};
  height: ${({ $height }) => $height || 'auto'};
  /* min-height: 196px; */
  top: ${({ $top }) => 
    typeof $top === 'number' 
      ? `${$top}px`   
      : $top ?? '50%'
  };
  left: ${({ $left }) => 
    typeof $left === 'number' 
      ? `${$left}px` 
      : $left ?? '50%'
  };
  transform: ${({ $transform }) => $transform || 'translate(-50%, -50%)'};
  border: ${({$border}) => $border || 'none'};
  border-radius: ${({$round}) => $round || '24px'};
  background-color: #fff;
  z-index: 901;
  padding: ${({ $padding }) => $padding || '40px 56px'};
  display: ${({ $open }) => ($open ? 'block' : 'none')};
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

