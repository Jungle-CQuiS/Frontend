import { TeamUserTagProps } from "../../../../../types/room";
import { UserTag, UserTagImg, UserTagsContainer } from "./styled";

export const UserTagsComponent = ({teamId }: TeamUserTagProps) => {

    return(
        <UserTagsContainer>
                <UserTag>흑화해버린담곰여덟째</UserTag>
                <UserTag><UserTagImg src="/icons/medal.svg"/>흑화해버린담곰여덟째ㅁㄴㅇㄹ</UserTag>
                <UserTag>드래곤캐슬</UserTag>
                <UserTag>정글깡패</UserTag>
                <UserTag>스몰애기</UserTag>
        </UserTagsContainer>
    )
}