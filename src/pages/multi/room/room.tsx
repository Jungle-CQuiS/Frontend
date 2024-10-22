import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Background } from '../../../components/background/styled';
import { RoomButtons } from '../../../modules/room/components/RoomButtons';
import { RoomTitleComponent } from '../../../modules/room/components/RoomTItle';
import { TeamComponent } from '../../../modules/room/components/Team';
import { User } from '../../../modules/room/components/TeamUser';

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
  // 방 입장 시 전달받은 정보 (URL 파라미터나 navigation state로부터)
  const { roomId } = useLocation().state;
  const { state } = useLocation();
  const [teamOneUsers, setTeamOneUsers] = useState<(User | null)[]>(Array(5).fill(null));
  const [teamTwoUsers, setTeamTwoUsers] = useState<(User | null)[]>(Array(5).fill(null));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // STOMP 클라이언트 참조 유지
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    // STOMP 클라이언트 생성 및 설정
    
    const client = new Client({
      brokerURL: 'ws://cquis.net/ws',  // 이렇게 하는게 맞는지 잘 모르겠음! ㅠㅠ
      onConnect: () => {
        console.log('Connected to WebSocket');
        setIsLoading(false);

        // 방 정보 변경시.
        client.subscribe(`/quiz/multi/rooms/${roomId}`, (message) => {
          try {
            const response = JSON.parse(message.body);
            updateTeams(response.users);
          } catch (err) {
            console.error('Error processing message:', err);
          }
        });

        // 초기 방 정보 요청
        client.publish({
          destination: '/quiz/multi/rooms/join',
          body: JSON.stringify({ roomId })
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
      onStompError: (error) => {
        console.error('WebSocket Error:', error);
        setError('Failed to connect to the game server');
        setIsLoading(false);
      }
    });

    // 연결 시작
    client.activate();
    stompClient.current = client;

    // cleanup
    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [roomId]);

  // 팀 데이터 업데이트 함수
  const updateTeams = (users: User[]) => {
    const blueTeamUsers = users.filter(user => user.team === 'blue');
    const redTeamUsers = users.filter(user => user.team === 'red');

    const filledBlueTeam = [
      ...blueTeamUsers,
      ...Array(5 - blueTeamUsers.length).fill(null)
    ].slice(0, 5);

    const filledRedTeam = [
      ...redTeamUsers,
      ...Array(5 - redTeamUsers.length).fill(null)
    ].slice(0, 5);
    
    setTeamTwoUsers(filledBlueTeam);
    setTeamOneUsers(filledRedTeam);
  };

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
