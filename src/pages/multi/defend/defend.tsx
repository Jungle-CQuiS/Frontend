import { useState } from "react";
import { TeamHeaderComponent } from "../../../modules/quiz/components/multi/TeamHeader/TeamHeader";
import { Background } from "../../../components/background/styled";
import { WaitingScreen } from "../../../modules/quiz/components/multi/waiting/WaitingScreen";
import { UserTagsComponent } from "../../../modules/quiz/components/multi/UserTags/UserTags";


export default function DefendPage() {
    //수비팀 선택
    const [teamId, setTeamId] = useState(2);
    const [isAttackTeam, setIsAttackTeam] = useState(false);
    
    return(
        <Background>
            <TeamHeaderComponent teamId={teamId} isAttackTeam={isAttackTeam} />
            <WaitingScreen teamId={teamId} />
            <UserTagsComponent teamId={teamId}/>
        </Background>
    )
}