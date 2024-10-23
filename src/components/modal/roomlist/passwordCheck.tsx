import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, IModalProps } from ".."
import { ModalTitle, ModalTitleIcon, ModalTitleWrap} from "../styled"

interface PasswordCheckModalProps extends IModalProps{
    roomId : any; // room ID
    roomName : any;
}

export const PasswordCheckModal = ({
    roomId,
    roomName,
    onClose,
    onDone,
    ...props
}: PasswordCheckModalProps) => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!password) {
            alert('비밀번호를 입력해주세요');
            return;
        }

        // todo : 비밀 번호 인증 로직 구현 해야함.
        onDone(); // 모달 닫힘

        // 해당 room으로 이동
        navigate(`/room/${roomId}`, {
            state: {
                roomId,  // roomId도 state에 포함
                roomName
            }
        });
    };
    
    return (
        <Modal 
            onClose={onClose}
            onDone={onDone}
            {...props}
        >
            <ModalTitleWrap>
                <ModalTitleIcon src="/icons/mdi_users_black.svg" alt="Create Room Icon"/>
                <ModalTitle>비밀번호 확인</ModalTitle>
            </ModalTitleWrap>
            <div>
                <button onClick={onClose}>X</button>
                <input 
                    type="password" 
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSubmit}>확인</button>
            </div>
        </Modal>
    );
};