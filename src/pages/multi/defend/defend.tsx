import { useState } from "react";
import { TeamHeaderComponent } from "../../../modules/quiz/components/multi/TeamHeader/TeamHeader";
import { Background } from "../../../components/background/styled";
import { WaitingScreen } from "../../../modules/quiz/components/multi/waiting/WaitingScreen";
import { UserTagsComponent } from "../../../modules/quiz/components/multi/UserTags/UserTags";
import { useGameUser } from "../../../contexts/GameUserContext/useGameUser";
import { useTeamState } from "../../../contexts/TeamStateContext/useTeamState";
import { usePageLeave } from "../../../hook/pageLeaveHandler";
export default function DefendPage() {
    //수비팀 선택
    const { user } = useGameUser();
    const teamId = user?.team == 'BLUE' ? 1 : 2;
    const { attackTeam } = useTeamState();

    usePageLeave();

    return (
        <Background>
            <TeamHeaderComponent teamId={teamId} isAttackTeam={user?.team == attackTeam ? true : false} />
            <WaitingScreen teamId={teamId} />
            <UserTagsComponent teamId={teamId} />
        </Background>
    )
}