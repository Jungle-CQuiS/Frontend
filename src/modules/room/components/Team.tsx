import { RoomTeamOne, RoomTeamOneTitleWrap, RoomTeamOneTitleBackground, RoomTeamOneTitle, RoomTeamOneUserWrap, RoomTeamTwo, RoomTeamTwoTitleWrap, RoomTeamTwoTitle, RoomTeamTwoTitleBackground, RoomTeamTwoUserWrap } from "../../../pages/multi/room/styled";
import { TeamUserComponent } from "./TeamUser";


export const TeamComponent = ({ team, teamUsers, handleTeamClick, teamType }: any) => {
  const isTeamOne = teamType === 'blue';

  return isTeamOne ? (
    <RoomTeamOne>
      <RoomTeamOneTitleWrap>
        <RoomTeamOneTitleBackground />
        <RoomTeamOneTitle>{team}</RoomTeamOneTitle>
      </RoomTeamOneTitleWrap>
      <RoomTeamOneUserWrap>
        {teamUsers.map((user: any, index: number) => (
          <TeamUserComponent
            key={index}
            user={user}
            onClick={() => !user && handleTeamClick('blue')}
            teamType="blue"
          />
        ))}
      </RoomTeamOneUserWrap>
    </RoomTeamOne>
  ) : (
    <RoomTeamTwo>
      <RoomTeamTwoTitleWrap>
        <RoomTeamTwoTitle>{team}</RoomTeamTwoTitle>
        <RoomTeamTwoTitleBackground />
      </RoomTeamTwoTitleWrap>
      <RoomTeamTwoUserWrap>
        {teamUsers.map((user: any, index: number) => (
          <TeamUserComponent
            key={index}
            user={user}
            onClick={() => !user && handleTeamClick('red')}
            teamType="red"
          />
        ))}
      </RoomTeamTwoUserWrap>
    </RoomTeamTwo>
  );
};
