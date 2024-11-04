import { QuizTypeProps } from "../../../../../types/quiz";
import {
    SingleModeQuizBoxBottom,
    SingleModeQuizBoxBottomBadImg,
    SingleModeQuizBoxBottomBadText,
    SingleModeQuizBoxBottomBadWrap,
    SingleModeQuizBoxBottomSelect,
    SingleModeQuizBoxBottomSelectContainer,
    SingleModeQuizBoxBottomSelectImg,
    SingleModeQuizBoxBottomSelectWrap,
    SingleModeQuizBoxcontainer,
    SingleModeQuizBoxNumber,
    SingleModeQuizBoxTitle,
    SingleModeQuizBoxWrap
} from "./styled";

export const SingleModeQuizBox = ({ type }: QuizTypeProps) => {
    // 문제 선택지를 생성하는 함수
    const renderChoices = () => {
        const choices = [
            { id: 1, text: "그래프나 트리의 모든 노드를 방문하는 알고리즘이다." },
            { id: 2, text: "너비 우선 탐색(BFS)보다 일반적으로 더 적은 메모리를 사용한다." },
            { id: 3, text: "스택이나 재귀를 사용하여 구현할 수 있다." },
            { id: 4, text: "최단 경로를 찾는 데 항상 최적의 결과를 보장한다." }
        ];

        return choices.map(choice => (
            <SingleModeQuizBoxBottomSelectWrap key={choice.id}>
                <SingleModeQuizBoxBottomSelectImg src={`/icons/number_${choice.id}.svg`} />
                <SingleModeQuizBoxBottomSelect>{choice.text}</SingleModeQuizBoxBottomSelect>
            </SingleModeQuizBoxBottomSelectWrap>
        ));
    };

    return (
        <SingleModeQuizBoxcontainer>
            <SingleModeQuizBoxNumber>문제 1</SingleModeQuizBoxNumber>
            <SingleModeQuizBoxWrap>
                <SingleModeQuizBoxTitle>
                    다음 중 깊이 우선 탐색(DFS, Depth-First Search) 알고리즘에 대한 설명으로 틀린 것을 고르세요.
                </SingleModeQuizBoxTitle>
                <SingleModeQuizBoxBottom>
                    {type === "객관식" && (
                        <SingleModeQuizBoxBottomSelectContainer>
                            {renderChoices()}
                        </SingleModeQuizBoxBottomSelectContainer>
                    )}
                    <SingleModeQuizBoxBottomBadWrap>
                        <SingleModeQuizBoxBottomBadImg src="/icons/bad.svg" />
                        <SingleModeQuizBoxBottomBadText>별로에요</SingleModeQuizBoxBottomBadText>
                    </SingleModeQuizBoxBottomBadWrap>
                </SingleModeQuizBoxBottom>
            </SingleModeQuizBoxWrap>
        </SingleModeQuizBoxcontainer>
    );
};
