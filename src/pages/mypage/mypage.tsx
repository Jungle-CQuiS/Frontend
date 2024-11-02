import { useNavigate } from "react-router-dom";
import { Background } from "../../components/background/styled";
import { PrimaryButtonMedium } from "../../components/buttons/styled";

export default function MyPage() {
    const navigate = useNavigate();
    const handleAddProblem = () => {
        navigate("/mypage/addProblem");
    }

    return(
        <Background>
            <PrimaryButtonMedium onClick={handleAddProblem}>문제 등록</PrimaryButtonMedium>
        </Background>
    )
}