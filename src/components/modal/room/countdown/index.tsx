import { useEffect } from "react";
import { IModalProps, Modal } from "../..";
import { UserControlWrap } from "./styled";
import { socketEvents } from "../../../../hook/socketEvent";
import { UseWebSocket } from "../../../../hook/useWebSocket";


interface CountDownModalProps extends IModalProps {
    count: number;
    backdrop: true;
    children?: any;
    handleStopReady?: any;
}

export const GameStartCountDownModal = ({
    count,
    handleStopReady,
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
        width="250px" 
        height="auto" 
        position="absolute"
        $transform="translate(-50%, -200%)">
            <UserControlWrap {...props}>
                <div>
                    {count} 초 남았습니다
                </div>
                <button onClick={handleStopReady}>취소하기</button>
            </UserControlWrap>
        </Modal>
    )
} 