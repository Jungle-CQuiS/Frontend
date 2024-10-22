import { Modal, IModalProps } from "../..";
import { UserControlWrap, UserControlBtn } from "./styled";

interface UserControlInRoomProps extends IModalProps {
  user: any; // 유저 정보 타입
}

export const UserControlInRoom = ({
    user,
    ...props
  }: UserControlInRoomProps) => {
    const handleKick = () => {
      // 강퇴 로직 추가
      console.log('강퇴하기');
    };
  
    const handleTeamLeaderDelegation = () => {
      // 팀장 위임 로직 추가
      console.log('팀장 위임하기');
    };
  
    return (
      <Modal {...props} width="100px" height="auto" backdropcolor = {false}>
        <UserControlWrap>
          <div>{user?.name}</div>
          <UserControlBtn onClick={handleKick}>강퇴</UserControlBtn>
          <UserControlBtn onClick={handleTeamLeaderDelegation}>팀장 넘겨주기</UserControlBtn>
        </UserControlWrap>
      </Modal>
    );
  };