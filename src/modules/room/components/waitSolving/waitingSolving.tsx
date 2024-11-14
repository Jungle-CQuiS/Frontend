import { MultiBackgroundRoom } from "../../../../pages/multi/room/styled";
import { TeamHeaderContainer, TeamHeaderTag, TeamHeaderTitle } from "../../../quiz/components/multi/TeamHeader/styled";
import { WaitingScreenContainer, WaitingScreenButtonWrap, WaitingScreenWrap } from "./styled";
import { SecondaryButtonSmall } from "../../../../components/buttons/styled";
import QuizProblemsComponent from "../../../../components/quiz";
import { UserTagsComponent } from "../../../quiz/components/multi/UserTags/UserTags";
import { Quiz } from "../../../../types/quiz";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "../../../../components/confirmPopup";
import { useGameUser } from "../../../../contexts/GameUserContext/useGameUser";
import { useGameState } from "../../../../contexts/GameStateContext/useGameState";
import { useStompContext } from "../../../../contexts/StompContext";
import { readyRoomSocketEvents } from "../../../../hook/readyRoomSocketEvent";
import { SERVICES } from "../../../../config/api/constants";
export interface WaitingSolvingPageProps {
    selectedQuiz: Quiz | null;
}

export const WaitingSolvingPage = ({ selectedQuiz }: WaitingSolvingPageProps) => {
    const { user } = useGameUser();
    const teamId = user?.team == 'BLUE' ? 1 : 2;
    const { roomUserId, _roomId } = useGameState();
    const { stompClient } = useStompContext();
    const navigate = useNavigate();
    const customConfirm = useConfirm();

    const handleLeaveRoom = async () => {
        const confirmed = await customConfirm("정말 나가시겠습니까?");
        if (confirmed && roomUserId) {
            console.log("나감");  // TODO: 방 나감
            readyRoomSocketEvents.userExitRoom(stompClient, _roomId, roomUserId);

            navigate(SERVICES.MULTI);
        }
    }

    return (
        <MultiBackgroundRoom>{/*화면 공유 페이지*/}
            <TeamHeaderContainer>
                <TeamHeaderTag teamId={teamId}>{teamId}팀</TeamHeaderTag>
                <TeamHeaderTitle>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                        <div>수비팀이 문제를 푸는 중입니다.</div>
                        <div>잠시만 기다려주세요</div>
                    </div>
                </TeamHeaderTitle>
            </TeamHeaderContainer>
            <WaitingScreenWrap>
                <WaitingScreenContainer>
                <QuizProblemsComponent quiz={selectedQuiz} showAnswer={false} />
                </WaitingScreenContainer>
                <UserTagsComponent teamId={teamId} roomId={_roomId} /> {/*본인 팀의 팀 뱃지*/}
                <WaitingScreenButtonWrap>
                    <SecondaryButtonSmall onClick={handleLeaveRoom}>나가기</SecondaryButtonSmall>
                </WaitingScreenButtonWrap>
            </WaitingScreenWrap>
        </MultiBackgroundRoom>
    );

}