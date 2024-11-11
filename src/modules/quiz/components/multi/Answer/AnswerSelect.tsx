import { useState } from "react";
import { BlackButtonSmall } from "../../../../../components/buttons/styled";
import { AnswerSelectContainer, AnswerSelectWrap, AnswerSelectCheckbox, AnswerSelectText, AnswerSelectRow } from "./styled";
import { LookQuestionModal } from "../../../../../components/modal/lookQuestion";
import { UserAnswer } from "../../../../../types/quiz";
import { Quiz } from "../../../../../types/quiz";
import { useGameState } from "../../../../../contexts/GameStateContext/useGameState";
import { useGameUser } from "../../../../../contexts/GameUserContext/useGameUser";
import { useTeamState } from "../../../../../contexts/TeamStateContext/useTeamState";
import { useStompContext } from "../../../../../contexts/StompContext";
import { gameRoomSocketEvents } from "../../../../../hook/gameRoomSocketEvents";
interface Answer {
  value: string;
  isSelected: boolean;
}

interface SelectAnswerPageProps {
    selectedQuiz: Quiz | null;
    userAnswers: UserAnswer[] | null;
}

export default function AnswerSelectComponent( { selectedQuiz ,userAnswers }: SelectAnswerPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { _roomId,getDefenceFinalAnswer ,selectedQuizId ,initLeaderSelectQuizeId } = useGameState();
    const {user} = useGameUser();
    const {stompClient} = useStompContext();
    const {attackTeam} = useTeamState();
    const [answers, setAnswers] = useState<Answer[]>(() => 
        userAnswers?.map((item , index) => ({
            value: item.answer,
            isSelected: false
        })) ?? []
    );

    const handleSelect = (index: number) => {
        if(!user?.isLeader || user?.team === attackTeam) return;

        setAnswers(answers.map((answer, i) => ({
            ...answer,
            isSelected: i === index
        })));

        console.log("final select", index);
        getDefenceFinalAnswer(index); // 정답 설정
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    const handleDone = () => {
        setIsModalOpen(false);
    };

    // Leader가 선택한 것을 APP으로 보낸다. 소켓 함수에 넣을 함수.
    const updateLeaderSelect = (leaderSelect: number) => {
        // 리더가 선택 한 답을 서버로 보낸다.
        gameRoomSocketEvents.defSelectQuiz(stompClient, _roomId,leaderSelect);
    }

    return (
        <AnswerSelectContainer>
            <BlackButtonSmall onClick={handleOpenModal}>문제보기</BlackButtonSmall>
            <AnswerSelectWrap>
                {answers.map((answer, index) => (
                    <AnswerSelectRow key={index} onClick={() => handleSelect(index)}>
                        <AnswerSelectCheckbox 
                            className="click-sound"
                            src={index === selectedQuizId? "/icons/checkbox_filled.svg" : "/icons/checkbox_base.svg"} 
                            onClick={() => {
                                if (user?.isLeader){ //Leader만 선택 가능하다.
                                    initLeaderSelectQuizeId(index);
                                    // 소켓 통신으로 다른 팀원들과 선택한 것 공유
                                    updateLeaderSelect(index);}
                            }}
                        />
                        <AnswerSelectText>{answer.value}</AnswerSelectText>
                    </AnswerSelectRow>
                ))}
            </AnswerSelectWrap>
            <LookQuestionModal 
                open={isModalOpen}
                onClose={handleCloseModal}
                onDone={handleDone}
                selectedQuiz={selectedQuiz}
            />
        </AnswerSelectContainer>
    );
}
