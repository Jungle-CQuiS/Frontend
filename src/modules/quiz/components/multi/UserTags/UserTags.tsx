import React, { useState } from "react";
import { TeamUserTagProps } from "../../../../../types/room";
import { UserTag, UserTagImg, UserTagsContainer, UserEmoji } from "./styled";
import { useTeamState } from "../../../../../contexts/TeamStateContext/useTeamState";
import { useGameUser } from "../../../../../contexts/GameUserContext/useGameUser";
import { EmojiButton } from "../../../../../components/buttons/emoji";

interface UserEmojisType {
    [username: string]: string;
}

export const UserTagsComponent = ({ teamId }: TeamUserTagProps) => {
    const { user } = useGameUser();
    const { teamOneUsers, teamTwoUsers } = useTeamState()
    const teamUsers = teamId == 1 ? teamOneUsers : teamTwoUsers;

    // 각 유저의 이모티콘 상태 관리
    const [userEmojis, setUserEmojis] = useState<UserEmojisType>({});

    const handleEmojiSelect = (emojiPath: string, targetUsername: string) => {
        setUserEmojis(prev => ({
            ...prev,
            [targetUsername]: emojiPath
        }));
    };
    return (
        <UserTagsContainer>
            {teamUsers
                .filter((user): user is NonNullable<typeof user> => user !== null)
                .map((teamUser, index) => {
                    const username = teamUser.username;

                    return (
                        <UserTag key={index} teamId={teamId}>
                            {teamUser.isLeader === 'leader' && <UserTagImg src="/icons/medal.svg" />}
                            {username}
                            {username && userEmojis[username] && (
                                <UserEmoji
                                    src={userEmojis[username]}
                                    alt="emoji"
                                />
                            )}
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
        </UserTagsContainer>
    );
};
