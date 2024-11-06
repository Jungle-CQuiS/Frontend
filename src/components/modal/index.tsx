import { Fragment, ReactNode } from "react";
import { ModalBackdrop, ModalBase } from "./styled";

export interface IModalProps {
  open: boolean;
  onClose: () => any;
  onDone?: () => void;
  width?: string;
  height?: string;
  backdrop?: boolean; // 배경 어두움 여부
  backdropcolor?: boolean;
  position?: 'fixed' | 'absolute'; // 새로 추가된 prop
  $top?: number | string;
  $left?: number | string;
  $round?: string;
  $border?: string;
  $transform?: string;
  $padding ?:string;
  selectedQuiz ?: any;
}

export const Modal = ({
  open,
  onClose,
  onDone,
  children,
  width,
  height,
  position = 'fixed',
  backdrop = true, // 기본값은 true
  backdropcolor = true, // true일 경우 gray
  $top,
  $left,
  $round,
  $border,
  $transform,
  $padding,
}: IModalProps & { children: ReactNode }) => {
  return (
    <Fragment>
      {backdrop && (
        <ModalBackdrop $open={open} $backdropcolor = {backdropcolor} onClick={onClose} />
      )}
       <ModalBase
        $open={open}
        $width={width}
        $height={height}
        $position={position}
        $top={$top}
        $left={$left}
        $round = {$round}
        $border = {$border}
        $transform={$transform}
        $padding = {$padding}
      >
        {children}
      </ModalBase>
    </Fragment>
  );
};