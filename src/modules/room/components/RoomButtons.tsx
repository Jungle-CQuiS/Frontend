import { PrimaryButtonMiddle, SecondaryButtonShort } from "../../../components/buttons/styled";
import { RoomButtonWrap } from "../../../pages/multi/room/styled";
import { useUser } from "../../../hook/user";
import { UseWebSocket } from "../../../hook/useWebSocket";
import { QUIZ_MULTI_ENDPOINTS } from "../../../config/api/endpoints/quiz-multi.endpoints";

interface RoomButtonsProps {
  roomId: string;
  MultiReadyButton: () => void;
  MultiExitButton: () => void
}

export const RoomButtons = ({ roomId,MultiReadyButton,MultiExitButton }: RoomButtonsProps) => {
  const { user } = useUser(); // storage에서 로그인된 유저 정보 가져오기.
  //const { updateUserStatus } = useWebSocket(roomId);

  return (
    <RoomButtonWrap>
      <PrimaryButtonMiddle onClick={MultiReadyButton}>Ready</PrimaryButtonMiddle>
      <SecondaryButtonShort onClick={MultiExitButton}>나가기</SecondaryButtonShort>
    </RoomButtonWrap>);
};