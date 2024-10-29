import { useEffect } from "react";
import { IModalProps, Modal } from "../..";
import { UserControlWrap } from "./styled";


interface CountDownModalProps extends IModalProps {
    count: number;
    backdrop: true;
    children?: any;
}

export const GameStartCountDownModal = ({
    count,
    onClose,
    ...props
}: CountDownModalProps) => {
    useEffect(() =>{
      const handleLock = (event: KeyboardEvent) => {
        if(event.key === "Escape"){
            event.preventDefault();
        }
      };
      document.addEventListener("keydown", handleLock);
      return()=> {
        document.addEventListener("keydown", handleLock);
      }  
    }, []);
    
    return (
        <Modal 
        {...props}
        onClose={() => {}}
        width="130px" 
        height="auto" 
        position="absolute"
        $transform="translate(50, 50)">
            <UserControlWrap {...props}>
                <div>
                    ${count} 카운트 다운 모달.
                </div>
            </UserControlWrap>
        </Modal>
    )
} 