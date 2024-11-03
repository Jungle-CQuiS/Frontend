import React, { useState } from "react";
import { TeamUserTagProps } from "../../../../../types/room";
import { UserTag, UserTagImg, UserTagsContainer } from "./styled";
import { useTeamState } from "../../../../../contexts/TeamStateContext/useTeamState";

export const UserTagsComponent = ({ teamId }: TeamUserTagProps) => {
    // 팀 ID에 따른 초기 이름 상태 설정
    /*const [usernames, setUsernames] = useState<string[]>([
        "흑화해버린담곰여덟째",
        "흑화해버린담곰여덟째ㅁㄴㅇㄹ",
        "드래곤캐슬",
        "정글깡패",
        "스몰애기",
    ]);*/
    const { teamOneUsers, teamTwoUsers } = useTeamState()
    const teamUsers = teamId == 1 ? teamOneUsers : teamTwoUsers;

    return (
        <UserTagsContainer>
            {teamUsers.map((user, index) => (
                <UserTag key={index} teamId={teamId}>
                    {user?.isLeader && <UserTagImg src="/icons/medal.svg" />}
                    {user?.name}
                </UserTag>
            ))}
        </UserTagsContainer>
    );
};
