import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Background } from '../../../components/background/styled';
import { RoomButtons } from '../../../modules/room/components/RoomButtons';
import { RoomTitleComponent } from '../../../modules/room/components/RoomTItle';
import { TeamComponent } from '../../../modules/room/components/Team';
import { RoomTeamContainer } from './styled';

export interface Room {
  id: string;
  name: string;
  isLocked: boolean;
  currentUsers: number; 
  maxUser: number;
}


export default function Room() {
  const { state } = useLocation();
  
  const [teamOneUsers, setTeamOneUsers] = useState<any[]>([
    { id: 1, name: "흑화해버린담곰", honor: 54, profileImage: "/images/profile_image.png" },
    null, null, null, null,
  ]);
  
  const [teamTwoUsers, setTeamTwoUsers] = useState<any[]>([
    null, null, null, null, null,
  ]);

  const handleTeamClick = (team: string) => {
  };

  return (
    <Background>
      <RoomTitleComponent roomName={state?.roomName} />
      <RoomTeamContainer>
        <TeamComponent team="1팀" teamUsers={teamOneUsers} handleTeamClick={handleTeamClick} teamType="red" />
        <img src='/icons/VS.svg' alt='VS' />
        <TeamComponent team="2팀" teamUsers={teamTwoUsers} handleTeamClick={handleTeamClick} teamType="blue" />
      </RoomTeamContainer>
      <RoomButtons />
    </Background>
  );
}
