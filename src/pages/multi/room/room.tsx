import { useLocation } from 'react-router-dom';
import { Background } from '../../../components/background/styled';
import { RoomButtons } from '../../../modules/room/components/RoomButtons';
import { RoomTitleComponent } from '../../../modules/room/components/RoomTItle';
import { TeamComponent } from '../../../modules/room/components/Team';
import { useWebSocket } from '../../../hook/useWebSocket';
import { RoomTeamContainer } from './styled';

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
  const { isLoading, error, stompClient,teamOneUsers,teamTwoUsers} = useWebSocket(roomId);


  const handleTeamClick = (clickedTeam: string) => {
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

    // 팀 인원 균형 체크 (선택적)
    const currentTeamUsers = currentUser.team === 'blue' ? teamOneUsers : teamTwoUsers;
    const currentTeamCount = currentTeamUsers.filter(user => user !== null).length;
    const targetTeamCount = targetTeamUsers.filter(user => user !== null).length;

    if (currentTeamCount - 1 < targetTeamCount) {
      alert('팀 인원 균형을 위해 팀을 변경할 수 없습니다.');
      return;
    }

    // 모든 조건을 만족하면 팀 변경 요청
    stompClient.current.publish({
      destination: '/app/room/changeTeam',
      body: JSON.stringify({
        roomId,
        userId: currentUser.id
      })
    });
  };

  /*if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;*/

  return (
    <Background>
      <RoomTitleComponent roomName={state?.roomName} />
      <RoomTeamContainer>
        <TeamComponent
          team="1팀"
          teamUsers={testOneUsers}
          handleTeamClick={handleTeamClick}
          teamType="blue"
        />
        <img src='/icons/VS.svg' alt='VS' />
        <TeamComponent
          team="2팀"
          teamUsers={testTwoUsers}
          handleTeamClick={handleTeamClick}
          teamType="red"
        />

      </RoomTeamContainer>
      <RoomButtons />
    </Background>
  );
}
