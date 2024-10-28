import { IModalProps, Modal } from "../..";
import { UserControlWrap } from "./styled";


interface CountDownModalProps extends IModalProps {
    count: number;
}

export const GameStartCountDownModal = ({
    count,
    ...props
}: CountDownModalProps) => {
    return (
        <Modal {...props} width="130px" height="auto" position="absolute"
            $transform="translate(50, 50)">
            <UserControlWrap {...props}>
                <div>
                    ${count} 카운트 다운 모달입니다.
                </div>
            </UserControlWrap>
        </Modal>
    )
} 