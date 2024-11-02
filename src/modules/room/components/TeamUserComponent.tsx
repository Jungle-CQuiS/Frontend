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
  RoomTeamTwoUserProfile,
  RoomTeamTwoUserHonor,
  RoomTeamTwoUserHonorIcon,
  RoomTeamTwobackground,
  RoomTeamTwoUserName,
  RoomHostIcon,
  RoomTeamLeaderIcon
} from "../../../pages/multi/room/styled";
import {ReadyText} from "./styled"
import { TeamUser, TeamType } from "../../../types/teamuser";

// TeamUserProps는 Member를 활용하여 정의
export interface TeamUserProps {
  user: TeamUser | null;
  onClick: () => void;
  teamType: TeamType;
}

export const TeamUserComponent = ({ user, onClick, teamType}: TeamUserProps) => {
  const isBlueTeam = teamType === 'BLUE';
  const isHost = user?.role === 'HOST'; // null 일수도 있어서 ?로 
  const isLeader = user?.isLeader === 'leader';
  const isReady = user?.isReady === 'ready';

  return isBlueTeam ? (
    <RoomTeamOneUser onClick={onClick}>
      {user ? (
        <>
          <RoomTeamOneUserName>
            {isReady && <ReadyText $align = 'left'>READY</ReadyText>}
            {isLeader && <RoomTeamLeaderIcon src="/icons/medal.svg" alt="Badge" />}
            {user.username}
            {isHost && <RoomHostIcon src="/icons/crown.svg" alt="Badge" />}
          </RoomTeamOneUserName>
          <RoomTeamOneUserProfile src={user.profileImage} alt={user.username} />
          <RoomTeamOneUserHonorWrap>
            <RoomTeamOneUserHonor>{user.honorCount}</RoomTeamOneUserHonor>
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
            <RoomTeamTwoUserHonor>{user.honorCount}</RoomTeamTwoUserHonor>
            <RoomTeamTwoUserHonorIcon src="/icons/badge.svg" alt="Badge" />
          </RoomTeamTwoUserHonorWrap>
          <RoomTeamTwoUserProfile src={user.profileImage} alt={user.username} />
          <RoomTeamTwoUserName>
            {isReady && <ReadyText $align = 'right'>READY</ReadyText>}
            {isHost && <RoomTeamTwoUserHonorIcon src="/icons/crown.svg" alt="Badge" />}
            {user.username}
            {isLeader && <RoomTeamLeaderIcon src="/icons/medal.svg" alt="Badge" />}
          </RoomTeamTwoUserName>

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
