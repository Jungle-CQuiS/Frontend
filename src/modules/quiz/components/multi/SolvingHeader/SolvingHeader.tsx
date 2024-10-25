import { useState } from "react";
import { Timer } from "../../../../../components/timer/timer"
import { HealthBarUnit, SolvingHeaderContainer, SolvingHeaderTitle, SolvingHeaderTitleWrap, SolvingTimer, SolvingTimerText, SolvingTimerWrap, TeamOneHealthBarContainer, TeamOneHealthBarText, TeamOneHealthBarTop, TeamOneHealthBarTopBackground, TeamOneHealthBarTopTitle, TeamOneHealthBarWrap, TeamTwoHealthBarContainer, TeamTwoHealthBarText, TeamTwoHealthBarTop, TeamTwoHealthBarTopBackground, TeamTwoHealthBarTopTitle, TeamTwoHealthBarWrap } from "./styled"

export const SolvingHeaderComponent = () => {
    //팀 체력
    const [teamOneHealth, setTeamOneHealth] = useState(6); 
    const [teamTwoHealth, setTeamTwoHealth] = useState(10); 

    const renderHealthBar = (health: number, team: number, reverse: boolean = false) => {
        const totalHealth = 10;
        const healthBars = Array.from({ length: totalHealth }).map((_, index) => (
          <HealthBarUnit
            key={index}
            active={index < health}
            team={team}
          />
        ));

        return reverse ? healthBars.reverse() : healthBars;
    };
 
    return(
        <SolvingHeaderContainer>
            <TeamOneHealthBarContainer>
                <TeamOneHealthBarTop>
                    <TeamOneHealthBarTopBackground></TeamOneHealthBarTopBackground>
                    <TeamOneHealthBarTopTitle>1팀</TeamOneHealthBarTopTitle>
                </TeamOneHealthBarTop>
                <TeamOneHealthBarWrap>
                    <TeamOneHealthBarText>{teamOneHealth}/10</TeamOneHealthBarText>
                    <div>{renderHealthBar(teamOneHealth, 1)}</div>
                </TeamOneHealthBarWrap>
            </TeamOneHealthBarContainer>
            <SolvingHeaderTitleWrap>
                <SolvingHeaderTitle>OS</SolvingHeaderTitle>
                <SolvingTimerWrap>
                    <Timer />
                    <SolvingTimer>30초&nbsp;</SolvingTimer>
                    <SolvingTimerText>남았습니다!!</SolvingTimerText>
                </SolvingTimerWrap>
            </SolvingHeaderTitleWrap>
            <TeamTwoHealthBarContainer>
                <TeamTwoHealthBarTop>
                    <TeamTwoHealthBarTopTitle>2팀</TeamTwoHealthBarTopTitle>
                    <TeamTwoHealthBarTopBackground></TeamTwoHealthBarTopBackground>
                </TeamTwoHealthBarTop>
                <TeamTwoHealthBarWrap>
                    <div>{renderHealthBar(teamTwoHealth,2, true)}</div>
                    <TeamTwoHealthBarText>{teamTwoHealth}/10</TeamTwoHealthBarText>
                </TeamTwoHealthBarWrap>
            </TeamTwoHealthBarContainer>
        </SolvingHeaderContainer>
    )
}