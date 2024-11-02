import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "../../../components/background/styled";
import { PrimaryButtonMedium, SecondaryButtonSmall } from "../../../components/buttons/styled";
import { AddProblemButtonWrap, AddProblemCategoryWrap, AddProblemContainer, AddProblemHeader, AddProblemHeaderImg, AddProblemHeaderTitle, AddProblemInput, AddProblemInputLong, AddProblemLabel, AddProblemSelectImg, AddProblemSelectRow, AddProblemTab, AddProblemWrap } from "./styled";

export default function AddProblemPage() {
    const navigate = useNavigate();
    
    const [selectedTopic, setSelectedTopic] = useState("OS");
    const [selectedType, setSelectedType] = useState("객관식");

    const handleCancel = () => {
        navigate("/mypage")
    }

    const handleSubmit = () => {
        console.log("제출");   //TODO : 문제 등록하기
    }

    return (
        <Background>
            <AddProblemContainer>
                <AddProblemHeader>
                    <AddProblemHeaderImg src="/icons/edit.svg"/>
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
                <AddProblemWrap>
                    <AddProblemLabel>문제</AddProblemLabel>
                    <AddProblemInputLong placeholder="문제를 입력해주세요"/>
                </AddProblemWrap>

                {selectedType === "객관식" ? (
                    <>
                        <AddProblemWrap>
                            <AddProblemLabel>선택지</AddProblemLabel>
                            {[1, 2, 3, 4].map((num) => (
                                <AddProblemSelectRow key={num}>
                                    <AddProblemSelectImg src={`/icons/number_${num}.svg`} />
                                    <AddProblemInput placeholder="선택지를 입력해주세요"/>
                                </AddProblemSelectRow>
                            ))}
                        </AddProblemWrap>
                        <AddProblemWrap>
                            <AddProblemLabel>정답 번호</AddProblemLabel>
                            <AddProblemInputLong type="number" placeholder="정답 번호를 입력해주세요"/>
                        </AddProblemWrap>
                    </>
                ) : (
                    <AddProblemWrap>
                        <AddProblemLabel>정답</AddProblemLabel>
                        <AddProblemInputLong placeholder="정답을 입력해주세요"/>
                    </AddProblemWrap>
                )}

                <AddProblemButtonWrap>
                    <SecondaryButtonSmall onClick={handleCancel}>취소하기</SecondaryButtonSmall>
                    <PrimaryButtonMedium onClick={handleSubmit}>제출하기</PrimaryButtonMedium>
                </AddProblemButtonWrap>
            </AddProblemContainer>
        </Background>
    );
}
