import { useEffect } from "react";
import { IModalProps, Modal } from "../..";
import { UserControlWrap } from "./styled";
import { PrimaryButtonMedium } from "../../../buttons/styled";

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
    const uuid = localStorage.getItem("uuid");

    const stopReadyHandler = async () => {
        if (uuid !== null) {
            await handleStopReady(uuid);
        }
        // TODO: 모달 창 닫히도록 추가
        if (props.onClose) {
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
                <PrimaryButtonMedium onClick={stopReadyHandler}>취소하기</PrimaryButtonMedium>
            </UserControlWrap>
        </Modal>
    )
} 