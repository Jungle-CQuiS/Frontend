import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Background } from '../../../components/background/styled';
import { RoomButtons } from '../../../modules/room/components/RoomButtons';
import { RoomTitleComponent } from '../../../modules/room/components/RoomTItle';
import { TeamComponent } from '../../../modules/room/components/Team';
import { RoomTeamContainer } from './styled';
import { useRoom } from '../../../hook/useRoom';
import { GameStartCountDownModal } from '../../../components/modal/room/countdown';
import { FirstAttackModal } from '../../../components/modal/room/flipcoin/result';
import FlipCoin from '../../../components/modal/room/flipcoin';
import { FlipCoinBackdrop, FlipCoinScreen } from '../../../components/modal/room/flipcoin/styled';
import { SOCKET_DESTINATIONS } from '../../../config/websocket/constants';
import { useTeamState } from '../../../contexts/TeamStateContext/useTeamState';
import { usePageLeave } from '../../../hook/pageLeaveHandler';
import { LoadingScreen } from '../../../modules/LoadingScreen';
import useButtonSoundEffect from '../../../hook/useHoverSoundEffect';

export default function Room() {
  const { roomId } = useLocation().state;
  const { state } = useLocation();
  const {
    teamOneUsers, teamTwoUsers,
    userReady, exitRoom, teamSwitch, navigateToGamePage,
    isAllReady, isTeamsLoaded
  } = useRoom(roomId);
  const { updateAttackTeam } = useTeamState();
  useButtonSoundEffect();

  const [isCoinAnimation, setIsCoinAnimation] = useState(false);
  const [isFirstAttackModalOpen, setIsFirstAttackModalOpen] = useState(false);
  const [firstAttackTeam, setFirstAttackTeam] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isCountDownModalOpen, setIsCountDownModalOpen] = useState(false);

  usePageLeave();

  // Ready CountDown Modal Logic
  useEffect(() => {
    if (isAllReady) {
      // 5초 카운트다운 모달 시작
      setIsCountDownModalOpen(true);
      // 무작위로 선공 팀 결정
      getFirstAttackTeam();
      setTimeLeft(5); // 카운트다운 초기화
      const countdownTimer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            setIsCoinAnimation(true);
            setIsCountDownModalOpen(false);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownTimer);
    }
  }, [isAllReady]);

  const handleStopReady = async () => {
    userReady();
  };

  // Set starter team Logic
  useEffect(() => {
    if (isCoinAnimation) {
      const animationTimer = setTimeout(() => {
        setIsCoinAnimation(false);

        setIsFirstAttackModalOpen(true);
      }, 3000);
      return () => clearTimeout(animationTimer);
    }
  }, [isCoinAnimation]);

  const getFirstAttackTeam = async () => {
    const userUuid = localStorage.getItem("uuid");
    const userAccessToken = localStorage.getItem("AccessToken");
    const API_URL = `/api/quiz/multi/game/start`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${userAccessToken}`,
          "uuid": `${userUuid}`,
          "RefreshToken": `${localStorage.getItem("RefreshToken")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          roomId: roomId,
          gameStatus: "GAME_START"
        })
      });

      if (response.ok) {
        const data = await response.json();
        const selectedTeam = data.data.teamColor === "BLUE" ? '1팀' : '2팀';   // 백엔드에서 랜덤 받아와야 할 듯!
        setFirstAttackTeam(selectedTeam);
      }

    } catch (error) {
      console.error("선공팀을 받아오는데 실패하였습니다.", error);
    }
  }

  if (!isTeamsLoaded) {
    return <LoadingScreen />;
  }
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
      {isAllReady && <GameStartCountDownModal
        count={timeLeft}
        open={isCountDownModalOpen && timeLeft > 0}
        handleStopReady={handleStopReady}
        onClose={() => { setIsCountDownModalOpen(false); setIsCoinAnimation(false); setIsFirstAttackModalOpen(false); }}
        onDone={() => { }}
        backdrop={true}
      />}

      {isAllReady && isCoinAnimation && (
        <FlipCoinBackdrop>
          <FlipCoinScreen>
            <FlipCoin />
          </FlipCoinScreen>
        </FlipCoinBackdrop>
      )}

      {isAllReady && isFirstAttackModalOpen && firstAttackTeam && (
        <FirstAttackModal
          team={firstAttackTeam}
          onClose={() => {
            setIsFirstAttackModalOpen(false)
            updateAttackTeam(firstAttackTeam == "1팀" ? 'BLUE' : 'RED'); // 전역에 first attack team을 저장.
            navigateToGamePage(); // 팀 별로 다른 페이지 리다이렉트
          }}
        />
      )}
    </Background>
  );
}
