import { useNavigate } from "react-router-dom";
import { IModalProps, Modal } from ".."
import SingleModeHeaderComponent from "../../../modules/single/components/header"
import { PrimaryButtonMedium, SecondaryButton } from "../../buttons/styled"
import { SingleModeSelectModalButtonWrap, SingleModeSelectModalConatiner, SingleModeSelectModalLabel, SingleModeSelectModalRow, SingleModeSelectModalRowBottom, SingleModeSelectModalTag, SingleModeSelectModalTagWrap, SingleModeSelectModalWrap } from "./styled"

interface SingleModeSelectModalProps extends IModalProps {
    selectedTopics: string[];
    selectedNumber: string;
    selectedMode: string;
}


export const SingleModeSelectModal = ({
    selectedTopics,
    selectedNumber,
    selectedMode,
    ...props
}: SingleModeSelectModalProps) => {

    const navigate = useNavigate();

    const categoryMapping: { [key: string]: number } = {
        "OS": 1,
        "알고리즘": 3,
        "자료구조": 4,
        "네트워크": 2,
        "데이터베이스": 5,
      };

      const handleStart = async () => {
        const apiUrl = selectedMode === "타임어택" ? "/api/quiz/single/mix" : (selectedMode === "객관식" ? "/api/quiz/single/choice" : "/api/quiz/single/short");
    
        const categoryIds = selectedTopics.map(topic => categoryMapping[topic]);
    
        const requistData = {
            categoryIds: categoryIds,
            quizCount: parseInt(selectedNumber),
            uuid: localStorage.getItem("uuid"),
        };
    
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
                    "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
                },
                body: JSON.stringify(requistData),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate("/single/quiz", { state: { selectedMode, quizData: data.data.quizList } });
            } else {
                console.error("Failed to fetch quiz data");
            }
        } catch (error) {
            console.error("Error in handleStart", error);
        }
    };
    
    return (
        <Modal {...props}>
            <SingleModeSelectModalConatiner>
                <SingleModeHeaderComponent />
                <SingleModeSelectModalWrap>
                    <SingleModeSelectModalRow>
                        <SingleModeSelectModalLabel>주제</SingleModeSelectModalLabel>
                        <SingleModeSelectModalTagWrap>
                            {selectedTopics.map((topic, index) => (
                                <SingleModeSelectModalTag key={index}>{topic}</SingleModeSelectModalTag>
                            ))}
                            </SingleModeSelectModalTagWrap>

                    </SingleModeSelectModalRow>
                    <SingleModeSelectModalRowBottom>
                        <SingleModeSelectModalRow>
                            <SingleModeSelectModalLabel>문제 수</SingleModeSelectModalLabel>
                            <SingleModeSelectModalTag>{selectedNumber}</SingleModeSelectModalTag>
                        </SingleModeSelectModalRow>
                        <SingleModeSelectModalRow>
                            <SingleModeSelectModalLabel>플레이모드</SingleModeSelectModalLabel>
                            <SingleModeSelectModalTag>{selectedMode}</SingleModeSelectModalTag>
                        </SingleModeSelectModalRow>
                    </SingleModeSelectModalRowBottom>
                </SingleModeSelectModalWrap>
                <SingleModeSelectModalButtonWrap>
                    <SecondaryButton onClick={props.onClose}>다시 선택</SecondaryButton>
                    <PrimaryButtonMedium onClick={handleStart}>시작하기</PrimaryButtonMedium>
                </SingleModeSelectModalButtonWrap>
            </SingleModeSelectModalConatiner>
        </Modal>
    );
};
