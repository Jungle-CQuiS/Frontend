import { Fragment, ReactNode } from "react";
import { ModalBackdrop, ModalBase } from "./styled";

export interface IModalProps {
  open: boolean;
  onClose: () => any;
  onDone: () => any;
  width?: string;
  height?: string;
  backdrop?: boolean; // 배경 어두움 여부
  backdropcolor?: boolean;
}

export const Modal = ({
  open,
  onClose,
  onDone,
  children,
  width,
  height,
  backdrop = true, // 기본값은 true
  backdropcolor = true,
}: IModalProps & { children: ReactNode }) => {
  return (
    <Fragment>
      {backdrop && (
        <ModalBackdrop $open={open} $backdropcolor = {backdropcolor} onClick={onClose} />
      )}
      <ModalBase $open={open} $width={width} $height={height}>
        {children}
      </ModalBase>
    </Fragment>
  );
};