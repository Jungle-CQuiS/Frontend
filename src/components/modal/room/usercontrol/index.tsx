import { Client, Stomp } from "@stomp/stompjs";
import { Modal, IModalProps } from "../..";
import { socketEvents } from "../../../../hook/socketEvent";
import { UserControlWrap, UserControlBtn, UserControlKickBtn } from "./styled";
import React, { useState } from "react";

interface UserControlInRoomProps extends IModalProps {
  user: any; // 유저 정보 타입 => 수정 필요
  modalPosition:any;
}

export const UserControlInRoom = ({
  user,
  modalPosition,
  ...props
}: UserControlInRoomProps & { modalPosition: { x: number; y: number } }) => {
  const handleKick = () => {
    // 강퇴 로직 추가
    // socketEvents.userKick(stompClient, userId, user.roomUserId, roomId);  => stompClient랑 roomId 받아오는 부분 추가 요망..
    console.log('강퇴하기');
  };

  const handleTeamLeaderDelegation = () => {
    // 팀장 위임 로직 추가
    console.log('팀장 위임하기');
  };

  const [volume, setVolume] = useState<number>(0.5);

  return (
    <Modal {...props} width="130px" height="auto" backdropcolor={false} position="absolute"
      $top={modalPosition.y}
      $left={modalPosition.x}
      $transform="translate(0, 0)" 
      $round = "0px"
      $border = "1px solid #333"
      $padding = "10px 10px"
    >
      <UserControlWrap>
        <div style={{ fontWeight: 'bold' }}>{user?.name}</div>
        <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(event) =>{ setVolume(event.target.valueAsNumber);}} />
        {<UserControlBtn onClick={handleTeamLeaderDelegation}>팀장 위임하기</UserControlBtn>}
        {<UserControlBtn onClick={handleTeamLeaderDelegation}>방장 위임하기</UserControlBtn>}
        <UserControlKickBtn onClick={handleKick}>강퇴</UserControlKickBtn>
      </UserControlWrap>
    </Modal>
  );
};