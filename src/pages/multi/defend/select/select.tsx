import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { SERVICES } from "../../../../config/api/constants";
import { Background } from "../../../../components/background/styled"
import { BlackButtonSmall, SecondaryButtonSmall } from "../../../../components/buttons/styled"
import { SolvingHeaderComponent } from "../../../../modules/quiz/components/multi/SolvingHeader/SolvingHeader"
import { TeamHeaderContainer, TeamHeaderTag, TeamHeaderTitle } from "../../../../modules/quiz/components/multi/TeamHeader/styled"
import { UserTagsComponent } from "../../../../modules/quiz/components/multi/UserTags/UserTags"
import AnswerSelectComponent from "../../../../modules/quiz/components/multi/Answer/AnswerSelect"
import { MultiAnimationModalContainerPop, SelectAnswerButtonWrap, SelectAnswerContainer, SelectAnswerModalContainer, SelectAnswerModalImg, SelectAnswerModalText, SelectAnswerModalTitle, SelectAnswerModalWrap, ShakeContainer } from "./styled"
import { readyRoomSocketEvents } from "../../../../hook/readyRoomSocketEvent";
import { gameRoomSocketEvents } from "../../../../hook/gameRoomSocketEvents";
import { useStompContext } from "../../../../contexts/StompContext";
import { useGameState } from "../../../../contexts/GameStateContext/useGameState";
import { usePageLeave } from "../../../../hook/pageLeaveHandler";
import { useGameUser } from "../../../../contexts/GameUserContext/useGameUser";
import { useTeamState } from "../../../../contexts/TeamStateContext/useTeamState";
import { QuizResponse } from "../../../../types/quiz";
import { Quiz } from "../../../../types/quiz";
import { Modal } from "../../../../components/modal";
import { GamePlayEvents, GameStatus } from "../../../../types/game";
import { TeamType } from "../../../../types/teamuser";
import useButtonSoundEffect from "../../../../hook/useHoverSoundEffect";
import { MultiAnimationBackgroundOverlay, MultiAnimationTextLarge } from "../../../../modules/room/components/attack/styled";
import { MultiBackgroundRoom } from "../../room/styled";
import { ScreenSharedBorder, ScreenSharedText } from "../../../../modules/quiz/components/multi/Answer/styled";

// 수비팀 최종 정답 선택 페이지
// 이 부분은 화면이 모두 공유된다!
interface SelectAnswerPageProps {
    selectedQuiz: Quiz | null;
    userAnswers: QuizResponse | null;
    prepareNextRound: (event: GamePlayEvents, team: TeamType, health: number) => Promise<void>;
    roomId: string;
}

