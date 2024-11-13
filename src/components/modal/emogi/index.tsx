import { useState } from "react";
import { IModalProps, Modal } from "..";
import {
    EmojiModalContainer, EmojiCategoryContainer, EmojiCategoryTab, EmojiContentWrap,
    EmojiContentBox, EmojiButton, EmojiGrid, EmojiRow
} from "./styled";
import { AnimatedEmoji } from "./animatedEmoji";
import { EMOJI_IMAGE } from "../../../config/emoji/constants";

interface EmojiModalProps {
    position?: {
        position: 'fixed' | 'absolute';
        top: number;
        left: number;
    };
}

// 반환될 수 있는 이모지 객체들의 타입 정의
type EmojiPaths = {
    [key: string]: string;
};

export const EmojiModal = ({ onClose, onDone, position, ...props }: IModalProps & EmojiModalProps) => {
    const [animatedEmojis, setAnimatedEmojis] = useState<Array<{
        id: number;
        src: string;
        x: number;
        y: number;
    }>>([]);

    const [selectedCategory, setSelectedCategory] = useState("전체");


    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    // 이미지 클릭 핸들러
    const handleEmojiClick = (imagePath: string, event: React.MouseEvent) => {
        // 클릭한 위치를 기준으로 애니메이션 시작 위치 설정
        const rect = event.currentTarget.getBoundingClientRect();
        const startX = rect.left;
        const startY = rect.top;

        setAnimatedEmojis(prev => [
            ...prev,
            {
                id: Date.now(),
                src: imagePath,
                x: startX,
                y: startY
            }
        ]);

        // 기존 클릭 핸들링
        console.log('Selected emoji:', imagePath);
    };




    // getFilteredEmojis 함수에 반환 타입 명시
    const getFilteredEmojis = (): EmojiPaths => {
        switch (selectedCategory) {
            case "전체":
                return {
                    ...EMOJI_IMAGE.SUBJECT,
                    ...EMOJI_IMAGE.EMOTION
                };
            case "주제선택":
                return EMOJI_IMAGE.SUBJECT;
            case "감정표현":
                return EMOJI_IMAGE.EMOTION;
            default:
                return {};
        }
    };


    return (
        <>
            <Modal {...props}
                open={props.open} 
                onClose={onClose} 
                onDone={onDone}
                closeOnBackdropClick={true}
                backdropcolor={false}
                width="250px"
                $padding="10px"
                $round="8px"
                $border="2px solid #4444"
                position={position?.position}
                $top={position?.top}
                $left={position?.left}
                $transform="translateY(-100%)"
            >
                <EmojiModalContainer>
                    <EmojiCategoryContainer>
                        {["전체", "주제선택", "감정표현"].map((category) => (
                            <EmojiCategoryTab
                                className="click-sound"
                                key={category}
                                isSelected={selectedCategory === category}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </EmojiCategoryTab>
                        ))}

                    </EmojiCategoryContainer>
                    <EmojiContentWrap>
                        <EmojiContentBox>
                            <EmojiGrid>
                                {Object.entries(getFilteredEmojis()).reduce((rows: any[], [emojiKey, emojiPath], index) => {
                                    const rowIndex = Math.floor(index / 2);

                                    if (!rows[rowIndex]) {
                                        rows[rowIndex] = [];
                                    }

                                    rows[rowIndex].push(
                                        <EmojiButton
                                            key={emojiKey}
                                            onClick={(e) => handleEmojiClick(emojiPath, e)}
                                            className="click-sound"
                                        >
                                            <img
                                                src={emojiPath}
                                                alt={emojiKey}
                                                draggable={false}
                                            />
                                        </EmojiButton>
                                    );

                                    return rows;
                                }, []).map((rowButtons, rowIndex) => (
                                    <EmojiRow key={rowIndex}>
                                        {rowButtons}
                                    </EmojiRow>
                                ))}
                            </EmojiGrid>
                        </EmojiContentBox>
                    </EmojiContentWrap>
                </EmojiModalContainer>
            </Modal>
            {/* 애니메이션되는 이모지들 렌더링 */}
            {animatedEmojis.map(emoji => (
                <AnimatedEmoji
                    key={emoji.id}
                    src={emoji.src}
                    startX={emoji.x}
                    startY={emoji.y}
                />
            ))}
        </>
    );


}