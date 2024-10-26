import { useLocation } from 'react-router-dom';
import { Background } from '../../../components/background/styled';
import { RoomButtons } from '../../../modules/room/components/RoomButtons';
import { RoomTitleComponent } from '../../../modules/room/components/RoomTItle';
import { TeamComponent } from '../../../modules/room/components/Team';
import { RoomTeamContainer } from './styled';
import { useRoom } from '../../../hook/useRoom';

export default function Room() {
  const { roomId } = useLocation().state;
  const { state } = useLocation();

  const { teamOneUsers, teamTwoUsers , exitRoom} = useRoom(roomId);

  
  const handleTeamClick = (clickedTeam: string) => {

  }
  return (
    <Background>
      <RoomTitleComponent roomName={state?.roomName} />
      <RoomTeamContainer>
        <TeamComponent
          team="1팀"
          teamUsers={teamOneUsers} // 여기 있는 팀이 실시간 통신으로 업데이트 되어야함.
          handleTeamClick={handleTeamClick}
          teamType="blue"
        />
        <img src='/icons/VS.svg' alt='VS' />
        <TeamComponent
          team="2팀"
          teamUsers={teamTwoUsers}
          handleTeamClick={handleTeamClick}
          teamType="red"
        />

      </RoomTeamContainer>
      <RoomButtons roomId={roomId} MultiReadyButton = {exitRoom} MultiExitButton = {exitRoom}/>
    </Background>
  );
}
