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
import { useConfirm } from "../../../../components/confirmPopup";
import { readyRoomSocketEvents } from "../../../../hook/readyRoomSocketEvent";
import { GameData } from "../../../../types/gamedata";
import { useStompContext } from "../../../../contexts/StompContext";

export const SolvingPage = ({ selectedQuiz, gamedata}: { selectedQuiz: any, gamedata:GameData}) => {
    const [teamId, setTeamId] = useState(2);
    const customConfirm = useConfirm(); 
    const { stompClient } = useStompContext();

    const handleSubmitAnswer = () => {
        console.log("제출")
    }

    const handleLeaveRoom = async () => {
        const confirmed = await customConfirm("정말 나가시겠습니까?");
        if (confirmed) {
            console.log("나감");  // TODO: 방 나감
            readyRoomSocketEvents.userExitRoom(stompClient, gamedata._roomId);
        }
    };

    return(
        <Background>
            <TeamHeaderTag teamId={teamId}>{teamId}팀</TeamHeaderTag>
            <SolvingContainer>
                <SolvingHeaderComponent />
                <div>
                    <QuizProblemsComponent quiz={selectedQuiz} showAnswer={false} />
                </div>
                <SolvingBottom>
                    <SovlingInputWrap>
                        <SovlingInput placeholder="정답을 입력해주세요."/>
                        <BlackButtonSmall onClick={handleSubmitAnswer}>제출하기</BlackButtonSmall>
                    </SovlingInputWrap>
                    <SecondaryButtonSmall onClick={handleLeaveRoom}>나가기</SecondaryButtonSmall>
                </SolvingBottom>
                <UserTagsComponent teamId={teamId}  />
            </SolvingContainer>
        </Background>
    );
}
