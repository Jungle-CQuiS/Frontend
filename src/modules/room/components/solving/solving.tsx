import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SERVICES } from "../../../../config/api/constants";
import { TeamHeaderContainer, TeamHeaderTag, TeamHeaderTitle } from "../../../../modules/quiz/components/multi/TeamHeader/styled";
import { WaitingScreen } from "../../../quiz/components/multi/waiting/WaitingScreen";
import { Background } from "../../../../components/background/styled";
import QuizProblemsComponent from "../../../../components/quiz";
import { BlackButtonSmall, SecondaryButtonSmall } from "../../../../components/buttons/styled";
import { UserTag } from "../../../../modules/quiz/components/multi/UserTags/styled";
import { UserTagsComponent } from "../../../../modules/quiz/components/multi/UserTags/UserTags";
import { SolvingBottom, SolvingContainer, SovlingInput, SovlingInputWrap } from "./styled";
import { SolvingHeaderComponent } from "../../../../modules/quiz/components/multi/SolvingHeader/SolvingHeader";
import { useConfirm } from "../../../../components/confirmPopup";
import { readyRoomSocketEvents } from "../../../../hook/readyRoomSocketEvent";
import { useGameUser } from "../../../../contexts/GameUserContext/useGameUser";
import { useStompContext } from "../../../../contexts/StompContext";
import { useGameState } from "../../../../contexts/GameStateContext/useGameState";
import { gameRoomSocketEvents } from "../../../../hook/gameRoomSocketEvents";
import { Quiz } from "../../../../types/quiz";
import { usePageLeave } from "../../../../hook/pageLeaveHandler";
import { MultiBackgroundRoom } from "../../../../pages/multi/room/styled";

export interface SolvingPageProps {
    selectedQuiz: Quiz | null;
    userTagRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}


export const SolvingPage = ({ selectedQuiz , userTagRefs}: SolvingPageProps) => {
    const { user } = useGameUser();
    const teamId = user?.team == 'BLUE' ? 1 : 2;

    const navigate = useNavigate();
    const customConfirm = useConfirm();
    const { stompClient } = useStompContext();
    const { roomUserId, _roomId } = useGameState();

    const [answer, setAnswer] = useState<string>("");
    const [reason, setReason] = useState<string>("");
    const [isSubmit, setIsSubmit] = useState<boolean>(false);


    usePageLeave();

    const handleSubmitAnswer = async () => {
        const confirmed = await customConfirm("제출 하시겠습니까?");
        if (confirmed && roomUserId) {
            console.log("제출");
            gameRoomSocketEvents.submitQuizAnswer(stompClient, _roomId, roomUserId, answer, reason);
            setIsSubmit(true); // 제출했다. true
        }
    }

    const handleLeaveRoom = async () => {
        const confirmed = await customConfirm("정말 나가시겠습니까?");
        if (confirmed && roomUserId) {
            console.log("나감");  // 방 나감
            readyRoomSocketEvents.userExitRoom(stompClient, _roomId, roomUserId);

            navigate(SERVICES.MULTI);
        }
    };


    return (
        <MultiBackgroundRoom>
            {isSubmit === false ? (
                <>
                    <TeamHeaderContainer>
                        <TeamHeaderTag teamId={teamId}>{teamId}팀</TeamHeaderTag>
                        <TeamHeaderTitle>문제를 풀어주세요!</TeamHeaderTitle>
                    </TeamHeaderContainer>
                    <SolvingContainer>
                        <SolvingHeaderComponent />
                        <div>
                            <QuizProblemsComponent quiz={selectedQuiz} showAnswer={false} />
                        </div>
                        <SolvingBottom>
                            <SovlingInputWrap>
                                <SovlingInput
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder="정답" />
                                <SovlingInput
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="정답에 대한 이유를 입력해주세요" />
                                <BlackButtonSmall className="click-sound" onClick={handleSubmitAnswer}>제출하기</BlackButtonSmall>
                            </SovlingInputWrap>
                            <SecondaryButtonSmall onClick={handleLeaveRoom}>나가기</SecondaryButtonSmall>
                        </SolvingBottom>
                    </SolvingContainer>
                </>
            ) : (
                <>
                    <TeamHeaderContainer>
                        <TeamHeaderTag teamId={teamId}>{teamId}팀</TeamHeaderTag>
                        <TeamHeaderTitle>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div>수비 팀원들이 문제를 제출 중입니다.</div>
                                <div>잠시만 기다려주세요</div>
                            </div>
                        </TeamHeaderTitle>
                    </TeamHeaderContainer>
                    <WaitingScreen teamId={teamId} roomId={_roomId} userTagRefs = {userTagRefs}/>
                </>
            )}
            <UserTagsComponent teamId={teamId} roomId={_roomId} userTagRefs = {userTagRefs}/>
        </MultiBackgroundRoom>
    );
}
