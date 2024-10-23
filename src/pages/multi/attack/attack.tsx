import { useState } from "react";
import { Background } from "../../../components/background/styled";
import { PrimaryButtonMedium, SecondaryButtonShort } from "../../../components/buttons/styled";
import { MultiCenterBox, MultiGameButton, MultiGameChoice, MultiGameContainer, MultiGameFooter, MultiGameHeader, MultiGameInventory, MultiGameQuestionCheckbox, MultiGameTeam, MultiGameTitle, MultiQuestionBox, MultiTimeLeft } from "./styled";

export default function AttackPage() {
    const [isQuestionChecked, setIsQuestionChecked] = useState(false);
    
    const handleQuestionCheckbox = () => {
        setIsQuestionChecked(prevState => !prevState);
    };


    return (
        <Background>
            <MultiGameHeader>
                <MultiGameTeam>1팀</MultiGameTeam>
                <MultiGameTitle>주제를 선택하세요</MultiGameTitle>
            </MultiGameHeader>
            <MultiGameContainer>
                <MultiTimeLeft>초 남았습니다!!</MultiTimeLeft>
                <MultiCenterBox>
                    <MultiGameInventory>
                        <div className="menu-item active">OS</div>
                        <div className="menu-item">자료구조</div>
                        <div className="menu-item">알고리즘</div>
                        <div className="menu-item">네트워크</div>
                        <div className="menu-item">데이터베이스</div>
                    </MultiGameInventory>
                    <MultiQuestionBox onClick={handleQuestionCheckbox}>
                        <MultiGameQuestionCheckbox src="/icons/checkbox_base.svg" />
                        <MultiGameQuestionCheckbox src="/icons/checkbox_base.svg" />
                    </MultiQuestionBox>
                </MultiCenterBox>
                <MultiGameChoice>
                    <SecondaryButtonShort>나가기</SecondaryButtonShort>
                    <PrimaryButtonMedium>선택완료</PrimaryButtonMedium>
                </MultiGameChoice>
            </MultiGameContainer>
            <MultiGameFooter>
                <MultiGameButton>흑화해버린담곰</MultiGameButton>
                <MultiGameButton>메타몽주인님</MultiGameButton>
                <MultiGameButton>드래곤캐슬</MultiGameButton>
                <MultiGameButton>정글깡패</MultiGameButton>
                <MultiGameButton>스몰애기</MultiGameButton>
            </MultiGameFooter>
        </Background>
        

    )
}