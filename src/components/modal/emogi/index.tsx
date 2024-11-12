import { useState } from "react";
import { IModalProps, Modal } from "..";
import {
    EmojiModalContainer, EmojiCategoryContainer, EmojiCategoryTab, EmojiContentWrap,
    EmojiContentBox, EmojiButton, EmojiGrid,EmojiRow
} from "./styled";
import { EMOJI_IMAGE } from "../../../config/emoji/constants";

interface EmojiModalProps {

}

// 반환될 수 있는 이모지 객체들의 타입 정의
type EmojiPaths = {
    [key: string]: string;
};

export const EmojiModal = ({
    onClose,
    onDone,
    ...props
}: IModalProps & EmojiModalProps) => {

    const [selectedCategory, setSelectedCategory] = useState("전체");


    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    // 이미지 클릭 핸들러
    const handleEmojiClick = (imagePath: string) => {
        // 이미지 클릭 시 처리 로직
        console.log('Selected emoji:', imagePath);
        // onDone(imagePath); // 필요한 경우
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
        <Modal {...props}
            open={props.open} onClose={onClose} onDone={onDone}
            closeOnBackdropClick={true}
            backdropcolor={false}
            width="300px"
            $padding="10px"
            $round="8px"
            $border="3px solid"
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
                                        onClick={() => handleEmojiClick(emojiPath)}
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


    );


}