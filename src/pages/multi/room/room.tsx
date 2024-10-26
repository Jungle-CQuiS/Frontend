import { useLocation } from 'react-router-dom';
import { Background } from '../../../components/background/styled';
import { RoomButtons } from '../../../modules/room/components/RoomButtons';
import { RoomTitleComponent } from '../../../modules/room/components/RoomTItle';
import { TeamComponent } from '../../../modules/room/components/Team';
import { RoomTeamContainer } from './styled';
import { useRoom } from '../../../hook/useRoom';


const testOneUsers = [
  {
    id: 1, name: "흑화해버린담곰", honor: 54, profileImage: "/images/profile_image.png",

    role: "host", isLeader: 'member', team: "blue"
  },
  {
    id: 2, name: "톱들고다니는담곰", honor: 67, profileImage: "/images/profile_image.png",
    role: "guest", isLeader: 'leader', team: "blue"

  }, null, null, null,
]

const testTwoUsers = [
  {
    id: 3, name: "현우오빠가데려온악마담곰", honor: 54, profileImage: "/images/profile_image.png",

    role: "guest", isLeader: 'leader', team: "red"
  },
  {
    id: 4, name: "머리만있는담곰", honor: 67, profileImage: "/images/profile_image.png",
    role: "guest", isLeader: 'member', team: "red"

  }, null, null, null,
]

export default function Room() {
  const { roomId } = useLocation().state;
  const { state } = useLocation();

  //web socket 관련 비활성화 시켜놓음.
  const { teamOneUsers, teamTwoUsers } = useRoom(roomId);

  const handleTeamClick = (clickedTeam: string) => {
    /*
    const userUuid = localStorage.getItem('userUuid');
    if (!userUuid || !stompClient.current?.active) return;

    // 현재 사용자 찾기
    const currentUser = [...teamOneUsers, ...teamTwoUsers].find(user =>
      user?.id.toString() === userUuid
    );

    if (!currentUser) {
      console.error('User not found');
      return;
    }

    // 게임 시작 전에만 팀 변경 가능 (게임 상태가 있다고 가정)
    // if (gameState !== 'waiting') {
    //     alert('게임이 시작된 후에는 팀을 변경할 수 없습니다.');
    //     return;
    // }

    // 리더는 팀 변경 불가 (선택적)
    if (currentUser.isLeader === 'leader') {
      alert('팀 리더는 팀을 변경할 수 없습니다.');
      return;
    }

    // 같은 팀 클릭 무시
    if (currentUser.team === clickedTeam) {
      return;
    }

    // 대상 팀의 빈 자리 확인
    const targetTeamUsers = clickedTeam === 'blue' ? teamOneUsers : teamTwoUsers;
    const hasEmptySpot = targetTeamUsers.some(user => user === null);

    if (!hasEmptySpot) {
      alert('선택한 팀의 자리가 모두 찼습니다.');
      return;
    }

    // 모든 조건을 만족하면 팀 변경 요청
    stompClient.current.publish({
      destination: '/app/room/changeTeam',
      body: JSON.stringify({
        roomId,
        userId: currentUser.id
      })
    });*/
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
      <RoomButtons roomId={roomId} />
    </Background>
  );
}
