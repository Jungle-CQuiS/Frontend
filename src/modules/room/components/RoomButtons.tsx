import { PrimaryButtonMiddle, SecondaryButtonShort } from "../../../components/buttons/styled";
import { RoomButtonWrap } from "../../../pages/multi/room/styled";


interface RoomButtonsProps {
  userRoomId: string;
  MultiReadyButton: (userRoomId: string) => void;
  MultiExitButton: (userRoomId: string) => void
}

export const RoomButtons = ({
  userRoomId,
  MultiReadyButton,
  MultiExitButton
}: RoomButtonsProps) => {

  const handleReadyClick = () => {
    MultiReadyButton(userRoomId);
  };

  const handleExitClick = () => {
    MultiExitButton(userRoomId);
  };


  return (
    <RoomButtonWrap>
      <PrimaryButtonMiddle onClick={handleReadyClick}>Ready</PrimaryButtonMiddle>
      <SecondaryButtonShort onClick={handleExitClick}>나가기</SecondaryButtonShort>
    </RoomButtonWrap>);
};