import React, { useState } from "react";
import { TeamUserTagProps } from "../../../../../types/room";
import { UserTag, UserTagImg, UserTagsContainer } from "./styled";
import { useTeamState } from "../../../../../contexts/TeamStateContext/useTeamState";

export const UserTagsComponent = ({ teamId }: TeamUserTagProps) => {

    const { teamOneUsers, teamTwoUsers } = useTeamState()
    const teamUsers = teamId == 1 ? teamOneUsers : teamTwoUsers;

    return (
        <UserTagsContainer>
            {teamUsers
                .filter(user => user !== null) // null인 user 필터링
                .map((user, index) => (
                    <UserTag key={index} teamId={teamId}>
                        {user?.isLeader === 'leader' && <UserTagImg src="/icons/medal.svg" />}
                        {user.username}  {/* null 체크 불필요 */}
                    </UserTag>
                ))}
        </UserTagsContainer>
    );
};
