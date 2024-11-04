import { SingleModeHeaderContainer, SingleModeHeaderImg, SingleModeHeaderTitle } from "./styled";

export default function SingleModeHeaderComponent() {

    return(
        <SingleModeHeaderContainer>
            <SingleModeHeaderImg src="/icons/mdi_user_black.svg"/>
            <SingleModeHeaderTitle>SINGLE MODE</SingleModeHeaderTitle>
        </SingleModeHeaderContainer>
    )
}