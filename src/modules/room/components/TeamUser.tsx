import {
  RoomTeamOneUser,
  RoomTeamOneUserName,
  RoomTeamOneUserProfile,
  RoomTeamOneUserHonorWrap,
  RoomTeamOneUserHonor,
  RoomTeamOneUserHonorIcon,
  RoomTeamEmpty,
  RoomTeamOnebackground,
  RoomTeamTwoUser,
  RoomTeamTwoUserHonorWrap,
  RoomTeamTwoUserHonor,
  RoomTeamTwoUserHonorIcon,
  RoomTeamTwobackground,
  RoomTeamTwoUserName,
  RoomHostIcon,
  RoomTeamLeaderIcon
} from "../../../pages/multi/room/styled";

// 공통으로 사용할 타입들을 먼저 정의
export type UserRole = 'host' | 'guest';
export type TeamRole = 'leader' | 'member';
export type TeamType = 'red' | 'blue';

// Member 인터페이스 정의
export interface User {
  id: number;
  name: string;
  honor: number;
  profileImage: string;
  role: UserRole;
  isLeader: TeamRole;
  team: TeamType;
}

// TeamUserProps는 Member를 활용하여 정의
export interface TeamUserProps {
  user: User | null;
  onClick: () => void;
  teamType: TeamType;
}

export const TeamUserComponent = ({ user, onClick, teamType }: TeamUserProps) => {
  const isRedTeam = teamType === 'blue';
  const isHost = user?.role === 'host'; // null 일수도 있어서 ?로 
  const isLeader = user?.isLeader === 'leader';

  return isRedTeam ? (
    <RoomTeamOneUser onClick={onClick}>
      {user ? (
        <>
          <RoomTeamOneUserName>
            {isHost && <RoomHostIcon src="/icons/crown.svg" alt="Badge" />}
            {user.name}
            {isLeader && <RoomTeamLeaderIcon src="/icons/medal.svg" alt="Badge" />}
          </RoomTeamOneUserName>
          <RoomTeamOneUserProfile src={user.profileImage} alt={user.name} />
          <RoomTeamOneUserHonorWrap>
            <RoomTeamOneUserHonor>{user.honor}</RoomTeamOneUserHonor>
            <RoomTeamOneUserHonorIcon src="/icons/badge.svg" alt="Badge" />
          </RoomTeamOneUserHonorWrap>
        </>
      ) : (
        <>
          <RoomTeamEmpty>비어있음</RoomTeamEmpty>
          <RoomTeamOneUserHonorWrap />
        </>
      )}
      <RoomTeamOnebackground />
    </RoomTeamOneUser>
  ) : (
    <RoomTeamTwoUser onClick={onClick}>
      {user ? (
        <>
          <RoomTeamTwobackground />
          <RoomTeamTwoUserHonorWrap>
            <RoomTeamTwoUserHonor>
              {isHost && <RoomHostIcon src="/icons/crown.svg" alt="Badge" />}
              {user.name}
              {isLeader && <RoomTeamLeaderIcon src="/icons/medal.svg" alt="Badge" />}
            </RoomTeamTwoUserHonor>
            <RoomTeamTwoUserHonorIcon src="/icons/badge.svg" alt="Badge" />
            {isHost && <RoomTeamTwoUserHonorIcon src="/icons/badge.svg" alt="Badge" />}
          </RoomTeamTwoUserHonorWrap>
          <RoomTeamOneUserProfile src={user.profileImage} alt={user.name} />
          <RoomTeamTwoUserName>{user.name}</RoomTeamTwoUserName>

        </>
      ) : (
        <>
          <RoomTeamTwobackground />
          <RoomTeamTwoUserHonorWrap />
          <RoomTeamEmpty>비어있음</RoomTeamEmpty>
        </>
      )}

    </RoomTeamTwoUser>
  );
};
