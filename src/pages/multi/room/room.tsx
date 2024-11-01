import Lottie from 'lottie-web';
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
import { readyRoomSocketEvents } from '../../../hook/readyRoomSocketEvent';
import { FirstAttackModal } from '../../../components/modal/room/flipcoin/result';

import { SERVICES } from '../../../config/api/constants';
import FlipCoin from '../../../components/modal/room/flipcoin';
import { FlipCoinBackdrop, FlipCoinScreen } from '../../../components/modal/room/flipcoin/styled';
export default function Room() {
  const { roomId } = useLocation().state;
  const { state } = useLocation();
  const {
    teamOneUsers, teamTwoUsers,
    userReady, exitRoom, teamSwitch,navigateToGamePage,
    countdown, stompClient, isAllReady
  } = useRoom(roomId);

  const [isCoinAnimation, setIsCoinAnimation] = useState(false);
  const [isFirstAttackModalOpen, setIsFirstAttackModalOpen] = useState(false);
  const [firstAttackTeam, setFirstAttackTeam] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const navigate = useNavigate();

  // Ready CountDown Modal Logic
  useEffect(() => {
    if (isAllReady) {
      // 5초 카운트다운 모달 시작
      setTimeLeft(countdown); // 카운트다운 초기화
      const countdownTimer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            setIsCoinAnimation(true);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownTimer);
    }
  }, [isAllReady]);

  // Set starter team Logic
  useEffect(() => {
    if (isCoinAnimation) {
      // 애니메이션이 5초 정도 후에 끝난다고 가정
      const animationTimer = setTimeout(() => {
        setIsCoinAnimation(false);
        // 무작위로 선공 팀 결정
        const selectedTeam = Math.random() > 0.5 ? '1팀' : '2팀';   // 백엔드에서 랜덤 받아와야 할 듯!
        setFirstAttackTeam(selectedTeam);
        setIsFirstAttackModalOpen(true);
      }, 3000);
      return () => clearTimeout(animationTimer);
    }
  }, [isCoinAnimation]);

  const handleStopReady = async (roomUserId: string) => {
    try {
      await readyRoomSocketEvents.updateUserState(stompClient, roomUserId);
    } catch (error) {
      console.error('User ready failed:', error);
      throw error;
    }
  };

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
      <RoomButtons MultiReadyButton={userReady} MultiExitButton={exitRoom} />
      <GameStartCountDownModal
        count={timeLeft}
        open={isAllReady && timeLeft > 0}
        handleStopReady={handleStopReady}
        onClose={() => { }}
        onDone={() => { }}
        backdrop={true}
      />

      {isCoinAnimation && (
          <FlipCoinBackdrop>
              <FlipCoinScreen>
                  <FlipCoin />
              </FlipCoinScreen>
          </FlipCoinBackdrop>
      )}

      {isFirstAttackModalOpen && firstAttackTeam && (
        <FirstAttackModal
          team={firstAttackTeam}
          onClose={() => {
            setIsFirstAttackModalOpen(false)
            
            navigateToGamePage(); // 팀 별로 다른 페이지 리다이렉트
          }}
        />
      )}
    </Background>
  );
}
