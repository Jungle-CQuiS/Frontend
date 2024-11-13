import { useEffect } from "react";
import { TeamUserTagProps } from "../../../../../types/room";
import { UserTag, UserTagImg, UserTagsContainer } from "./styled";
import { useTeamState } from "../../../../../contexts/TeamStateContext/useTeamState";
import { useGameUser } from "../../../../../contexts/GameUserContext/useGameUser";
import { EmojiButton } from "../../../../../components/buttons/emoji";
import { AnimatedEmoji } from "../../../../../components/modal/emogi/animatedEmoji";
import { useEmoji } from "../../../../../hook/useEmoji";
import { gameRoomSocketEvents } from "../../../../../hook/gameRoomSocketEvents";
import { useStompContext } from "../../../../../contexts/StompContext";
import { useGameState } from "../../../../../contexts/GameStateContext/useGameState";
export const UserTagsComponent = ({ teamId, roomId }: TeamUserTagProps) => {
    const {userTagRefs} = useGameState();
    const { user } = useGameUser();
    const { stompClient } = useStompContext();
    const { teamOneUsers, teamTwoUsers } = useTeamState()
    const teamUsers = teamId === 1 ? teamOneUsers : teamTwoUsers;

    const { animatedEmojis, handleEmojiSelect } = useEmoji();

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
                onEmojiSelect={(emojiPath: string, emojiType: string) => {
                    if (user?.username) {
                        handleEmojiSelect(emojiPath, user.username);

                        // 서버에 요청
                        gameRoomSocketEvents.sendUserEmoji(stompClient, teamId === 1 ? "BLUE" : "RED",
                            emojiType, roomId, user.roomUserId);
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
