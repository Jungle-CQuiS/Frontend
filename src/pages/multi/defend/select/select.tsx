import { useState } from "react"
import { Background } from "../../../../components/background/styled"
import { BlackButtonSmall, SecondaryButtonSmall } from "../../../../components/buttons/styled"
import { SolvingHeaderComponent } from "../../../../modules/quiz/components/multi/SolvingHeader/SolvingHeader"
import { TeamHeaderTag } from "../../../../modules/quiz/components/multi/TeamHeader/styled"
import { UserTagsComponent } from "../../../../modules/quiz/components/multi/UserTags/UserTags"
import AnswerSelectComponent from "../../../../modules/quiz/components/multi/Answer/AnswerSelect"
import { SelectAnswerButtonWrap, SelectAnswerContainer } from "./styled"

export const SelectAnswerPage = () => {
    const [teamId, setTeamId] = useState(2);
    return(
        <Background>
            <TeamHeaderTag teamId={teamId}>{teamId}팀</TeamHeaderTag>
            <SelectAnswerContainer>
                    <SolvingHeaderComponent />
                <AnswerSelectComponent />
                    <SelectAnswerButtonWrap>
                        <SecondaryButtonSmall>나가기</SecondaryButtonSmall>
                        <BlackButtonSmall>선택완료</BlackButtonSmall>
                    </SelectAnswerButtonWrap>
                <UserTagsComponent teamId={teamId}  />
            </SelectAnswerContainer>
        </Background>
    )
}