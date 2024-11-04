import { SingleModeBottomComponent } from "../../bottom"
import { HeaderTagComponent } from "../../headerTag"
import { SingleModeQuizContainer } from "../multipleChoice/styled"
import { SingleModeQuizBox } from "../quizBox"

export const SingleModeQuizSubjective = () => {

    return(
        <SingleModeQuizContainer>
            <HeaderTagComponent type="주관식"/>
            <SingleModeQuizBox type="주관식"/>
            <SingleModeBottomComponent />
        </SingleModeQuizContainer>
    )
}