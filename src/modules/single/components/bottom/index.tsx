import { BlackButtonSmall, SecondaryButtonSmall } from "../../../../components/buttons/styled"
import { SingleModeBottomContainer, SingleModeBottomInput, SingleModeBottomInputWrap } from "./styled"

export const SingleModeBottomComponent = () => {

    return(
        <SingleModeBottomContainer>
            <SingleModeBottomInputWrap>
                <SingleModeBottomInput placeholder="정답을 입력해주세요"/>
                <BlackButtonSmall>제출하기</BlackButtonSmall>
            </SingleModeBottomInputWrap>
            <SecondaryButtonSmall>나가기</SecondaryButtonSmall>
        </SingleModeBottomContainer>
    )
}