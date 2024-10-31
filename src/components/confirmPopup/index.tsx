"use client"

import {
    Fragment,
    ReactNode,
    createContext,
    useContext,
    useState,
    useCallback,
  } from "react";
import { ConfirmPopupBackdrop, ConfirmPopupBase, ConfirmPopupTitle, ConfirmPopupMessage, ConfirmPopupButtonContainer, ConfirmPopupCloseButton, ConfirmPopupConfirmButton } from "./styled";
  
  interface IConfirmPopupProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;    
    title?: ReactNode;
    message: ReactNode;
    closeButtonText?: ReactNode;
    confirmButtonText?: ReactNode;
    isAlert?: boolean;
  }
  
  const defaultConfirmPopupProps: IConfirmPopupProps = {
    open: false,
    onClose: () => {},
    onConfirm: () => {},
    message: "",
  };
  
  export const ConfirmPopup = ({
    open,
    onClose,
    onConfirm,
    title,
    message,
    closeButtonText = "싫어요",
    confirmButtonText = "좋아요",
    isAlert = false,
  }: IConfirmPopupProps) => {
    return (
      <Fragment>
        <ConfirmPopupBackdrop
          $open={open}
          onClick={isAlert ? onClose : undefined}
        />
        <ConfirmPopupBase $open={open}>
          {title && <ConfirmPopupTitle>{title}</ConfirmPopupTitle>}
          <ConfirmPopupMessage>{message}</ConfirmPopupMessage>
          <ConfirmPopupButtonContainer>
            {!isAlert && (
              <ConfirmPopupCloseButton onClick={onClose}>
                {closeButtonText}
              </ConfirmPopupCloseButton>
            )}
            <ConfirmPopupConfirmButton onClick={onConfirm}>
              {confirmButtonText}
            </ConfirmPopupConfirmButton>
          </ConfirmPopupButtonContainer>
        </ConfirmPopupBase>
      </Fragment>
    );
  };
  
  interface IConfirmPopupContextProps {
    showPopup: (options: Partial<IConfirmPopupProps>) => void;
    hidePopup: () => void;
    popupProps: IConfirmPopupProps;
  }
  
  const ConfirmPopupContext = createContext<
    IConfirmPopupContextProps | undefined
  >(undefined);
  
  export const ConfirmPopupProvider = ({ children }: { children: ReactNode }) => {
    const [popupProps, setPopupProps] = useState<IConfirmPopupProps>(
      defaultConfirmPopupProps
    );
  
    const showPopup = useCallback((options: Partial<IConfirmPopupProps>) => {
      setPopupProps({
        ...defaultConfirmPopupProps,
        ...options,
        open: true,
      });
    }, []);
  
    const hidePopup = useCallback(() => {
      setPopupProps((prevProps) => ({
        ...prevProps,
        open: false,
      }));
    }, []);
  
    return (
      <ConfirmPopupContext.Provider value={{ showPopup, hidePopup, popupProps }}>
        {children}
        <ConfirmPopup {...popupProps} />
      </ConfirmPopupContext.Provider>
    );
  };
  
  export const useConfirmPopup = () => {
    const context = useContext(ConfirmPopupContext);
    if (context === undefined) {
      throw new Error(
        "useConfirmPopup must be used within a ConfirmPopupProvider"
      );
    }
    return context;
  };
  
  export const useAlert = () => {
    const { showPopup, hidePopup } = useConfirmPopup();
    const customAlert = (message: ReactNode) =>
      new Promise((resolve) => {
        showPopup({
          message: message,
          onConfirm: () => {
            hidePopup();
            resolve(true);
          },
          onClose: () => {
            hidePopup();
            resolve(true);
          },
          isAlert: true,
          confirmButtonText: "확인",
        });
      });
  
    return customAlert;
  };
  
  export const useConfirm = () => {
    const { showPopup, hidePopup } = useConfirmPopup();
    const customConfirm = (message: ReactNode) =>
      new Promise<boolean>((resolve) => {
        showPopup({
          message: message,
          onConfirm: () => {
            hidePopup();
            resolve(true);
          },
          onClose: () => {
            hidePopup();
            resolve(false);
          },
          confirmButtonText: "확인",
          closeButtonText: "취소",
        });
      });
  
    return customConfirm;
  };
  