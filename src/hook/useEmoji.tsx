import { useState } from "react";

export const useEmoji = (userTagRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>) => {
     // 각 유저의 이모티콘 상태 관리
     const [animatedEmojis, setAnimatedEmojis] = useState<Array<{
        id: number;
        src: string;
        x: number;
        y: number;
    }>>([]);

    const handleEmojiSelect = (emojiPath: string, targetUsername: string) => {
        const targetTagElement = userTagRefs.current[targetUsername];
        if (targetTagElement) {
            // 부모 컨테이너(UserTagsContainer)의 위치 가져오기
            const containerRect = targetTagElement.parentElement?.getBoundingClientRect();
            const tagRect = targetTagElement.getBoundingClientRect();

            if (containerRect) {
                // 상대적 위치 계산
                const relativeX = tagRect.left - containerRect.left;
                const relativeY = tagRect.top - containerRect.top;

                setAnimatedEmojis(prev => [...prev, {
                    id: Date.now(),
                    src: emojiPath,
                    x: relativeX + (tagRect.width / 2), // 태그의 중앙
                    y: relativeY - 100 // 태그 위
                }]);
            }
        }

    };

    return {
        userTagRefs,
        animatedEmojis,
        handleEmojiSelect
    };
};