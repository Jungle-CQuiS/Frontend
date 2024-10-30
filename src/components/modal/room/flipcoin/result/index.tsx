import { Modal } from "../../..";
import { useEffect } from 'react';

interface FirstAttackModalProps {
    team: string;
    onClose: () => void;
}

export const FirstAttackModal = ({ team, onClose }: FirstAttackModalProps) => {
    useEffect(() => {
        // 5초 후 자동으로 모달 닫기
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        // <Modal onClose={onClose} width="50px" height="50px">
        <div>
            <h2>{team}이 먼저 공격을 시작합니다!</h2>
        </div>
        // </Modal>
    );
};