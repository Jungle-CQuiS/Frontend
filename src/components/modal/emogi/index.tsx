import { IModalProps, Modal } from "..";
import { EmojiModalContainer, EmojiCategoryContainer, EmojiCategoryTab, EmojiContentWrap, EmojiContentBox } from "./styled";
import { useState } from "react";

interface EmojiModalProps {

}

export const EmojiModal = ({
    onClose,
    onDone,
    ...props
}: IModalProps & EmojiModalProps) => {

    const [selectedCategory, setSelectedCategory] = useState("전체");


    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };
    return (
        <Modal {...props}
            open={props.open} onClose={onClose} onDone={onDone}
            closeOnBackdropClick={true}
            backdropcolor={false}
            width="500px"
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

                    </EmojiContentBox>
                </EmojiContentWrap>
            </EmojiModalContainer>
        </Modal>


    );


}