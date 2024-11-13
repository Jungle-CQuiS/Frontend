import { useState } from "react";
import { useTeamState } from "../contexts/TeamStateContext/useTeamState";

export const useEmoji = (userTagRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
) => {
    const { teamOneUsers, teamTwoUsers } = useTeamState()
   
    // 각 유저의 이모티콘 상태 관리
    const [animatedEmojis, setAnimatedEmojis] = useState<Array<{
        id: number;
        src: string;
        x: number;
        y: number;
    }>>([]);

    // 로컬 유저가 이모지 선택했을 때
    const handleEmojiSelect = (emojiPath: string, targetUsername: string) => {
        showEmojiAnimation(emojiPath, targetUsername);
    };

    // 다른 유저의 이모지 선택을 받았을 때
    const handleReceivedEmoji = (emojiType: string, roomUserId: number, teamId : number) => {
        console.log("이모지 도착!", emojiType, roomUserId);
        // roomUserId로 해당 유저 찾기
        const teamUsers = teamId === 1 ? teamOneUsers : teamTwoUsers;
        const targetUser = teamUsers.find(user => user?.roomUserId === roomUserId);
        console.log("팀 유저!",teamUsers);
        console.log("타겟 유저!",targetUser);
        if (targetUser?.username) {
            // 이모지 타입으로 이모지 경로 찾기
            const emojiPath = `/images/emoji/${emojiType}.png`;  // 실제 경로 형식에 맞게 수정 필요
            showEmojiAnimation(emojiPath, targetUser.username);
        }
    };

    // 이모지 애니메이션 표시 로직
    const showEmojiAnimation = (emojiPath: string, username: string) => {
        const targetTagElement = userTagRefs.current[username];
        if (targetTagElement) {
            const containerRect = targetTagElement.parentElement?.getBoundingClientRect();
            const tagRect = targetTagElement.getBoundingClientRect();

            if (containerRect) {
                const relativeX = tagRect.left - containerRect.left;
                const relativeY = tagRect.top - containerRect.top;

                setAnimatedEmojis(prev => [...prev, {
                    id: Date.now(),
                    src: emojiPath,
                    x: relativeX + (tagRect.width / 2),
                    y: relativeY - 100
                }]);
            }
        }
    };

    return {
        userTagRefs,
        animatedEmojis,
        handleEmojiSelect,
        handleReceivedEmoji
    };
};