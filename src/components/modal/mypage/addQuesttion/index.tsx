// AddProblemModal.tsx
import { IModalProps, Modal } from "../..";
import { CreateQuistionModalButtonWrap, CreateQuistionModalContainer, CreateQuistionModalTitle, CreateQuiz, CreateQuizCheckbox, CreateQuizContainer, CreateQuizWrap } from "./styled";
import { BlackButtonSmall } from "../../../buttons/styled";
import { useEffect, useState } from "react";
import { Quiz } from "../../../../types/quiz";
import { useNavigate } from "react-router-dom";
import { MyPageCategoryContainer, MyPageCategoryTab } from "../../../../modules/mypage/components/right/styled";
import { useAlert } from "../../../confirmPopup";
import useButtonSoundEffect from "../../../../hook/useHoverSoundEffect";

interface CreateQuizProps {
    quizData: Quiz[];
    selectedType: string;
    onClose: () => void;
    onDone: () => void;
}

export const AddProblemModal = ({
    quizData,
    selectedType,
    onClose,
    onDone,
    ...props
}: IModalProps & CreateQuizProps) => {
    const [selectedProblems, setSelectedProblems] = useState<Quiz[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("OS");
    const [isQuizDataValid, setIsQuizDataValid] = useState(true);
    const navigate = useNavigate();
    const customAlert = useAlert();
    useButtonSoundEffect()

    useEffect(() => {
        if (props.open) {
            setSelectedProblems([]); // 모달이 열릴 때 선택 초기화
            setIsQuizDataValid(quizData.length > 0);
        }
    }, [props.open]);

    const handleQuizSelection = (quiz: Quiz) => {
        if (selectedProblems.some(q => q.quizName === quiz.quizName)) {
            setSelectedProblems(selectedProblems.filter(q => q.quizName !== quiz.quizName));
        } else {
            setSelectedProblems([...selectedProblems, quiz]);
        }

        console.log("Updated selectedProblems:", selectedProblems);
    };

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const handleSubmitQuiz = async () => {
        const userAccessToken = localStorage.getItem("AccessToken");
        const userUuid = localStorage.getItem("uuid");
        const API_URL = selectedType === "객관식" ? "/api/util/quiz-insertion/multiple-choice/multiple" : "/api/util/quiz-insertion/short-answer/multiple";
        console.log("Submitting selected problems:", selectedProblems);

        try {
            const requestBody = selectedProblems.map((quiz) => {
                if (selectedType === "객관식") {
                    return {
                        categoryType: selectedCategory,
                        name: quiz.quizName,
                        type: "객관식",
                        choice1: quiz.choice1,
                        choice2: quiz.choice2,
                        choice3: quiz.choice3,
                        choice4: quiz.choice4,
                        answer: quiz.answer
                    };
                } else {
                    return {
                        categoryType: selectedCategory,
                        name: quiz.quizName,
                        type: "주관식",
                        englishAnswer: quiz.englishAnswer,
                        koreanAnswer: quiz.koreanAnswer
                    };
                }
            });

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userAccessToken}`,
                    "uuid": `${userUuid}`,
                    "RefreshToken": `${localStorage.getItem("RefreshToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uuid: userUuid, quizList: requestBody })
            });

            if (response.ok) {
                await customAlert("문제 제출이 완료되었습니다!");
                onDone();
                navigate("/mypage");
            } else {
                console.error("Failed to submit quiz data:", response.status);
            }
        } catch (error) {
            console.error("Error submitting quiz data:", error);
            await customAlert("문제 제출 중 오류가 발생했습니다.");
        }
    };

    const handleCancelQuiz = () => {
        onClose();
        window.location.reload();
    };

    const filteredQuizData = quizData.filter(quiz => Array.isArray(quiz.categoryType) && quiz.categoryType.includes(selectedCategory));

    return (
        <Modal {...props} open={props.open} onClose={onClose} onDone={onDone} >
            <CreateQuistionModalContainer>
                <CreateQuistionModalTitle>생성된 문제 보기</CreateQuistionModalTitle>
                <MyPageCategoryContainer>
                    {["OS", "알고리즘", "네트워크", "자료구조", "데이터베이스"].map((category) => (
                        <MyPageCategoryTab
                            className="click-sound"
                            key={category}
                            isSelected={selectedCategory === category}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </MyPageCategoryTab>
                    ))}
                </MyPageCategoryContainer>

                {!isQuizDataValid && <div>주제와 맞지 않은 내용을 입력하셨습니다. 다시 입력해주세요.</div>}
                {isQuizDataValid && (
                    <>
                        <div>선택된 문제 유형: {selectedType}</div>
                        <div>출제하고 싶은 문제를 선택해주세요! (중복가능)</div>
                        <CreateQuizContainer>
                            <CreateQuizWrap>
                                {filteredQuizData.length > 0 ? (filteredQuizData.map((quiz) => (
                                    <CreateQuiz key={quiz.quizName}>
                                        <CreateQuizCheckbox
                                            className="click-sound"
                                            src={selectedProblems.some(q => q.quizName === quiz.quizName) ? "/icons/checkbox_filled.svg" : "/icons/checkbox_base.svg"}
                                            onClick={() => handleQuizSelection(quiz)}
                                        />
                                        <div>
                                            {selectedType === "객관식" ? (
                                                <>
                                                    {quiz.quizName}
                                                    <div>1. {quiz.choice1}</div>
                                                    <div>2. {quiz.choice2}</div>
                                                    <div>3. {quiz.choice3}</div>
                                                    <div>4. {quiz.choice4}</div>
                                                    <div>정답: {quiz.answer}</div>
                                                </>
                                            ) : (
                                                <>
                                                    {quiz.quizName}
                                                    <div>정답: {quiz.englishAnswer}</div>
                                                    <div>정답: {quiz.koreanAnswer}</div>
                                                </>
                                            )}
                                        </div>
                                    </CreateQuiz>
                                ))
                                ) : (
                                    <div>해당 주제에 대한 문제가 없습니다.</div>
                                )}
                            </CreateQuizWrap>
                        </CreateQuizContainer>
                    </>
                )}
                <CreateQuistionModalButtonWrap>
                    {isQuizDataValid && <BlackButtonSmall onClick={handleSubmitQuiz}>제출하기</BlackButtonSmall>}
                    <BlackButtonSmall onClick={handleCancelQuiz}>닫기</BlackButtonSmall>
                </CreateQuistionModalButtonWrap>
            </CreateQuistionModalContainer>
        </Modal>
    );
}