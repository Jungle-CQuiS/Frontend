// AddProblemPage.tsx
import { SetStateAction, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "../../../components/background/styled";
import { PrimaryButtonMedium, SecondaryButtonSmall } from "../../../components/buttons/styled";
import { AddProblemButtonWrap, AddProblemCategoryWrap, AddProblemContainer, AddProblemHeader, AddProblemHeaderImg, AddProblemHeaderTitle, AddProblemInputLong, AddProblemLabel, AddProblemTab, AddProblemWrap, CreateQuizNumber, TooltipContainer } from "./styled";
import { AddProblemModal } from "../../../components/modal/mypage/addQuesttion";
import { LoadingQuestion } from "./LoadingQuestion";
import useButtonSoundEffect from "../../../hook/useHoverSoundEffect";
import { Tooltip } from "react-tooltip";

export default function AddProblemPage() {
    const navigate = useNavigate();

    const [selectedType, setSelectedType] = useState("객관식");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sendCalled = useRef(false); // 중복 호출 방지
    const [problemContent, setProblemContent] = useState("");
    const [value, setValue] = useState(1);
    const [modalData, setModalData] = useState([]);
    const [loadingQuestion, setLoadingQuestion] = useState(false);
    useButtonSoundEffect()

    const handleCancel = () => {
        navigate("/mypage");
    };

    const handleOpenModal = async () => {
        setLoadingQuestion(true);
        const successModal = await sendTextQuiz();
        setLoadingQuestion(false);
        if (successModal) {
            setIsModalOpen(true);
        }
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleDone = () => {
        setIsModalOpen(false);
    };
    const handleProblemContentChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setProblemContent(e.target.value);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    };

    const sendTextQuiz = async () => {
        if (sendCalled.current) return false;
        sendCalled.current = true;

        const userAccessToken = localStorage.getItem("AccessToken");
        const userUuid = localStorage.getItem("uuid");
        const API_URL = selectedType === "객관식" ? "/api/util/quiz-creation/choice-answer" : "/api/util/quiz-creation/short-answer";
        const formattedContent = problemContent.replace(/\n/g, ""); // 줄 바꿈 없애기

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userAccessToken}`,
                    "uuid": `${userUuid}`,
                    "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    textData: formattedContent,
                    quizCount: value
                })
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Received data:", data);

                const quizData = data.data || [];
                const formattedData = quizData.map((quiz: any) => {
                    if (selectedType === "객관식") {
                        return {
                            ...quiz,
                            displayText: `${quiz.quizName}\n1) ${quiz.choice1}\n2) ${quiz.choice2}\n3) ${quiz.choice3}\n4) ${quiz.choice4}\n정답: ${quiz[`choice${quiz.answer}`]}`
                        };
                    } else {
                        return {
                            ...quiz,
                            displayText: `${quiz.quizName}\n답: ${quiz.koreanAnswer}\n답: ${quiz.englishAnswer}`
                        };
                    }
                });
                setModalData(formattedData);
                console.log("Quiz data make successfully");
                return true;
            } else {
                console.error("Failed to make quiz data:", response.status);
                return false;
            }
        } catch (error) {
            console.error("Error make quiz data:", error);
            return false;
        }
    };

    return (
        <Background>
            {loadingQuestion ? (<LoadingQuestion />) :
                (<AddProblemContainer>
                    <AddProblemHeader>
                    <AddProblemHeaderTitle>문제 등록하기</AddProblemHeaderTitle>
                        <TooltipContainer>
                            <AddProblemHeaderImg
                                src="/icons/question.svg"
                                data-tooltip-id="tooltip"
                            />
                            <Tooltip id="tooltip" place="bottom" className="tooltip-custom">
                                공부할 때 사용했던 블로그나 글을 복사해서 입력하면 그에 대한 문제가 출제가 됩니다.
                                종류와 문제 수에 맞게 문제가 생성되니 선택해주세요.
                            </Tooltip>
                        </TooltipContainer>
                    </AddProblemHeader>
                    <AddProblemCategoryWrap>
                    </AddProblemCategoryWrap>
                    <AddProblemCategoryWrap>
                        <AddProblemLabel>종류</AddProblemLabel>
                        {["객관식", "주관식"].map((type) => (
                            <AddProblemTab
                                className="click-sound"
                                key={type}
                                isSelected={selectedType === type}
                                onClick={() => setSelectedType(type)}
                            >
                                {type}
                            </AddProblemTab>
                        ))}
                    </AddProblemCategoryWrap>
                    <AddProblemCategoryWrap>
                        <AddProblemLabel>문제수</AddProblemLabel>
                        <CreateQuizNumber
                            type="number"
                            id="participants"
                            name="participants"
                            min="1"
                            value={value}
                            onChange={handleChange}
                        />
                    </AddProblemCategoryWrap>
                    <AddProblemWrap>
                        <AddProblemLabel>문제 만들기</AddProblemLabel>
                        <AddProblemInputLong
                            placeholder="공부한 내용을 입력해주세요."
                            value={problemContent}
                            onChange={handleProblemContentChange}
                        />
                    </AddProblemWrap>
                    <AddProblemButtonWrap>
                        <SecondaryButtonSmall onClick={handleCancel}>취소하기</SecondaryButtonSmall>
                        <PrimaryButtonMedium onClick={handleOpenModal}>문제생성</PrimaryButtonMedium>
                    </AddProblemButtonWrap>
                    <AddProblemModal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        onDone={handleDone}
                        quizData={modalData}
                        selectedType={selectedType}
                    />
                </AddProblemContainer>
                )}
        </Background>
    );
}