import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { SERVICES } from "../../../../config/api/constants";
import { Background } from "../../../../components/background/styled";
import { SecondaryButtonSmall, PrimaryButtonMedium } from "../../../../components/buttons/styled";
import CategoryComponent from "../../../../components/Category";
import { useConfirm } from "../../../../components/confirmPopup";
import QuizProblemsComponent from "../../../../components/quiz";
import { Timer } from "../../../../components/timer/timer";
import { TeamHeaderComponent } from "../../../quiz/components/multi/TeamHeader/TeamHeader";
import { UserTagsComponent } from "../../../quiz/components/multi/UserTags/UserTags";
import { MultiGameBackground, MultiGameAttackContainer, MutliGameAttackTimerWrap, MultiGameAttackTimer, MultiGameAttackTimerText, MultiGameAttackQuizContainer, MultiGameAttackQuizWrap, MultiGameAttackQuiz, MultiGameAttackQuizCheckbox, MultiGameAttackButtonWrap } from "./styled";
import { Quiz } from "../../../../types/quiz";
import { readyRoomSocketEvents } from "../../../../hook/readyRoomSocketEvent";
import { useStompContext } from "../../../../contexts/StompContext";
import { useGameState } from "../../../../contexts/GameStateContext/useGameState";
import { useGameUser } from "../../../../contexts/GameUserContext/useGameUser";
import { useTeamState } from "../../../../contexts/TeamStateContext/useTeamState";
import { gameRoomSocketEvents } from "../../../../hook/gameRoomSocketEvents";
import { usePageLeave } from "../../../../hook/pageLeaveHandler";

interface AttackPageProps {
    onSelectionComplete: (quiz: Quiz) => void;
}

export default function AttackPage({ onSelectionComplete }: AttackPageProps) {
    const customConfirm = useConfirm();
    const [timeLeft, setTimeLeft] = useState(60);
    const [quizData, setQuizData] = useState<Quiz[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("OS");
    const fetchCalled = useRef(false); // API 중복 호출 방지용 ref
    const navigate = useNavigate();

    usePageLeave();

    // CONTEXT
    const { stompClient } = useStompContext();
    const { roomUserId, _roomId , selectedQuizId, initLeaderSelectQuizeId } = useGameState();
    const { user } = useGameUser(); // User Info
    const { attackTeam } = useTeamState();
    const teamId = user?.team == 'BLUE' ? 1 : 2;

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else {
            handleSelectionComplete();
        }
    }, [timeLeft]);

    const handleLeaveRoom = async () => {
        const confirmed = await customConfirm("정말 나가시겠습니까?");
        if (confirmed && roomUserId) {
            console.log("나감");  // TODO: 방 나감
            readyRoomSocketEvents.userExitRoom(stompClient, _roomId, roomUserId);

            navigate(SERVICES.MULTI);
        }
    };

    useEffect(() => {
        const fetchQuizData = async () => {
            if (fetchCalled.current) return; // 이미 호출된 경우 실행하지 않음
            fetchCalled.current = true;

            const userAccessToken = localStorage.getItem("AccessToken");
            const userUuid = localStorage.getItem("uuid");
            const API_URL = `/api/quiz/multi/random-quizzes/${_roomId}`;

            try {
                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userAccessToken}`,
                        "uuid": `${userUuid}`,
                        "RefreshToken": `${localStorage.getItem("RefreshToken")}`,
                        "Accept": "application/json"
                    },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setQuizData(responseData.data.randomQuizList);

                    const osQuizzes = responseData.data.randomQuizList.filter((quiz: any) => quiz.categoryType === "OS");
                    if (osQuizzes.length > 0) {
                        initLeaderSelectQuizeId(osQuizzes[0].quizId);
                    }
                    console.log("<AttackPage>새로운 문제 패치 완료");
                } else {
                    console.error("Failed to fetch quiz data:", response.status);
                }
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }

            
        };

        fetchQuizData();
    
    }, [attackTeam]);

    const filteredQuizData = quizData.filter(quiz => quiz.categoryType === selectedCategory).slice(0, 2);

    const handleSelectionComplete = () => {
        if(!user?.isLeader) return;

        const selectedQuiz = quizData.find(quiz => quiz.quizId === selectedQuizId);
        if (selectedQuizId && selectedQuiz) {
            gameRoomSocketEvents.selectQuizeLeaderFinal(stompClient, _roomId, selectedQuizId );
            onSelectionComplete(selectedQuiz);
        }
    };

    // Leader가 선택한 것을 APP으로 보낸다. 소켓 함수에 넣을 함수.
    const updateLeaderSelect = (leaderSelect: number) => {
        // 리더가 선택 한 답을 서버로 보낸다.
        gameRoomSocketEvents.selectQuiz(stompClient, _roomId,leaderSelect);
    }

   

    
    

    return (
        <Background>
            <MultiGameBackground>
                <TeamHeaderComponent teamId={teamId} isAttackTeam={user?.team == attackTeam ? true : false} />
                <MultiGameAttackContainer>
                    <MutliGameAttackTimerWrap>
                        <Timer />
                        <MultiGameAttackTimer>{timeLeft}초&nbsp;</MultiGameAttackTimer>
                        <MultiGameAttackTimerText>남았습니다!!</MultiGameAttackTimerText>
                    </MutliGameAttackTimerWrap>
                    <MultiGameAttackQuizContainer>
                        <CategoryComponent onSelectCategory={setSelectedCategory} />
                        <MultiGameAttackQuizWrap>
                            {filteredQuizData.map((quiz, index) => (
                                <MultiGameAttackQuiz key={quiz.quizId}>
                                    <MultiGameAttackQuizCheckbox
                                        src={quiz.quizId === selectedQuizId ? "/icons/checkbox_filled.svg" : "/icons/checkbox_base.svg"}
                                        onClick={() => {
                                            if (user?.isLeader){ //Leader만 선택 가능하다.
                                                initLeaderSelectQuizeId(quiz.quizId);
                                                // 소켓 통신으로 다른 팀원들과 선택한 것 공유
                                                updateLeaderSelect(quiz.quizId);}
                                        }}
                                    />
                                   <QuizProblemsComponent quiz={quiz} /> 
                                </MultiGameAttackQuiz>
                            ))}
                        </MultiGameAttackQuizWrap>
                    </MultiGameAttackQuizContainer>
                    <MultiGameAttackButtonWrap>
                        <SecondaryButtonSmall onClick={handleLeaveRoom}>나가기</SecondaryButtonSmall>
                        <PrimaryButtonMedium onClick={handleSelectionComplete}>선택완료</PrimaryButtonMedium>
                    </MultiGameAttackButtonWrap>
                </MultiGameAttackContainer>
                <UserTagsComponent teamId={teamId} />
            </MultiGameBackground>
        </Background>
    );
}