export const SelectAnswerPage = ({ selectedQuiz, userAnswers, prepareNextRound , roomId}: SelectAnswerPageProps) => {
    const { stompClient } = useStompContext();
    const { roomUserId, _roomId, gameState, defenceFinalAnswer, quizResult, gradeResponse, winnerTeam } = useGameState();
    const { user } = useGameUser();
    const { attackTeam } = useTeamState();
    const defenceTeam = attackTeam == 'BLUE' ? 2 : 1; // 수비팀의 팀이 반드시 들어가야 하기 때문!
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [showSwitchModal, setShowSwitchModal] = useState(false);
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
            if (quizResult === true) {
                const correctAudio = new Audio("/sounds/correct.mp3"); // 정답 음원 경로
                correctAudio.play();
            } else if (quizResult === false) {
                const wrongAudio = new Audio("/sounds/wrong.mp3"); // 오답 음원 경로
                wrongAudio.play();
            }

            return () => {
                clearTimeout(timeoutId);
                clearInterval(intervalId);
            };
        }
    }, [quizResult]);

    useEffect(() => {
        // 모달이 열릴 때 효과음 재생
        if (modalVisible) {
            const soundEffect = new Audio("/sounds/bell.mp3"); // 효과음 경로
            soundEffect.volume = 0.05;
            soundEffect.play().catch((error) => console.error("효과음 재생 실패:", error));
        }
    }, [isModalOpen]);


    useEffect(() => {
        // 종료 시그널이 없다면 재시작.
        if (countdown === 0 && gradeResponse) {
            // 게임 종료가 나오면 화면 이동
            if (gameState === GameStatus.ENDED) {

                // 2. Subscribe unconnected
                if (winnerTeam == null) {
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

            // 카운트다운이 끝난 후 공수 변경 모달 띄우기
            setShowSwitchModal(true);

            // 공수 변경 모달이 열릴 때 음원 재생
            const soundEffect = new Audio("/sounds/short_base.mp3"); // 공수 변경 음원 경로
            soundEffect.volume = 0.1; // 음량 0.5로 설정
            soundEffect.play().catch((error) => console.error("효과음 재생 실패:", error));

            // 3초 후에 공수 변경
            setTimeout(() => {
                prepareNextRound(
                    gradeResponse.responseStatus,
                    gradeResponse.nextOffenseTeam,
                    gradeResponse.teamHp
                );
                setShowSwitchModal(false); // 모달을 닫음
            }, 3000);
        }
    }, [countdown, gradeResponse]);


    const [modalVisible, setModalVisible] = useState(true);

    useEffect(() => {
        // 3초 후 모달을 자동으로 숨기도록 설정
        const timer = setTimeout(() => {
            setModalVisible(false);
        }, 3000);

        return () => clearTimeout(timer); // 타이머 정리
    }, []);

    return (
        <>
        {user?.team === attackTeam && <ScreenSharedBorder><ScreenSharedText>🔴 수비팀 화면입니다 </ScreenSharedText></ScreenSharedBorder>}
        <MultiBackgroundRoom>
            {modalVisible && (
                <>
                    <MultiAnimationBackgroundOverlay />
                    <MultiAnimationModalContainerPop>
                        <MultiAnimationTextLarge>최종답안 선택</MultiAnimationTextLarge>
                    </MultiAnimationModalContainerPop>
                </>
            )}
            {showSwitchModal && (
                <>
                    <MultiAnimationBackgroundOverlay />
                    <MultiAnimationModalContainerPop>
                        <MultiAnimationTextLarge>공수 변경</MultiAnimationTextLarge>
                    </MultiAnimationModalContainerPop>
                </>
            )}
            {isModalOpen && (
                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <SelectAnswerModalContainer>
                        <SelectAnswerModalWrap>
                            {quizResult === false ? (
                                <ShakeContainer>
                                    <SelectAnswerModalImg src="/icons/wrong.svg" />
                                    <SelectAnswerModalTitle>오답입니다!</SelectAnswerModalTitle>
                                </ShakeContainer>
                            ) : (
                                <>
                                    <SelectAnswerModalImg src="/icons/correct.svg" />
                                    <SelectAnswerModalTitle>정답입니다!</SelectAnswerModalTitle>
                                </>
                            )}
                        </SelectAnswerModalWrap>
                        <SelectAnswerModalText>{countdown}초 후에 공격팀이 변경됩니다.</SelectAnswerModalText>
                    </SelectAnswerModalContainer>
                </Modal>
            )}
            <TeamHeaderContainer>
                <TeamHeaderTag teamId={defenceTeam}>{defenceTeam}팀</TeamHeaderTag>
                <TeamHeaderTitle>최종 제출할 답안을 선택해주세요.</TeamHeaderTitle>
            </TeamHeaderContainer>
            <SelectAnswerContainer>
                <SolvingHeaderComponent />
                <AnswerSelectComponent selectedQuiz={selectedQuiz}
                    userAnswers={userAnswers} />
                <SelectAnswerButtonWrap>
                    <SecondaryButtonSmall onClick={() => {
                        if (roomUserId) {
                            readyRoomSocketEvents.userExitRoom(stompClient, _roomId, roomUserId);
                            navigate(SERVICES.MULTI);
                        }
                    }}>나가기</SecondaryButtonSmall>
                    <BlackButtonSmall className="click-sound" onClick={submitFinalAnswerSelect}>선택완료</BlackButtonSmall>
                </SelectAnswerButtonWrap>
                <UserTagsComponent teamId={defenceTeam} roomId= {roomId}/>
            </SelectAnswerContainer>
        </MultiBackgroundRoom>
        </>
    )
}