import { useState } from "react";
import { TeamHeaderProps } from "../../../../../types/room";
import { TeamHeaderContainer, TeamHeaderTag, TeamHeaderTitle } from "./styled";

export const TeamHeaderComponent = ({ teamId, isAttackTeam }: TeamHeaderProps) => {

    return (
        <TeamHeaderContainer>
            <TeamHeaderTag teamId={teamId}>{teamId}팀</TeamHeaderTag>

            <TeamHeaderTitle>
                {isAttackTeam
                    ? "수비팀에게 전달할 문제를 선택하세요"
                    : <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <div>공격팀이 문제를 선택중입니다.</div>
                        <div>잠시만 기다려주세요</div>
                        </div>}
            </TeamHeaderTitle>
        </TeamHeaderContainer>
    );
};
