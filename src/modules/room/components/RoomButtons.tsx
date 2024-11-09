import { PrimaryButtonMiddle, SecondaryButtonShort } from "../../../components/buttons/styled";
import useButtonSoundEffect from "../../../hook/useHoverSoundEffect";
import { RoomButtonWrap } from "../../../pages/multi/room/styled";


interface RoomButtonsProps {
  MultiReadyButton: (userRoomId: string) => void;
  MultiExitButton: (userRoomId: string) => void
}

export const RoomButtons = ({
  MultiReadyButton,
  MultiExitButton
}: RoomButtonsProps) => {
  const roomUserId = localStorage.getItem("roomUserId");
  useButtonSoundEffect();
  
  const handleReadyClick = () => {
    if (roomUserId) {
      MultiReadyButton(roomUserId);
    } else {
      // roomUserId가 null일 경우에 대한 처리
      console.error("Room user ID is null");
    }
  };

  const handleExitClick = () => {
    if (roomUserId) {
      MultiExitButton(roomUserId);
    } else {
      // roomUserId가 null일 경우에 대한 처리
      console.error("Room user ID is null");
    }
  };


  return (
    <RoomButtonWrap>
      <PrimaryButtonMiddle onClick={handleReadyClick}>Ready</PrimaryButtonMiddle>
      <SecondaryButtonShort onClick={handleExitClick}>나가기</SecondaryButtonShort>
    </RoomButtonWrap>);
};