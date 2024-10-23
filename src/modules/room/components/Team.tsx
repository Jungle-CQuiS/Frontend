import { useState } from "react";
import { RoomTeamOne, RoomTeamOneTitleWrap, RoomTeamOneTitleBackground, RoomTeamOneTitle, RoomTeamOneUserWrap, RoomTeamTwo, RoomTeamTwoTitleWrap, RoomTeamTwoTitle, RoomTeamTwoTitleBackground, RoomTeamTwoUserWrap } from "../../../pages/multi/room/styled";
import { TeamUserComponent } from "./TeamUser";
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
    console.log({ x: e.clientX, y: e.clientY });
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
        
        {teamUsers.map((user: any, index: number) => (
          <div  onClick={(e) => handleOpenModal(user, e)}>
          <TeamUserComponent
            key={index}
            user={user}
            onClick={() => !user && handleTeamClick('blue')}
            teamType="blue"
            state= {user?.state}
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
        
        {teamUsers.map((user: any, index: number) => (
          <div onClick={(e) => handleOpenModal(user, e)}>
          <TeamUserComponent
            key={index}
            user={user}
            onClick={() => !user && handleTeamClick('red')}
            teamType="red"
            state= {user?.state}
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
