import { useEffect, useState } from "react";
import { TeamHeaderComponent } from "../../../modules/quiz/components/multi/TeamHeader/TeamHeader";
import { Background } from "../../../components/background/styled";
import { WaitingScreen } from "../../../modules/quiz/components/multi/waiting/WaitingScreen";
import { UserTagsComponent } from "../../../modules/quiz/components/multi/UserTags/UserTags";
import { useGameUser } from "../../../contexts/GameUserContext/useGameUser";
import { useTeamState } from "../../../contexts/TeamStateContext/useTeamState";
import { usePageLeave } from "../../../hook/pageLeaveHandler";
import useButtonSoundEffect from "../../../hook/useHoverSoundEffect";
import { MultiAnimationBackgroundOverlay, MultiAnimationModalContainer, MultiAnimationTextLarge, MultiAnimationTextSmall, MultiAnimationTextWrap } from "../../../modules/room/components/attack/styled";
export default function DefendPage() {
    //수비팀 선택
    const { user } = useGameUser();
    const teamId = user?.team == 'BLUE' ? 1 : 2;
    const { attackTeam } = useTeamState();
    useButtonSoundEffect();

    usePageLeave();
    const [modalVisible, setModalVisible] = useState(true);
    useEffect(() => {
        // 3초 후 모달을 자동으로 숨기도록 설정
        const timer = setTimeout(() => {
            setModalVisible(false);
        }, 3000);
    
        return () => clearTimeout(timer); // 타이머 정리
    }, []);

    return (
        <Background>
                {modalVisible && (
                        <>
                            <MultiAnimationBackgroundOverlay />
                            <MultiAnimationModalContainer>
                                <MultiAnimationTextWrap>
                                    <MultiAnimationTextSmall>TEAM {teamId}</MultiAnimationTextSmall>
                                    <MultiAnimationTextLarge>DEFFEND</MultiAnimationTextLarge>
                                </MultiAnimationTextWrap>
                            </MultiAnimationModalContainer>
                        </>
                    )}
            <TeamHeaderComponent teamId={teamId} isAttackTeam={user?.team == attackTeam ? true : false} />
            <WaitingScreen teamId={teamId} />
            <UserTagsComponent teamId={teamId} />
        </Background>
    )
}