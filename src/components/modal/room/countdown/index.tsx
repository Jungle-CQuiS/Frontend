import { useEffect } from "react";
import { IModalProps, Modal } from "../..";
import { UserControlWrap } from "./styled";

interface CountDownModalProps extends IModalProps {
    count: number;
    backdrop: true;
    children?: any;
    handleStopReady: (roomUserId: string) => any;
}

export const GameStartCountDownModal = ({
    count,
    handleStopReady,
    ...props
}: CountDownModalProps) => {
    const roomUserId = localStorage.getItem("roomUserId");
    useEffect(() => {
        const handleLock = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
            }
        };
        document.addEventListener("keydown", handleLock);
        return () => {
            document.removeEventListener("keydown", handleLock);
        }
    }, []);

    const stopReadyHandler = async() => {
        if (roomUserId !== null) {
            await handleStopReady(roomUserId);
        }
        // TODO: 모달 창 닫히도록 추가
        if(props.onClose){
            props.onClose();
        }
    }

    return (
        <Modal
            {...props}
            width="250px"
            height="auto"
            position="absolute"
            $transform="translate(-50%, -200%)">
            <UserControlWrap {...props}>
                <div>
                    게임 시작까지 {count} 초 남았습니다!
                </div>
                <button onClick={stopReadyHandler}>취소하기</button>
            </UserControlWrap>
        </Modal>
    )
} 