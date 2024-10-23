import { Modal, IModalProps } from "../..";
import { UserControlWrap, UserControlBtn, UserControlKickBtn } from "./styled";

interface UserControlInRoomProps extends IModalProps {
  user: any; // 유저 정보 타입
  modalPosition:any;
}

export const UserControlInRoom = ({
  user,
  modalPosition,
  ...props
}: UserControlInRoomProps & { modalPosition: { x: number; y: number } }) => {
  const handleKick = () => {
    // 강퇴 로직 추가
    console.log('강퇴하기');
  };

  const handleTeamLeaderDelegation = () => {
    // 팀장 위임 로직 추가
    console.log('팀장 위임하기');
  };

  return (
    <Modal {...props} width="130px" height="auto" backdropcolor={false} position="absolute"
      $top={modalPosition.y}
      $left={modalPosition.x}
      $transform="translate(0, 0)" 
      $border = "0px"
      $padding = "10px 10px"
    >
      <UserControlWrap>
        <div style={{ fontWeight: 'bold' }}>{user?.name}</div>
        {<UserControlBtn onClick={handleTeamLeaderDelegation}>팀장 위임하기</UserControlBtn>}
        {<UserControlBtn onClick={handleTeamLeaderDelegation}>방장 위임하기</UserControlBtn>}
        <UserControlKickBtn onClick={handleKick}>강퇴</UserControlKickBtn>
      </UserControlWrap>
    </Modal>
  );
};