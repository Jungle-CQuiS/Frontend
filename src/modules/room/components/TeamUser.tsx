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
  } from "../../../pages/multi/room/styled";
  
  interface TeamUserProps {
    user: any;
    onClick: () => void;
    teamType: 'red' | 'blue';  // 빨강 팀과 파랑 팀
  }
  
  export const TeamUserComponent = ({ user, onClick, teamType }: TeamUserProps) => {
    const isRedTeam = teamType === 'red';
  
    return isRedTeam ? (
      <RoomTeamOneUser onClick={onClick}>
        {user ? (
          <>
            <RoomTeamOneUserName>{user.name}</RoomTeamOneUserName>
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
              <RoomTeamTwoUserHonor>{user.honor}</RoomTeamTwoUserHonor>
              <RoomTeamTwoUserHonorIcon src="/icons/badge.svg" alt="Badge" />
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
  