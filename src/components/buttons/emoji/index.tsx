import { useState, useRef } from 'react';
import { ButtonContainer, TooltipModal } from "./styled"
import { EmojiModal } from '../../modal/emogi';
import { EmojiButtonWrap } from './styled';

type PositionType = "fixed" | "absolute";
type PositionProps = {
    position: PositionType;
    top: number;
    left: number;
};
type ModalPosition = PositionType & PositionProps;

export const EmojiButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [modalPosition, setModalPosition] = useState<ModalPosition | undefined>(undefined);

    const handleClick = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const newPosition = {
                position: "fixed" as const,
                top: rect.bottom - 50,
                left: rect.left - 200
            };
            setModalPosition(newPosition as ModalPosition);
        }
        setIsModalOpen(true);
    };

    return (
        <ButtonContainer ref={buttonRef}>
            <EmojiButtonWrap onClick={handleClick}>
                😊
            </EmojiButtonWrap>
            {isModalOpen && (
                <TooltipModal>
                    <EmojiModal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        position={modalPosition}
                    />
                </TooltipModal>
            )}
        </ButtonContainer>
    );
};