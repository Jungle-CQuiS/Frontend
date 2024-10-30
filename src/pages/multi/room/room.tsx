import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Background } from '../../../components/background/styled';
import { RoomButtons } from '../../../modules/room/components/RoomButtons';
import { RoomTitleComponent } from '../../../modules/room/components/RoomTItle';
import { TeamComponent } from '../../../modules/room/components/Team';
import { RoomTeamContainer } from './styled';
import { useRoom } from '../../../hook/useRoom';
import { GameStartCountDownModal } from '../../../components/modal/room/countdown';
import { socketEvents } from '../../../hook/socketEvent';
import { FirstAttackModal } from '../../../components/modal/room/flipcoin/result';

import { SERVICES } from '../../../config/api/constants';
export default function Room() {
  const { roomId } = useLocation().state;
  const { state } = useLocation();
  const {
    roomUserId,
    teamOneUsers, teamTwoUsers,
    userReady, exitRoom, teamSwitch,
    GameState, isGameStart, countdown, stompClient, isAllReady
  } = useRoom(roomId);

  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [isFirstAttackModalOpen, setIsFirstAttackModalOpen] = useState(false);
  const [firstAttackTeam, setFirstAttackTeam] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (isAllReady) {
      // 5초 카운트다운 모달 시작
      setTimeLeft(5); // 카운트다운 초기화
      const countdownTimer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            setIsAnimationPlaying(true);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownTimer);
    }
  }, [isAllReady]);

  useEffect(() => {
    if (isAnimationPlaying) {
      // 애니메이션이 5초 정도 후에 끝난다고 가정
      const animationTimer = setTimeout(() => {
        setIsAnimationPlaying(false);
        // 무작위로 선공 팀 결정
        const selectedTeam = Math.random() > 0.5 ? '1팀' : '2팀';
        setFirstAttackTeam(selectedTeam);
        setIsFirstAttackModalOpen(true);
      }, 5000);
      return () => clearTimeout(animationTimer);
    }
  }, [isAnimationPlaying]);

  const handleStopReady = async (roomUserId: string) => {
    try {
      await socketEvents.updateUserState(stompClient, roomUserId, roomId); // 수정 요!
    } catch (error) {
      console.error('User ready failed:', error);
      throw error;
    }
  };

  const navigate = useNavigate();

  // isGameStart가 되면, 게임이 시작한다.
  useEffect(() => {
    //FIXME: Navigate 조건문 좀 더 견고하게 수정해야함.
    if(isGameStart){
      navigate(SERVICES.MULTI);
    }
}, [isGameStart]);

  return (
    <Background>
      <RoomTitleComponent roomName={state?.roomName} />
      <RoomTeamContainer>
        <TeamComponent
          team="1팀"
          teamUsers={teamOneUsers}
          handleTeamClick={teamSwitch}
          teamType="blue"
        />
        <img src='/icons/VS.svg' alt='VS' />
        <TeamComponent
          team="2팀"
          teamUsers={teamTwoUsers}
          handleTeamClick={teamSwitch}
          teamType="red"
        />
      </RoomTeamContainer>
      <RoomButtons userRoomId={roomUserId} MultiReadyButton={userReady} MultiExitButton={exitRoom} />
      
      <GameStartCountDownModal
        count={timeLeft}
        open={isAllReady && timeLeft > 0}
        handleStopReady={handleStopReady}
        onClose={() => {}}
        onDone={() => {}}
        backdrop={true}
      />

      {/* {isAnimationPlaying && <GameStartAnimation />} */}

      {isFirstAttackModalOpen && firstAttackTeam && (
        <FirstAttackModal
          team={firstAttackTeam}
          onClose={() => setIsFirstAttackModalOpen(false)}
        />
      )}
    </Background>
  );
}
