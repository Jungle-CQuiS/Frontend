import { useState } from "react";
import { TeamHeaderTag } from "../../../../modules/quiz/components/multi/TeamHeader/styled";
import { TeamHeaderProps } from "../../../../types/room";
import { Background } from "../../../../components/background/styled";
import QuizProblemsComponent from "../../../../components/quiz";
import { BlackButtonSmall, SecondaryButtonSmall } from "../../../../components/buttons/styled";
import { UserTag } from "../../../../modules/quiz/components/multi/UserTags/styled";
import { UserTagsComponent } from "../../../../modules/quiz/components/multi/UserTags/UserTags";
import { SolvingBottom, SolvingContainer, SovlingInput, SovlingInputWrap } from "./styled";
import { SolvingHeaderComponent } from "../../../../modules/quiz/components/multi/SolvingHeader/SolvingHeader";

export const SolvingPage = () => {
    const [teamId, setTeamId] = useState(2);

    return(
        <Background>
            <TeamHeaderTag teamId={teamId}>{teamId}팀</TeamHeaderTag>
            <SolvingContainer>
                    <SolvingHeaderComponent />
                <QuizProblemsComponent />
                <SolvingBottom>
                    <SovlingInputWrap>
                        <SovlingInput placeholder="정답을 입력해주세요."/>
                        <BlackButtonSmall>제출하기</BlackButtonSmall>
                    </SovlingInputWrap>
                    <SecondaryButtonSmall>나가기</SecondaryButtonSmall>
                </SolvingBottom>
                <UserTagsComponent teamId={teamId}  />
            </SolvingContainer>
        </Background>
    )
}