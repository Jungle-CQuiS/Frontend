import { IModalProps, Modal } from "../..";

export const GameStartCountDownModal = ({
    ...props
}: IModalProps) => {
    return (
        <Modal {...props}>
            <div>
            카운트 다운 모달입니다.
            </div>
        </Modal>
    )
} 