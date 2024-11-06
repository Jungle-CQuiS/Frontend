import { useEffect, useRef, useState } from "react";
import { MyPageLabel, MyPageWrap } from "../../../../pages/mypage/styled";
import { MyPageCategoryContainer, MyPageCategoryTab, MyPageProblemContainer, MyPageProblemSelectImg, MyPageProblemSelectRow, MyPageProblemSelectText, MyPageProblemTitle, MyPageProblemWrap, MyPageRightWrap } from "./styled";

export default function MyPageRightSection() {
    const [selectedCategory, setSelectedCategory] = useState("OS");
    const [wrongQuizIds, setWrongQuizIds] = useState('');

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const isFetched = useRef(false); // 중복호출 방지용

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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uuid: userUuid })
            });

            if (response.ok) {
                const data = await response.json();
                setWrongQuizIds(data.data.wrongQuizIds);   
            } else {
                console.error("틀린문제 정보를 받아오는데 실패하였습니다.");
            }
        } catch (error) {
            console.error("틀린문제 정보를 받아오는데 실패하였습니다", error);
        }
    }

    useEffect(() => {
        if(!isFetched.current){
            updateWrongQuiz();
            isFetched.current = true; // 호출 후 true로 설정하여 다시 호출되지 않도록 설정
        }
    }, []);

    return (
        <MyPageWrap>
            <MyPageLabel>내가 틀렸던 문제</MyPageLabel>
            <MyPageRightWrap>
                <MyPageCategoryContainer>
                    {["OS", "알고리즘", "네트워크", "자료구조", "데이터베이스"].map((category) => (
                        <MyPageCategoryTab
                            key={category}
                            isSelected={selectedCategory === category}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </MyPageCategoryTab>
                    ))}
                </MyPageCategoryContainer>
                <MyPageProblemContainer>
                    {/* OS 문제 예시 */}
                    <MyPageProblemWrap>
                    {/* <CategoryWrongResult>
                    </CategoryWrongResult> */}
                        <MyPageProblemTitle>
                            {wrongQuizIds}
                        </MyPageProblemTitle>
                        {/* <MyPageProblemSelectRow>
                            <MyPageProblemSelectImg src="/icons/number_1.svg" />
                            <MyPageProblemSelectText>그래프나 트리의 모든 노드를 방문하는 알고리즘이다.</MyPageProblemSelectText>
                        </MyPageProblemSelectRow>
                        <MyPageProblemSelectRow>
                            <MyPageProblemSelectImg src="/icons/number_2.svg" />
                            <MyPageProblemSelectText>너비 우선 탐색(BFS)보다 일반적으로 더 적은 메모리를 사용한다.</MyPageProblemSelectText>
                        </MyPageProblemSelectRow>
                        <MyPageProblemSelectRow>
                            <MyPageProblemSelectImg src="/icons/number_3.svg" />
                            <MyPageProblemSelectText>스택이나 재귀를 사용하여 구현할 수 있다.</MyPageProblemSelectText>
                        </MyPageProblemSelectRow>
                        <MyPageProblemSelectRow>
                            <MyPageProblemSelectImg src="/icons/number_4.svg" />
                            <MyPageProblemSelectText>최단 경로를 찾는 데 항상 최적의 결과를 보장한다.</MyPageProblemSelectText>
                        </MyPageProblemSelectRow> */}
                    </MyPageProblemWrap>
                </MyPageProblemContainer>
            </MyPageRightWrap>
        </MyPageWrap>
    );
}
