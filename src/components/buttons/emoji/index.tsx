import { useState, useRef } from 'react';
import { ButtonContainer, TooltipModal } from "./styled"
import { EmojiModal } from '../../modal/emogi';

export const EmojiButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <ButtonContainer ref={buttonRef}>
            <button onClick={handleClick}>
                Open Tooltip
            </button>
            {isModalOpen && (
                <TooltipModal>
                    <EmojiModal
                        open={isModalOpen}  // open prop 추가
                        onClose={() => setIsModalOpen(false)}
                    />
                </TooltipModal>
            )}
        </ButtonContainer>
    );
};