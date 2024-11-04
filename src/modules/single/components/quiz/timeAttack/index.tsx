import { useState } from "react"
import { SingleModeBottomComponent } from "../../bottom"
import { HeaderTagComponent } from "../../headerTag"
import { SingleModeQuizContainer } from "../multipleChoice/styled"
import { SingleModeQuizBox } from "../quizBox"
import { Timer } from "../../../../../components/timer/timer"
import { SingleModeTimeAttackTimerWrap, SingleModeTimeAttackTimerTextWrap, SingleModeTimeAttackTimer, SingleModeTimeAttackTimerText } from "./styled"

export const SingleModeQuizTimeAttack = () => {
    const [quizType, setQuizType] = useState("객관식");

    return(
        <SingleModeQuizContainer>
            <HeaderTagComponent type="타임어택"/>
            <SingleModeTimeAttackTimerWrap>
                <Timer />
                <SingleModeTimeAttackTimerTextWrap>
                    <SingleModeTimeAttackTimer>30초</SingleModeTimeAttackTimer>
                    <SingleModeTimeAttackTimerText>남았습니다!</SingleModeTimeAttackTimerText>
                </SingleModeTimeAttackTimerTextWrap>
            </SingleModeTimeAttackTimerWrap>
            <SingleModeQuizBox type="주관식"/>
            <SingleModeBottomComponent />
        </SingleModeQuizContainer>
    )
}