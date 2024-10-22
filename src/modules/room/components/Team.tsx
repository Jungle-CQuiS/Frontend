import { useState } from "react";
import { RoomTeamOne, RoomTeamOneTitleWrap, RoomTeamOneTitleBackground, RoomTeamOneTitle, RoomTeamOneUserWrap, RoomTeamTwo, RoomTeamTwoTitleWrap, RoomTeamTwoTitle, RoomTeamTwoTitleBackground, RoomTeamTwoUserWrap } from "../../../pages/multi/room/styled";
import { TeamUserComponent } from "./TeamUser";
import { UserControlInRoom } from "../../../components/modal/room/usercontrol";

export const TeamComponent = ({ team, teamUsers, handleTeamClick, teamType }: any) => {
  const isTeamOne = teamType === 'blue';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenModal = (user:any) => {
    setIsModalOpen(true);
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDone = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return isTeamOne ? (
    <RoomTeamOne>
      <RoomTeamOneTitleWrap>
        <RoomTeamOneTitleBackground />
        <RoomTeamOneTitle>{team}</RoomTeamOneTitle>
      </RoomTeamOneTitleWrap>
      <RoomTeamOneUserWrap>
        
        {teamUsers.map((user: any, index: number) => (
          <div  onClick={() => handleOpenModal(user)}>
          <TeamUserComponent
            key={index}
            user={user}
            onClick={() => !user && handleTeamClick('blue')}
            teamType="blue"
          />
          </div>
        ))}
        
        <UserControlInRoom
        user = {selectedUser}
        open={isModalOpen}
        onClose={handleCloseModal}
        onDone={handleDone}
        />
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
          <div onClick={() => handleOpenModal(user)}>
          <TeamUserComponent
            key={index}
            user={user}
            onClick={() => !user && handleTeamClick('red')}
            teamType="red"
          />
          </div>
        ))}
        
        <UserControlInRoom
        user = {selectedUser}
        open={isModalOpen}
        onClose={handleCloseModal}
        onDone={handleDone}
        />
      </RoomTeamTwoUserWrap>
    </RoomTeamTwo>
  );
};
