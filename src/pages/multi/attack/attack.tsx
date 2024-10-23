import { useState } from "react";
import { Background } from "../../../components/background/styled";
import { TeamHeaderComponent } from "../../../modules/quiz/components/multi/TeamHeader/TeamHeader";
import { Timer } from "../../../components/timer/timer";
import { PrimaryButtonMedium, SecondaryButtonSmall } from "../../../components/buttons/styled";
import CategoryComponent from "../../../components/Category";
import QuizProblemsComponent from "../../../components/quiz";
import { MultiGameAttackContainer, MutliGameAttackTimerWrap, MultiGameAttackTimer, MultiGameAttackTimerText, MultiGameAttackQuizContainer, MultiGameAttackQuizWrap, MultiGameAttackQuiz, MultiGameAttackButtonWrap, MultiGameAttackQuizCheckbox, MultiGameBackground } from "./styled";
import { UserTagsComponent } from "../../../modules/quiz/components/multi/UserTags/UserTags";

export default function AttackPage() {
    const [teamId, setTeamId] = useState(1);
    const [isAttackTeam, setIsAttackTeam] = useState(true);

    return (
        <Background>
            <MultiGameBackground>
                <TeamHeaderComponent teamId={teamId} isAttackTeam={isAttackTeam} />
                <MultiGameAttackContainer>
                    <MutliGameAttackTimerWrap>
                        <Timer />
                        <MultiGameAttackTimer>30초&nbsp;</MultiGameAttackTimer>
                        <MultiGameAttackTimerText>남았습니다!!</MultiGameAttackTimerText>
                    </MutliGameAttackTimerWrap>
                    <MultiGameAttackQuizContainer>
                        <CategoryComponent />
                        <MultiGameAttackQuizWrap>
                            <MultiGameAttackQuiz>
                                <MultiGameAttackQuizCheckbox src="/icons/checkbox_base.svg"/>
                                <QuizProblemsComponent />
                            </MultiGameAttackQuiz>
                            <MultiGameAttackQuiz>
                                <MultiGameAttackQuizCheckbox src="/icons/checkbox_base.svg"/>
                                <QuizProblemsComponent />
                            </MultiGameAttackQuiz>
                        </MultiGameAttackQuizWrap>
                    </MultiGameAttackQuizContainer>
                    <MultiGameAttackButtonWrap>
                        <SecondaryButtonSmall>나가기</SecondaryButtonSmall>
                        <PrimaryButtonMedium>선택완료</PrimaryButtonMedium>
                    </MultiGameAttackButtonWrap>
                </MultiGameAttackContainer>
                <UserTagsComponent teamId={teamId}/>
            </MultiGameBackground>
        </Background>
    )
}