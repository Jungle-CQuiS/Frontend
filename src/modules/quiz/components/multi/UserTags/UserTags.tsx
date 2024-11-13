import { useRef } from "react";
import { TeamUserTagProps } from "../../../../../types/room";
import { UserTag, UserTagImg, UserTagsContainer } from "./styled";
import { useTeamState } from "../../../../../contexts/TeamStateContext/useTeamState";
import { useGameUser } from "../../../../../contexts/GameUserContext/useGameUser";
import { EmojiButton } from "../../../../../components/buttons/emoji";
import { AnimatedEmoji } from "../../../../../components/modal/emogi/animatedEmoji";
import { useEmoji } from "../../../../../hook/useEmoji";

export const UserTagsComponent = ({ teamId }: TeamUserTagProps) => {
    const { user } = useGameUser();
    const { teamOneUsers, teamTwoUsers } = useTeamState()
    const teamUsers = teamId == 1 ? teamOneUsers : teamTwoUsers;

    // UserTag의 ref를 저장할 객체
    const userTagRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const { animatedEmojis, handleEmojiSelect } = useEmoji(userTagRefs);

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
