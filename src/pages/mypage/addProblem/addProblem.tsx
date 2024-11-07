// AddProblemPage.tsx
import { SetStateAction, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "../../../components/background/styled";
import { PrimaryButtonMedium, SecondaryButtonSmall } from "../../../components/buttons/styled";
import { AddProblemButtonWrap, AddProblemCategoryWrap, AddProblemContainer, AddProblemHeader, AddProblemHeaderImg, AddProblemHeaderTitle, AddProblemInputLong, AddProblemLabel, AddProblemTab, AddProblemWrap, CreateQuizNumber } from "./styled";
import { AddProblemModal } from "../../../components/modal/mypage/addQuesttion";

export default function AddProblemPage() {
    const navigate = useNavigate();

    const [selectedTopic, setSelectedTopic] = useState("OS");
    const [selectedType, setSelectedType] = useState("객관식");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sendCalled = useRef(false); // 중복 호출 방지
    const [problemContent, setProblemContent] = useState("");
    const [value, setValue] = useState(1);
    const [modalData, setModalData] = useState([]);

    const handleCancel = () => {
        navigate("/mypage");
    };

    const handleOpenModal = async () => {
        await sendTextQuiz();
        setIsModalOpen(true);
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
                    "RefreshToken": `${localStorage.getItem("RefreshToken")}`,
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
            <AddProblemContainer>
                <AddProblemHeader>
                    <AddProblemHeaderImg src="/icons/edit.svg" />
                    <AddProblemHeaderTitle>문제 등록하기</AddProblemHeaderTitle>
                </AddProblemHeader>
                <AddProblemCategoryWrap>
                    <AddProblemLabel>주제</AddProblemLabel>
                    {["OS", "자료구조", "알고리즘", "네트워크", "데이터베이스"].map((topic) => (
                        <AddProblemTab
                            key={topic}
                            isSelected={selectedTopic === topic}
                            onClick={() => setSelectedTopic(topic)}
                        >
                            {topic}
                        </AddProblemTab>
                    ))}
                </AddProblemCategoryWrap>
                <AddProblemCategoryWrap>
                    <AddProblemLabel>종류</AddProblemLabel>
                    {["객관식", "주관식"].map((type) => (
                        <AddProblemTab
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
                        max="10"
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
                    selectedTopic={selectedTopic}
                    selectedType={selectedType}
                />
            </AddProblemContainer>
        </Background>
    );
}