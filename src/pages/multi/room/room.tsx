import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Background } from '../../../components/background/styled';
import { RoomButtons } from '../../../modules/room/components/RoomButtons';
import { RoomTitleComponent } from '../../../modules/room/components/RoomTItle';
import { TeamComponent } from '../../../modules/room/components/Team';
import { MultiBackgroundRoom, RoomTeamContainer } from './styled';
import { useRoom } from '../../../hook/useRoom';
import { GameStartCountDownModal } from '../../../components/modal/room/countdown';
import { FirstAttackModal } from '../../../components/modal/room/flipcoin/result';
import FlipCoin from '../../../components/modal/room/flipcoin';
import { FlipCoinBackdrop, FlipCoinScreen } from '../../../components/modal/room/flipcoin/styled';
import { useTeamState } from '../../../contexts/TeamStateContext/useTeamState';
import { usePageLeave } from '../../../hook/pageLeaveHandler';
import { LoadingScreen } from '../../../modules/LoadingScreen';
import useButtonSoundEffect from '../../../hook/useHoverSoundEffect';

export default function Room() {
  const { roomId } = useLocation().state;
  const { state } = useLocation();
  const {
    teamOneUsers, teamTwoUsers,roomUserId,
    userReady, exitRoom, teamSwitch, navigateToGamePage, 
    isAllReady, isTeamsLoaded, isSocketConnected, isRoomInfoSetting
  } = useRoom(roomId);
  const { updateAttackTeam } = useTeamState();
  useButtonSoundEffect();

  const [isCoinAnimation, setIsCoinAnimation] = useState(false);
  const [isFirstAttackModalOpen, setIsFirstAttackModalOpen] = useState(false);
  const [firstAttackTeam, setFirstAttackTeam] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isCountDownModalOpen, setIsCountDownModalOpen] = useState(false);

  usePageLeave();
  const coinSound = new Audio('/sounds/coin_flip.mp3');

  // Ready CountDown Modal Logic
  useEffect(() => {
    if (isAllReady) {
      // 3초 카운트다운 모달 시작
      setIsCountDownModalOpen(true);
      // 무작위로 선공 팀 결정
      getFirstAttackTeam();
      setTimeLeft(3); // 카운트다운 초기화
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
      // 효과음 재생
      coinSound.play();

      const animationTimer = setTimeout(() => {
        setIsCoinAnimation(false);
        setIsFirstAttackModalOpen(true);
        coinSound.pause(); // 애니메이션 후 효과음 멈추기
        coinSound.currentTime = 0; // 효과음 처음부터 다시 시작
      }, 2000);

      return () => {
        clearTimeout(animationTimer);
        coinSound.pause(); // 컴포넌트가 언마운트되거나 애니메이션이 끝나면 효과음 멈추기
        coinSound.currentTime = 0;
      };
    }
  }, [isCoinAnimation]);

  const getFirstAttackTeam = async () => {
    const maxRetries = 3;  // 최대 재시도 횟수
    const retryDelay = 1000;  // 재시도 간격 (1초)

    const attemptFetch = async (retryCount: number): Promise<void> => {
      const userUuid = localStorage.getItem("uuid");
      const userAccessToken = localStorage.getItem("AccessToken");
      const API_URL = `/api/quiz/multi/game/start`;

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${userAccessToken}`,
            "uuid": `${userUuid}`,
            "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            roomId: roomId,
            gameStatus: "GAME_START",
            roomUserId: roomUserId
          })
        });

        if (response.ok) {
          const data = await response.json();
          const selectedTeam = data.data.teamColor === "BLUE" ? '1팀' : '2팀';   // 백엔드에서 랜덤 받아와야 할 듯!
          setFirstAttackTeam(selectedTeam);
        }
        else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.error(`Fetch attempt ${retryCount + 1} failed:`, errorMessage);

        if (retryCount < maxRetries - 1) {
          console.log(`Retrying in ${retryDelay / 1000} seconds... (${retryCount + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return attemptFetch(retryCount + 1);
        } else {
          console.error("Max retry attempts reached");
          throw e;
        }
      }
    }

    try {
      await attemptFetch(0);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      console.error("All fetch start attempts failed:", errorMessage);
      throw e;
    }

  }


  if (!isSocketConnected) {
    return <LoadingScreen loadingText="서버 연결 중" />;
  }

  if (!isRoomInfoSetting) {
    return <LoadingScreen loadingText="방 정보 불러오는 중" />;
  }

  if (!isTeamsLoaded) {
    return <LoadingScreen loadingText="방 유저 정보 불러오는 중" />;
  }

  return (
    <MultiBackgroundRoom>
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
    </MultiBackgroundRoom>
  );
}
