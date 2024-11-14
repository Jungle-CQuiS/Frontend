// hook/useEmoji.ts
import { useState, useEffect, useCallback } from "react";
import { useTeamState } from "../contexts/TeamStateContext/useTeamState";
import { useGameState } from "../contexts/GameStateContext/useGameState";
import { useEmojiContext } from "../contexts/EmojiContext/EmojiContext";

export const useEmoji = () => {
    const { userTagRefs } = useGameState();
    const { teamOneUsers, teamTwoUsers } = useTeamState()
    const {animatedEmojis, setAnimatedEmojis} = useEmojiContext();

    const showEmojiAnimation = useCallback((emojiPath: string, username: string) => {
        const targetTagElement = userTagRefs.current[username];

        if (targetTagElement) {
            const containerRect = targetTagElement.parentElement?.getBoundingClientRect();
            const tagRect = targetTagElement.getBoundingClientRect();

            if (containerRect) {
                const relativeX = tagRect.left - containerRect.left;
                const relativeY = tagRect.top - containerRect.top;
                const finalX = relativeX + (tagRect.width / 2);
                const finalY = relativeY - 100;

                setAnimatedEmojis(prev => {
                    const newEmojis = [...prev, {
                        id: Date.now(),
                        src: emojiPath,
                        x: finalX,
                        y: finalY
                    }];
                    return newEmojis;
                });
            }
        }
    }, []);

    const handleReceivedEmoji = useCallback((emojiType: string, roomUserId: number, teamId: number) => {
        const teamUsers = teamId === 1 ? teamOneUsers : teamTwoUsers;
        const targetUser = teamUsers.find(user => user?.roomUserId === roomUserId);

        if (targetUser?.username) {
            const emojiPath = `/images/emoji/${emojiType}.png`;

            showEmojiAnimation(emojiPath, targetUser.username);
        } else {
            console.log("targetUser를 찾지 못함");
        }
    }, [teamOneUsers, teamTwoUsers, showEmojiAnimation]);

    const handleEmojiSelect = useCallback((emojiPath: string, targetUsername: string) => {
        showEmojiAnimation(emojiPath, targetUsername);
    }, [showEmojiAnimation]);

    return {
        animatedEmojis,
        handleEmojiSelect,
        handleReceivedEmoji
    };
};