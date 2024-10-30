import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Background } from '../../../components/background/styled';
import { RoomButtons } from '../../../modules/room/components/RoomButtons';
import { RoomTitleComponent } from '../../../modules/room/components/RoomTItle';
import { TeamComponent } from '../../../modules/room/components/Team';
import { RoomTeamContainer } from './styled';
import { useRoom } from '../../../hook/useRoom';
import { GameStartCountDownModal } from '../../../components/modal/room/countdown';
import { socketEvents } from '../../../hook/socketEvent';

export default function Room() {
  const { roomId } = useLocation().state;
  const { state } = useLocation();
  const { roomUserId,
    teamOneUsers, teamTwoUsers,
    userReady, exitRoom, teamSwitch,
    GameState, isGameStart, countdown, stompClient, isAllReady } = useRoom(roomId);

  const handleStopReady = async (roomUserId: string) => {
    try {
      await socketEvents.updateUserState(stompClient, roomUserId, roomId); // 수정 요!
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
          teamUsers={teamOneUsers} // 여기 있는 팀이 실시간 통신으로 업데이트 되어야함.
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
        count={countdown}
        open={isAllReady}
        handleStopReady = {()=>{}}
        onClose={()=> {}}
        onDone={() => { }} backdrop={true}
      />
    </Background>
  );
}
