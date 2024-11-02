import { useState } from "react";
import { MyPageLabel, MyPageWrap } from "../../../../pages/mypage/styled";
import { MyPageCategoryContainer, MyPageCategoryTab, MyPageProblemContainer, MyPageProblemSelectImg, MyPageProblemSelectRow, MyPageProblemSelectText, MyPageProblemTitle, MyPageProblemWrap, MyPageRightWrap } from "./styled";

export default function MyPageRightSection() {
    const [selectedCategory, setSelectedCategory] = useState("OS");

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <MyPageWrap>
            <MyPageLabel>틀린 문제</MyPageLabel>
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
                        <MyPageProblemTitle>
                            다음 중 깊이 우선 탐색(DFS, Depth-First Search) 알고리즘에 대한 설명으로 틀린 것을 고르세요.
                        </MyPageProblemTitle>
                        <MyPageProblemSelectRow>
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
                        </MyPageProblemSelectRow>
                    </MyPageProblemWrap>
                </MyPageProblemContainer>
            </MyPageRightWrap>
        </MyPageWrap>
    );
}
