import React, { useState } from "react";
import { TeamUserTagProps } from "../../../../../types/room";
import { UserTag, UserTagImg, UserTagsContainer } from "./styled";
import { useTeamState } from "../../../../../contexts/TeamStateContext/useTeamState";

export const UserTagsComponent = ({ teamId }: TeamUserTagProps) => {

    const { teamOneUsers, teamTwoUsers } = useTeamState()
    const teamUsers = teamId == 1 ? teamOneUsers : teamTwoUsers;

    return (
        <UserTagsContainer>
            {teamUsers.map((user, index) => (
                <UserTag key={index} teamId={teamId}>
                    {user?.isLeader === 'leader' && <UserTagImg src="/icons/medal.svg" />} {/*FIXME: 모두 리더 표시가 뜨는거같아서 한번 확인해야함!*/}
                    {user?.username}
                </UserTag>
            ))}
        </UserTagsContainer>
    );
};
