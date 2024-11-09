import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { SERVICES } from "../../../../config/api/constants";
import { Background } from "../../../../components/background/styled"
import { BlackButtonSmall, SecondaryButtonSmall } from "../../../../components/buttons/styled"
import { SolvingHeaderComponent } from "../../../../modules/quiz/components/multi/SolvingHeader/SolvingHeader"
import { TeamHeaderTag } from "../../../../modules/quiz/components/multi/TeamHeader/styled"
import { UserTagsComponent } from "../../../../modules/quiz/components/multi/UserTags/UserTags"
import AnswerSelectComponent from "../../../../modules/quiz/components/multi/Answer/AnswerSelect"
import { SelectAnswerButtonWrap, SelectAnswerContainer, SelectAnswerModalContainer, SelectAnswerModalImg, SelectAnswerModalText, SelectAnswerModalTitle, SelectAnswerModalWrap } from "./styled"
import { readyRoomSocketEvents } from "../../../../hook/readyRoomSocketEvent";
import { gameRoomSocketEvents } from "../../../../hook/gameRoomSocketEvents";
import { useStompContext } from "../../../../contexts/StompContext";
import { useGameState } from "../../../../contexts/GameStateContext/useGameState";
import { usePageLeave } from "../../../../hook/pageLeaveHandler";
import { useGameUser } from "../../../../contexts/GameUserContext/useGameUser";
import { useTeamState } from "../../../../contexts/TeamStateContext/useTeamState";
import { UserAnswer } from "../../../../types/quiz";
import { Quiz } from "../../../../types/quiz";
import { Modal } from "../../../../components/modal";
import { GamePlayEvents, GameStatus } from "../../../../types/game";
import { TeamType } from "../../../../types/teamuser";
import useButtonSoundEffect from "../../../../hook/useHoverSoundEffect";

// 수비팀 최종 정답 선택 페이지
// 이 부분은 화면이 모두 공유된다!
interface SelectAnswerPageProps {
    selectedQuiz: Quiz | null;
    userAnswers: UserAnswer[] | null;
    prepareNextRound: (event: GamePlayEvents, team: TeamType, health: number) => Promise<void>;
}
export const SelectAnswerPage = ({ selectedQuiz, userAnswers, prepareNextRound }: SelectAnswerPageProps) => {
    const { stompClient } = useStompContext();
    const { roomUserId, _roomId, gameState, defenceFinalAnswer, quizResult, gradeResponse, winnerTeam } = useGameState();
    const { user } = useGameUser();
    const { attackTeam } = useTeamState();
    const defenceTeam = attackTeam == 'BLUE' ? 2 : 1; // 수비팀의 팀이 반드시 들어가야 하기 때문!
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countdown, setCountdown] = useState(3);
    useButtonSoundEffect();

    usePageLeave();

    const submitFinalAnswerSelect = async () => {
        if (!user?.isLeader || user?.team === attackTeam) return;

        try {
            if (defenceFinalAnswer !== null)
                gameRoomSocketEvents.selectFinalAnswer(stompClient, _roomId, defenceFinalAnswer)
            else
                console.error("제출 할 답이 존재하지 않습니다.");

        } catch (error) {
            console.error("수비 최종 답안 서버 전송 실패", error);
        }

    }

    // quizResult가 변경되면 실행.
    useEffect(() => {
        if (quizResult !== null) {
            setIsModalOpen(true);
            setCountdown(3);

            const intervalId = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            const timeoutId = setTimeout(() => {
                setIsModalOpen(false);
                clearInterval(intervalId);
            }, 3000);

            return () => {
                clearTimeout(timeoutId);
                clearInterval(intervalId);
            };
        }
    }, [quizResult]);


    useEffect(() => {

        // 종료 시그널이 없다면 재시작.
        if (countdown === 0 && gradeResponse) {
            // 게임 종료가 나오면 화면이동
            if (gameState === GameStatus.ENDED) {

                // 2. Subscribe unconnected
                if (winnerTeam == null) {
                    console.log("이긴 팀 정보가 없습니다.");
                    return;
                }

                // 3. navigate
                navigate(`/multi/result`, {
                    state: {
                        winner: winnerTeam
                    }
                });

                return;

            }
            // 카운트다운이 끝나고 응답 데이터가 있을 때 prepareNextRound 실행
            prepareNextRound(
                gradeResponse.responseStatus,
                gradeResponse.nextOffenseTeam,
                gradeResponse.teamHp
            );
        }
    }, [countdown, gradeResponse]);

    return (
        <Background>
            {isModalOpen && (
                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <SelectAnswerModalContainer>
                        <SelectAnswerModalWrap>
                            <SelectAnswerModalImg src={quizResult === true ? "/icons/correct.svg" : "/icons/wrong.svg"} />
                            <SelectAnswerModalTitle>{quizResult === true ? "정답입니다!" : "오답입니다!"}</SelectAnswerModalTitle>
                        </SelectAnswerModalWrap>
                        <SelectAnswerModalText>{countdown}초 후에 공격팀이 변경됩니다.</SelectAnswerModalText>
                    </SelectAnswerModalContainer>
                </Modal>
            )}
            <TeamHeaderTag teamId={defenceTeam}>{defenceTeam}팀</TeamHeaderTag>
            <SelectAnswerContainer>
                <SolvingHeaderComponent />
                <AnswerSelectComponent selectedQuiz={selectedQuiz} userAnswers={userAnswers} />
                <SelectAnswerButtonWrap>
                    <SecondaryButtonSmall onClick={() => {
                        readyRoomSocketEvents.userExitRoom(stompClient, _roomId, roomUserId);
                        navigate(SERVICES.MULTI);
                    }}>나가기</SecondaryButtonSmall>
                    <BlackButtonSmall onClick={submitFinalAnswerSelect}>선택완료</BlackButtonSmall>
                </SelectAnswerButtonWrap>
                <UserTagsComponent teamId={defenceTeam} />
                {attackTeam === user?.team ? (<UserTagsComponent teamId={attackTeam == 'BLUE' ? 1 : 2} />) : (<></>)}{/*공격팀일 경우 공격팀의 팀뱃지도 보여준다!*/}
            </SelectAnswerContainer>
        </Background>
    )
}