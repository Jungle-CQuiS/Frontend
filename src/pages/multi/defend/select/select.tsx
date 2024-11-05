import { useState } from "react"
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from "../../../../config/api/constants";
import { Background } from "../../../../components/background/styled"
import { BlackButtonSmall, SecondaryButtonSmall } from "../../../../components/buttons/styled"
import { SolvingHeaderComponent } from "../../../../modules/quiz/components/multi/SolvingHeader/SolvingHeader"
import { TeamHeaderTag } from "../../../../modules/quiz/components/multi/TeamHeader/styled"
import { UserTagsComponent } from "../../../../modules/quiz/components/multi/UserTags/UserTags"
import AnswerSelectComponent from "../../../../modules/quiz/components/multi/Answer/AnswerSelect"
import { SelectAnswerButtonWrap, SelectAnswerContainer } from "./styled"
import { readyRoomSocketEvents } from "../../../../hook/readyRoomSocketEvent";
import { useStompContext } from "../../../../contexts/StompContext";
import { useGameState } from "../../../../contexts/GameStateContext/useGameState";
import { usePageLeave } from "../../../../hook/pageLeaveHandler";
// 수비팀 최종 정답 선택 페이지
export const SelectAnswerPage = () => {
    const [teamId, setTeamId] = useState(2);
    const { stompClient } = useStompContext();
    const { roomUserId, _roomId } = useGameState();
    const navigate = useNavigate();

    usePageLeave();

    return (
        <Background>
            <TeamHeaderTag teamId={teamId}>{teamId}팀</TeamHeaderTag>
            <SelectAnswerContainer>
                <SolvingHeaderComponent />
                <AnswerSelectComponent />
                <SelectAnswerButtonWrap>
                    <SecondaryButtonSmall onClick={() => {
                        readyRoomSocketEvents.userExitRoom(stompClient, _roomId, roomUserId);
                        navigate(SERVICES.MULTI);
                    }}>나가기</SecondaryButtonSmall>
                    <BlackButtonSmall>선택완료</BlackButtonSmall>
                </SelectAnswerButtonWrap>
                <UserTagsComponent teamId={teamId} />
            </SelectAnswerContainer>
        </Background>
    )
}