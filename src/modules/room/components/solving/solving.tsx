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
import { useStompContext } from "../../../../contexts/StompContext";
import { useGameState } from "../../../../contexts/GameStateContext/useGameState";

export const SolvingPage = ({ selectedQuiz}: { selectedQuiz: any}) => {
    // FIXME: UserContext 에서 정보 받아와야함.
    const [teamId, setTeamId] = useState(2); // TODO: 게임 유저 상태 정보에서 받아와야함.
    const [isLeader, setIsLeader] = useState(true);
    const [isHost, setisHost] = useState(false);

    const customConfirm = useConfirm(); 
    const { stompClient } = useStompContext();
    const {roomUserId,_roomId} = useGameState();

    const handleSubmitAnswer = () => {
        // TODO: 제출 버튼은 Leader만 가능함.
        // TODO: 객관식일 경우에는 클라이언트에서 채점. 일치하는지 확인.
        // TODO: 확인 후 show Asnwer 을 true로 만든다.
        console.log("제출")
    }

    const handleLeaveRoom = async () => {
        const confirmed = await customConfirm("정말 나가시겠습니까?");
        if (confirmed) {
            console.log("나감");  // TODO: 방 나감
            readyRoomSocketEvents.userExitRoom(stompClient, _roomId, roomUserId);
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
