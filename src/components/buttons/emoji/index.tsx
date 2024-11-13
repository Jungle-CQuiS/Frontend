import { useState, useRef } from 'react';
import { ButtonContainer } from "./styled"
import { EmojiModal } from '../../modal/emogi';
import { EmojiButtonWrap } from './styled';

type PositionType = "fixed" | "absolute";
type PositionProps = {
    position: PositionType;
    top: number;
    left: number;
};
type ModalPosition = PositionType & PositionProps;

interface EmojiButtonProps {
    onEmojiSelect?: (emojiPath: string, emojiType: string) => void;
}

export const EmojiButton = ({ onEmojiSelect }: EmojiButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [modalPosition, setModalPosition] = useState<ModalPosition | undefined>(undefined);

    const handleClick = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const newPosition = {
                position: "fixed" as const,
                top: rect.bottom - 50,
                left: rect.left + 15
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
            {isModalOpen && modalPosition && (
                <EmojiModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    position={modalPosition}
                    onEmojiSelect={(path, type) => {
                        onEmojiSelect?.(path,type);
                    }}
                />
            )}
        </ButtonContainer>
    );
};