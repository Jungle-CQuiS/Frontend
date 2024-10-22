import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Background } from '../../../components/background/styled';
import { RoomButtons } from '../../../modules/room/components/RoomButtons';
import { RoomTitleComponent } from '../../../modules/room/components/RoomTItle';
import { TeamComponent } from '../../../modules/room/components/Team';
import { User } from '../../../modules/room/components/TeamUser';

import { RoomTeamContainer } from './styled';

export interface Room {
  id: string;
  name: string;
  isLocked: boolean;
  currentUsers: number;
  maxUser: number;
}

const testOneUsers = [
  {
    id: 1, name: "흑화해버린담곰", honor: 54, profileImage: "/images/profile_image.png",
    role: "host", teamRole: 'member', team: "red"
  },
  {
    id: 2, name: "톱들고다니는담곰", honor: 67, profileImage: "/images/profile_image.png",
    role: "guest", teamRole: 'leader', team: "red"
  }, null, null, null,
]

const testTwoUsers = [
  null, null, null, null, null,
]

export default function Room() {
  // 방 입장 시 전달받은 정보 (URL 파라미터나 navigation state로부터)
  const { roomId } = useLocation().state;

  // 사용자 UUID는 로컬 스토리지나 전역 상태에서 가져옴
  const userUuid = localStorage.getItem('userUuid'); // 나중에 user state  변경할떄.

  const { state } = useLocation();

  // read team and blue team : teams are always same count TWO!
  const [teamOneUsers, setTeamOneUsers] = useState<(User | null)[]>(Array(5).fill(null));
  const [teamTwoUsers, setTeamTwoUsers] = useState<(User | null)[]>(Array(5).fill(null));

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  /*useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/quiz/multi/rooms/${roomId}`); // 실제 API 엔드포인트로 수정
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const users: User[] = await response.json();

        // 팀별로 유저 분류
        const redTeamUsers = users.filter(user => user.team === 'red');
        const blueTeamUsers = users.filter(user => user.team === 'blue');

        // 각 팀 배열을 5개 슬롯으로 만들기 (빈 자리는 null로 채움)
        const filledRedTeam = [...redTeamUsers, ...Array(5 - redTeamUsers.length).fill(null)].slice(0, 5);
        const filledBlueTeam = [...blueTeamUsers, ...Array(5 - blueTeamUsers.length).fill(null)].slice(0, 5);

        setTeamOneUsers(filledRedTeam);
        setTeamTwoUsers(filledBlueTeam);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // 컴포넌트 마운트 시 한 번만 실행
 
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  */

  const handleTeamClick = (team: string) => {
  };

  return (
    <Background>
      <RoomTitleComponent roomName={state?.roomName} />
      <RoomTeamContainer>
        <TeamComponent team="1팀" teamUsers={testOneUsers} handleTeamClick={handleTeamClick} teamType="red" />
        <img src='/icons/VS.svg' alt='VS' />
        <TeamComponent team="2팀" teamUsers={testTwoUsers} handleTeamClick={handleTeamClick} teamType="blue" />
      </RoomTeamContainer>
      <RoomButtons />
    </Background>
  );
}
