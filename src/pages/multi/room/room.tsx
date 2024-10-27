import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Background } from '../../../components/background/styled';
import { RoomButtons } from '../../../modules/room/components/RoomButtons';
import { RoomTitleComponent } from '../../../modules/room/components/RoomTItle';
import { TeamComponent } from '../../../modules/room/components/Team';
import { RoomTeamContainer } from './styled';
import { useRoom } from '../../../hook/useRoom';
import { QUIZ_MULTI_ENDPOINTS } from '../../../config/api/endpoints/quiz-multi.endpoints';

export default function Room() {
  const [userRoomID, setUserRoomId] = useState('');
  const { roomId } = useLocation().state;
  const { state } = useLocation();
  const { teamOneUsers, teamTwoUsers, userReady, exitRoom, teamSwitch } = useRoom(roomId);



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
      <RoomButtons userRoomId={userRoomID} MultiReadyButton={userReady} MultiExitButton={exitRoom} />
    </Background>
  );
}
