import { useState } from "react";
import { BlackButtonSmall } from "../../../../../components/buttons/styled";
import { AnswerSelectContainer, AnswerSelectWrap, AnswerSelectCheckbox, AnswerSelectText, AnswerSelectRow 
    , ScreenSharedBorder , ScreenSharedText,
    SelectText,
    SelectBox,
    SelectContainer} from "./styled";
import { LookQuestionModal } from "../../../../../components/modal/lookQuestion";
import { QuizResponse } from "../../../../../types/quiz";
import { Quiz } from "../../../../../types/quiz";
import { useGameState } from "../../../../../contexts/GameStateContext/useGameState";
import { useGameUser } from "../../../../../contexts/GameUserContext/useGameUser";
import { useTeamState } from "../../../../../contexts/TeamStateContext/useTeamState";
import { useStompContext } from "../../../../../contexts/StompContext";
import { gameRoomSocketEvents } from "../../../../../hook/gameRoomSocketEvents";
interface SubjectiveAnswerState {
    value: string;
    reason: string;
    roomUserId: number;
    isSelected: boolean;
}

interface ObjectiveAnswerState {
    choice: number;
    reasonList: string[];
    indexList: string[];
    isSelected: boolean;
}
type AnswerState = SubjectiveAnswerState[] | ObjectiveAnswerState[];
interface SelectAnswerPageProps {
    selectedQuiz: Quiz | null;
    userAnswers: QuizResponse | null; // 앞서 정의한 QuizResponse 타입 사용
}

export default function AnswerSelectComponent({ selectedQuiz, userAnswers }: SelectAnswerPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { _roomId, getDefenceFinalAnswer, selectedQuizId, initLeaderSelectQuizeId } = useGameState();
    const { user } = useGameUser();
    const { stompClient } = useStompContext();
    const { attackTeam } = useTeamState();
    // answers 상태를 QuizType에 따라 다르게 초기화
    const [answers, setAnswers] = useState(() => {

        if (!userAnswers || !userAnswers.answerList) return [];

        if (userAnswers.quizType === "주관식") {
            return userAnswers.answerList.map(item => ({
                value: item.answer,
                reason: item.reason,
                roomUserId: item.roomUserId,
                isSelected: false
            }));
        } else {
            return userAnswers.answerList.map(item => ({
                choice: item.choice,
                reasonList: item.reasonList,
                indexList: item.indexList,
                isSelected: false
            }));
        }
    });
    const isSubjectiveAnswers = (answers: AnswerState): answers is SubjectiveAnswerState[] => {
        if (!Array.isArray(answers) || answers.length === 0) return false;
        
        // 첫 번째 요소로 타입 체크
        const firstAnswer = answers[0];
        return 'value' in firstAnswer && 
               'reason' in firstAnswer && 
               'roomUserId' in firstAnswer && 
               'isSelected' in firstAnswer;
    };
    const handleSelect = (index: number) => {
        if (!user?.isLeader || user?.team === attackTeam) return;

        setAnswers(prev => {
            if (isSubjectiveAnswers(prev)) {
                return prev.map((answer, i) => ({
                    ...answer,
                    isSelected: i === index
                }));
            } else {
                return prev.map((answer, i) => ({
                    ...answer,
                    isSelected: i === index
                }));
            }
        });

        console.log("final select", index);
        getDefenceFinalAnswer(index);
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
        gameRoomSocketEvents.defSelectQuiz(stompClient, _roomId, leaderSelect);
    }
    console.log("ajlsnfoa;eisfjoaisef", answers);

    return (
        <>
        <AnswerSelectContainer>
            <BlackButtonSmall onClick={handleOpenModal}>문제보기</BlackButtonSmall>
            <AnswerSelectWrap>
                {isSubjectiveAnswers(answers) ? (
                    // 주관식 답변 렌더링
                    answers.map((answer, index) => (
                        <AnswerSelectRow key={index} onClick={() => handleSelect(index)}>
                            <AnswerSelectCheckbox
                                className="click-sound"
                                src={index === selectedQuizId ? "/icons/checkbox_filled.svg" : "/icons/checkbox_base.svg"}
                                onClick={() => {
                                    if(user?.team === attackTeam) return;
                                    if (user?.isLeader ) {
                                        initLeaderSelectQuizeId(index);
                                        updateLeaderSelect(index);
                                    }
                                }}
                            />
                            <SelectBox>
                                <SelectText> </SelectText>
                                <SelectText>{answer.value}</SelectText>
                                <SelectText>- {answer.reason}</SelectText>
                            </SelectBox>
                        </AnswerSelectRow>
                    ))
                ) : (
                    // 객관식 답변 렌더링
                    answers.map((answer, index) => (
                        <AnswerSelectRow key={index} onClick={() => handleSelect(index)}>
                            <AnswerSelectCheckbox
                                className="click-sound"
                                src={index === selectedQuizId ? "/icons/checkbox_filled.svg" : "/icons/checkbox_base.svg"}
                                onClick={() => {
                                    if(user?.team === attackTeam) return;
                                    if (user?.isLeader) {
                                        const selectedIndex = answers[index].indexList[0];
                                        initLeaderSelectQuizeId(parseInt(selectedIndex));
                                        updateLeaderSelect(parseInt(selectedIndex));
                                    }
                                }}
                            />
                            <SelectBox>
                                <img src={`/icons/number_black_${answer.choice}.svg`} />
                                {answer.reasonList.map((reason, i) => (
                                    <SelectText key={i}> - {reason}</SelectText>
                                ))}
                            </SelectBox>
                        </AnswerSelectRow>
                    ))
                )}
            </AnswerSelectWrap>
            <LookQuestionModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onDone={handleDone}
                selectedQuiz={selectedQuiz}
            />
        </AnswerSelectContainer>
        </>
    );
}
