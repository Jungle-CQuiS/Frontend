import { PrimaryButtonMiddle, SecondaryButtonShort } from "../../../components/buttons/styled";
import { RoomButtonWrap } from "../../../pages/multi/room/styled";
import { useUser } from "../../../hook/user";
import { useWebSocket } from "../../../hook/useWebSocket";

interface RoomButtonsProps {
  roomId: string;
}

export const RoomButtons = ({ roomId }: RoomButtonsProps) => {
  const { user } = useUser(); // storage에서 로그인된 유저 정보 가져오기.
  const { updateUserStatus } = useWebSocket(roomId);

  const MultiReadyButton = () => {
    // 해당 유저 READY상태로 API 요청 보내기.
    console.log("준비 API 요청");
  };

  const MultiExitButton = async () => {
    // 해당 유저 EXIT API 요청 보내기.
    const requestData = {
      roomUserId: user,
      roomId: roomId,
    };


    try {
      const response = await fetch("/quiz/multi/exit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const resultExit = await response.json();
        console.log("EXIT 성공", resultExit);
      } else {
        console.log(requestData.roomUserId);
        console.log(requestData.roomId);
        console.error("EXIT API 요청 실패:", response.status);
      }
    } catch (error) {
      console.error("EXIT API 에러:", error);
    }

  };

  return (
    <RoomButtonWrap>
      <PrimaryButtonMiddle onClick={MultiReadyButton}>Ready</PrimaryButtonMiddle>
      <SecondaryButtonShort onClick={MultiExitButton}>나가기</SecondaryButtonShort>
    </RoomButtonWrap>);
};