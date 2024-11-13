// hook/useEmoji.ts
import { useState, useEffect, useCallback } from "react";
import { useTeamState } from "../contexts/TeamStateContext/useTeamState";
import { useGameState } from "../contexts/GameStateContext/useGameState";

export const useEmoji = () => {
    const {userTagRefs} = useGameState();
    const { teamOneUsers, teamTwoUsers } = useTeamState()
    const [animatedEmojis, setAnimatedEmojis] = useState<Array<{
        id: number;
        src: string;
        x: number;
        y: number;
    }>>([]);

    const showEmojiAnimation = useCallback((emojiPath: string, username: string) => {
        const targetTagElement = userTagRefs.current[username];
        console.log("targetTagElement", targetTagElement);

        if (targetTagElement) {
            const containerRect = targetTagElement.parentElement?.getBoundingClientRect();
            const tagRect = targetTagElement.getBoundingClientRect();

            if (containerRect) {
                const relativeX = tagRect.left - containerRect.left;
                const relativeY = tagRect.top - containerRect.top;
                const finalX = relativeX + (tagRect.width / 2);
                const finalY = relativeY - 100;

                setAnimatedEmojis(prev => [
                    ...prev,
                    {
                        id: Date.now(),
                        src: emojiPath,
                        x: finalX,
                        y: finalY
                    }
                ]);
            }
        }
    }, []); // 의존성 제거

    const handleEmojiSelect = useCallback((emojiPath: string, targetUsername: string) => {
        showEmojiAnimation(emojiPath, targetUsername);
    }, [showEmojiAnimation]);

    const handleReceivedEmoji = useCallback((emojiType: string, roomUserId: number, teamId: number) => {
        console.log("이모지 도착!", emojiType, roomUserId);
        const teamUsers = teamId === 1 ? teamOneUsers : teamTwoUsers;
        const targetUser = teamUsers.find(user => user?.roomUserId === roomUserId);

        if (targetUser?.username) {
            const emojiPath = `/images/emoji/${emojiType}.png`;
            showEmojiAnimation(emojiPath, targetUser.username);
        }
    }, [teamOneUsers, teamTwoUsers, showEmojiAnimation]);

    return {
        animatedEmojis,
        handleEmojiSelect,
        handleReceivedEmoji
    };
};