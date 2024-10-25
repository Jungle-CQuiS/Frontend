import React, { useState } from "react";
import { TeamUserTagProps } from "../../../../../types/room";
import { UserTag, UserTagImg, UserTagsContainer } from "./styled";

export const UserTagsComponent = ({ teamId }: TeamUserTagProps) => {
    // 팀 ID에 따른 초기 이름 상태 설정
    const [usernames, setUsernames] = useState<string[]>([
        "흑화해버린담곰여덟째",
        "흑화해버린담곰여덟째ㅁㄴㅇㄹ",
        "드래곤캐슬",
        "정글깡패",
        "스몰애기",
    ]);

    // 나중에 setUsernames를 사용하여 이름을 동적으로 변경할 수 있습니다.

    return (
        <UserTagsContainer>
            {usernames.map((name, index) => (
                <UserTag key={index} teamId={teamId}>
                    {index === 1 && <UserTagImg src="/icons/medal.svg" />}
                    {name}
                </UserTag>
            ))}
        </UserTagsContainer>
    );
};
