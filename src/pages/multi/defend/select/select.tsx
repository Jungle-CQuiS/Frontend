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
import { useGameUser } from "../../../../contexts/GameUserContext/useGameUser";
import { useTeamState } from "../../../../contexts/TeamStateContext/useTeamState";
import { UserAnswer } from "../../../../types/quiz";
import { Quiz } from "../../../../types/quiz";
// 수비팀 최종 정답 선택 페이지
// 이 부분은 화면이 모두 공유된다!
interface SelectAnswerPageProps {
    selectedQuiz: Quiz | null;
    userAnswers: UserAnswer[] | null;
}
export const SelectAnswerPage = ({ selectedQuiz , userAnswers }: SelectAnswerPageProps) => {
    const { stompClient } = useStompContext();
    const { roomUserId, _roomId } = useGameState();
    const { user } = useGameUser();
    const { attackTeam } = useTeamState();
    const  defenceTeam = attackTeam == 'BLUE' ? 2 : 1; // 수비팀의 팀이 반드시 들어가야 하기 때문!
    const navigate = useNavigate();

    usePageLeave();

    return (
        <Background>
            <TeamHeaderTag teamId={defenceTeam}>{defenceTeam}팀</TeamHeaderTag>
            <SelectAnswerContainer>
                <SolvingHeaderComponent />
                <AnswerSelectComponent selectedQuiz = {selectedQuiz} userAnswers = {userAnswers} />
                <SelectAnswerButtonWrap>
                    <SecondaryButtonSmall onClick={() => {
                        readyRoomSocketEvents.userExitRoom(stompClient, _roomId, roomUserId);
                        navigate(SERVICES.MULTI);
                    }}>나가기</SecondaryButtonSmall>
                    <BlackButtonSmall>선택완료</BlackButtonSmall>
                </SelectAnswerButtonWrap>
                <UserTagsComponent teamId={defenceTeam} />
                {attackTeam === user?.team ? (<UserTagsComponent teamId={attackTeam == 'BLUE' ? 1 : 2} />) : (<></>)}{/*공격팀일 경우 공격팀의 팀뱃지도 보여준다!*/}
            </SelectAnswerContainer>
        </Background>
    )
}