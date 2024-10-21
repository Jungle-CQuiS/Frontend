import { Fragment, ReactNode } from "react";
import { ModalBackdrop, ModalBase } from "./styled";

export interface IModalProps {
  open: boolean;
  onClose: () => any;
  onDone: () => any;
}

export const Modal = ({
  open,
  onClose,
  onDone,
  children,
}: IModalProps & { children: ReactNode }) => {
  return (
    <Fragment>
      <ModalBackdrop $open={open} onClick={onClose} />
      <ModalBase $open={open}>{children}</ModalBase>
    </Fragment>
  );
};
