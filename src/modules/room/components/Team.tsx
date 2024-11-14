import { useState } from "react";
import { RoomTeamOne, RoomTeamOneTitleWrap, RoomTeamOneTitleBackground, RoomTeamOneTitle, RoomTeamOneUserWrap, RoomTeamTwo, RoomTeamTwoTitleWrap, RoomTeamTwoTitle, RoomTeamTwoTitleBackground, RoomTeamTwoUserWrap } from "../../../pages/multi/room/styled";
import { TeamUser } from "../../../types/teamuser";
import { TeamUserComponent } from "./TeamUserComponent";
import { UserControlInRoom } from "../../../components/modal/room/usercontrol";

export const TeamComponent = ({ team, teamUsers, handleTeamClick, teamType }: any) => {
  const isTeamOne = teamType === 'blue';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const handleOpenModal = (user:any, e: React.MouseEvent<HTMLDivElement>) => {
    // Exception
    if(user == null) return;
    setIsModalOpen(true);
    setSelectedUser(user);
    setModalPosition({ x: e.clientX, y: e.clientY });
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
        
        {teamUsers.map((user: TeamUser, index: number) => (
          <div  key={index} onClick={(e) => handleOpenModal(user, e)}>
          <TeamUserComponent
            user={user}
            onClick={() =>!user && handleTeamClick('BLUE')}
            teamType="BLUE"
          />
          </div>
        ))}
        
        <UserControlInRoom
        user = {selectedUser}
        modalPosition = {modalPosition}
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
        
        {teamUsers.map((user: TeamUser, index: number) => (
          <div key={index} onClick={(e) => handleOpenModal(user, e)}>
          <TeamUserComponent
            user={user}
            onClick={() =>!user && handleTeamClick('RED')}
            teamType="RED"
          />
          </div>
        ))}
        
        <UserControlInRoom
        user = {selectedUser}
        modalPosition = {modalPosition}
        open={isModalOpen}
        onClose={handleCloseModal}
        onDone={handleDone}
        />
      </RoomTeamTwoUserWrap>
    </RoomTeamTwo>
  );
};
