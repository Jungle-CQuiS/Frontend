import { SingleModeBottomComponent } from "../../bottom"
import { HeaderTagComponent } from "../../headerTag"
import { SingleModeQuizBox } from "../quizBox"
import { SingleModeQuizContainer } from "./styled"

export const SingleModeQuizMultiple = () => {

    return(
        <SingleModeQuizContainer>
            <HeaderTagComponent type="객관식"/>
            <SingleModeQuizBox type="객관식"/>
            <SingleModeBottomComponent />
        </SingleModeQuizContainer>
    )
}