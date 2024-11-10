import { useState, useRef, useEffect } from "react";
import { MyPageLabel, MyPageWrap } from "../../../../pages/mypage/styled";
import { Quiz } from "../../../../types/quiz";
import { MyPageRightWrap, MyPageCategoryContainer, MyPageCategoryTab, MyPageProblemContainer, MyPageProblemWrap, MyPageProblemTitle, MyPageProblemSelectRow, MyPageProblemSelectImg, MyPageProblemSelectText } from "./styled";

export default function MyPageRightSection() {
    const [selectedCategory, setSelectedCategory] = useState("OS");
    const [wrongQuizIds, setWrongQuizIds] = useState<Quiz[]>([]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const updateWrongQuiz = async () => {
        try {
            const userAccessToken = localStorage.getItem("AccessToken");
            const userUuid = localStorage.getItem("uuid");
            const API_URL = `api/users/quiz-wrong`;

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userAccessToken}`,
                    "uuid": `${userUuid}`,
                    "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uuid: userUuid, categoryType: selectedCategory })
            });

            if (response.ok) {
                const data = await response.json();
                const wrongQuizzes: Quiz[] = data.data.wrongQuizzes as Quiz[];

                const uniqueQuizzes: Quiz[] = Array.from(
                    new Map(wrongQuizzes.map((quiz) => [quiz.quizId, quiz])).values()
                );

                setWrongQuizIds(uniqueQuizzes);  
            } else {
                console.error("틀린문제 정보를 받아오는데 실패하였습니다.");
            }
        } catch (error) {
            console.error("틀린문제 정보를 받아오는데 실패하였습니다", error);
        }
    };

    // selectedCategory 변경 시마다 updateWrongQuiz 호출
    useEffect(() => {
        updateWrongQuiz();
    }, [selectedCategory]);  // selectedCategory가 변경될 때마다 호출됨

    const isMultipleChoice = (quiz: Quiz) => {
        return quiz.choice1 !== undefined && quiz.choice2 !== undefined && quiz.choice3 !== undefined && quiz.choice4 !== undefined;
    }

    const getChoiceStyle = (choice: string, quiz: Quiz) => {
        const choiceKey = `choice${quiz.answer}`;
        if (choice === choiceKey) {
            return { color: "#EE5567", fontWeight: "700" };
        }
        return {};
    };
    
    return (
        <MyPageWrap>
            <MyPageLabel>내가 틀렸던 문제</MyPageLabel>
            <MyPageRightWrap>
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
                <MyPageProblemContainer>
                    {wrongQuizIds.length > 0 ? (
                        wrongQuizIds.map((quiz) => (
                            <MyPageProblemWrap key={`quiz-${quiz.quizId}`}>
                                <MyPageProblemTitle>{quiz.name}</MyPageProblemTitle>
                                {isMultipleChoice(quiz) ? (
                                    ["choice1", "choice2", "choice3", "choice4"].map((choice, index) => (
                                        <MyPageProblemSelectRow key={`quiz-${quiz.quizId}-${index}`}>
                                            <MyPageProblemSelectImg src={`/icons/number_${index + 1}.svg`} />
                                            <MyPageProblemSelectText style={getChoiceStyle(choice, quiz)}>
                                                {quiz[choice as keyof Quiz]}
                                            </MyPageProblemSelectText>
                                        </MyPageProblemSelectRow>
                                    ))
                                ) : (
                                    <>
                                        <MyPageProblemSelectRow>
                                            <MyPageProblemSelectText>
                                                {quiz.koreanAnswer} ({quiz.englishAnswer})
                                            </MyPageProblemSelectText>
                                        </MyPageProblemSelectRow>
                                    </>
                                )}
                            </MyPageProblemWrap>
                        ))
                    ) : (
                        <MyPageProblemTitle>틀린 문제가 없습니다.</MyPageProblemTitle>
                    )}
                </MyPageProblemContainer>
            </MyPageRightWrap>
        </MyPageWrap>
    );
}
