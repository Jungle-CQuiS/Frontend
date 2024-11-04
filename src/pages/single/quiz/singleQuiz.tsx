import { useLocation } from "react-router-dom";
import { Background } from "../../../components/background/styled";
import { SingleModeQuizMultiple } from "../../../modules/single/components/quiz/multipleChoice";
import { SingleModeQuizSubjective } from "../../../modules/single/components/quiz/subjective";
import { SingleModeQuizTimeAttack } from "../../../modules/single/components/quiz/timeAttack";

export default function SingleModeQuiz() {
    const location = useLocation();
    const selectedMode = location.state?.selectedMode || "객관식";

    let QuizComponent: (() => JSX.Element) | null = null;

    if (selectedMode === "객관식") {
        QuizComponent = SingleModeQuizMultiple;
    } else if (selectedMode === "주관식") {
        QuizComponent = SingleModeQuizSubjective;
    } else if (selectedMode === "타임어택") {
        QuizComponent = SingleModeQuizTimeAttack;
    }

    return (
        <Background>
            {QuizComponent ? <QuizComponent /> : <div>선택한 모드가 없습니다</div>}
        </Background>
    );
}
