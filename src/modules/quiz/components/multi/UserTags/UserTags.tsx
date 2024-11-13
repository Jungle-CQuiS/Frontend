import { useState, useRef } from "react";
import { TeamUserTagProps } from "../../../../../types/room";
import { UserTag, UserTagImg, UserTagsContainer } from "./styled";
import { useTeamState } from "../../../../../contexts/TeamStateContext/useTeamState";
import { useGameUser } from "../../../../../contexts/GameUserContext/useGameUser";
import { EmojiButton } from "../../../../../components/buttons/emoji";
import { AnimatedEmoji } from "../../../../../components/modal/emogi/animatedEmoji";

export const UserTagsComponent = ({ teamId }: TeamUserTagProps) => {
    const { user } = useGameUser();
    const { teamOneUsers, teamTwoUsers } = useTeamState()
    const teamUsers = teamId == 1 ? teamOneUsers : teamTwoUsers;

    // 각 유저의 이모티콘 상태 관리
    const [animatedEmojis, setAnimatedEmojis] = useState<Array<{
        id: number;
        src: string;
        x: number;
        y: number;
    }>>([]);

    // UserTag의 ref를 저장할 객체
    const userTagRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
                    y: relativeY - 20 // 태그 위
                }]);
            }
        }
    };

    return (
        <UserTagsContainer>
            {teamUsers
                .filter((user): user is NonNullable<typeof user> => user !== null)
                .map((teamUser, index) => {
                    const username = teamUser.username;

                    return (
                        <UserTag
                            key={index}
                            teamId={teamId}
                            ref={el => username && (userTagRefs.current[username] = el)}
                        >
                            {teamUser.isLeader === 'leader' && <UserTagImg src="/icons/medal.svg" />}
                            {username}
                        </UserTag>
                    );
                })}
            <EmojiButton
                onEmojiSelect={(emojiPath: string) => {
                    if (user?.username) {
                        handleEmojiSelect(emojiPath, user.username);
                    }
                }}
            />
            {animatedEmojis.map(emoji => (
                <AnimatedEmoji
                    key={emoji.id}
                    src={emoji.src}
                    startX={emoji.x}
                    startY={emoji.y}
                />
            ))}
        </UserTagsContainer>
    );
};
