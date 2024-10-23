import { ProblemsContainer, ProblemTitle, ProblemSelectContainer, ProblemSelectWrap, ProblemSelectImg, ProblemSelectText } from "./styled";

const quizOptions = [
    {
        id: 1,
        text: "그래프나 트리의 모든 노드를 방문하는 알고리즘이다."
    },
    {
        id: 2,
        text: "너비 우선 탐색(BFS)보다 일반적으로 더 적은 메모리를 사용한다."
    },
    {
        id: 3,
        text: "스택이나 재귀를 사용하여 구현할 수 있다."
    },
    {
        id: 4,
        text: "최단 경로를 찾는 데 항상 최적의 결과를 보장한다."
    }
];

export default function QuizProblemsComponent() {
    return (
        <ProblemsContainer>
            <ProblemTitle>다음 중 깊이 우선 탐색(DFS, Depth-First Search) 알고리즘에 대한 설명으로 틀린 것을 고르세요.</ProblemTitle>
            <ProblemSelectContainer>
                {quizOptions.map(option => (
                    <ProblemSelectWrap key={option.id}>
                        <ProblemSelectImg src={`/icons/number_${option.id}.svg`} />
                        <ProblemSelectText>{option.text}</ProblemSelectText>
                    </ProblemSelectWrap>
                ))}
            </ProblemSelectContainer>
        </ProblemsContainer>
    )
}
