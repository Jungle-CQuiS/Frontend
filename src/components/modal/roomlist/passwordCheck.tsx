import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, IModalProps } from ".."
import { ModalTitle, ModalTitleIcon, ModalTitleWrap } from "../styled"
import { QUIZ_MULTI_ENDPOINTS } from "../../../config/api/endpoints/quiz-multi.endpoints";

interface PasswordCheckModalProps extends IModalProps {
    roomId: any; // room ID
    roomName: any;
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

    const checkRoomPasswordValid = async () => {
        const userToken = localStorage.getItem("AccessToken");
        try {
            const response = await fetch(QUIZ_MULTI_ENDPOINTS.ROOMS.PWCHECK, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // Content-Type 헤더 추가
                    "Authorization": `Bearer ${userToken}`,
                    "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
                },

                body: JSON.stringify({
                    roomId,
                    password
                })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error("비밀번호 확인이 실패했습니다.");
            }

            if (!data.data.isCorrect) {
                throw new Error("비밀번호가 일치하지 않습니다.");
            }

            //로그인 성공시
            if (onDone) onDone();// 모달 닫힘

            // 해당 room으로 이동
            navigate(`/room/${roomId}`, {
                state: {
                    roomId,  // roomId도 state에 포함
                    roomName,
                }
            });

        } catch (error) {
            alert(error);
        }
    }


    const handleSubmit = () => {
        // 입력이 올바른지 확인
        if (!password) {
            alert('비밀번호를 입력해주세요');
            return;
        }

        // TODO: 비밀 번호 인증 로직 구현 해야함.
        checkRoomPasswordValid();
    };

    return (
        <Modal
            onClose={onClose}
            onDone={onDone}
            {...props}
        >
            <ModalTitleWrap>
                <ModalTitleIcon src="/icons/mdi_users_black.svg" alt="Create Room Icon" />
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