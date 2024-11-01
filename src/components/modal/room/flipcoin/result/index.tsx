
import { useEffect } from 'react';
import { Modal } from '../../..';

interface FirstAttackModalProps {
    team: string;
    onClose: () => void;
}

export const FirstAttackModal = ({ team, onClose }: FirstAttackModalProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <Modal
            open={true}
            onClose={onClose}
            onDone={() => {}} // 필요에 따라 onDone 함수 지정
            width="300px"
            backdrop={true}
            backdropcolor={true}
        >
            <p style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "bold" }}>
                {team}이 선공입니다!
            </p>
        </Modal>
    );
};