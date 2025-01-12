import { useState } from "react";
import { BlackButtonSmall, SecondaryButtonSmall } from "../../../components/buttons/styled";
import {
  MultiResultContainer,
  MultiResultHeader,
  MultiResultHeaderTag,
  MultiResultHeaderText,
  MultiResultCardContainer,
  MultiResultButtonWrap,
  MultiResultCard,
  MultiResultCardBottom,
  MultiResultCardBottomSelected,
  MultiResultCardProfileBadge,
  MultiResultCardProfileImg,
  MultiResultCardProfileName,
  MultiResultCardProfileNameWrap,
  MultiResultCardProfileWrap,
  MultiResultCardWrap,
} from "./styled";
import { Background } from "../../../components/background/styled";
import { usePageLeave } from "../../../hook/pageLeaveHandler";
import { useLocation } from "react-router-dom";
import { useTeamState } from "../../../contexts/TeamStateContext/useTeamState";
import { readyRoomSocketEvents } from "../../../hook/readyRoomSocketEvent";
import { SERVICES } from "../../../config/api/constants";
import { useNavigate } from "react-router-dom";
import { useStompContext } from "../../../contexts/StompContext";
import { useGameState } from "../../../contexts/GameStateContext/useGameState";
import { MultiBackgroundRoom } from "../room/styled";

export const MultiModeResultPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { winner } = location.state;
  const teamId = winner == 'BLUE' ? 1 : 2;

  const { stompClient } = useStompContext();
  const { roomUserId, _roomId } = useGameState();

  const { teamOneUsers, teamTwoUsers } = useTeamState();

  const users = (teamId === 1 ? teamOneUsers : teamTwoUsers);
  const mappedUsers = users.map((teamUser, index) => ({
    id: teamUser?.roomUserId ?? index,  // undefined일 경우 index를 사용
    name: teamUser?.username ?? "-",
    isLeader: teamUser?.isLeader === 'leader',
    votes: 0
  }));

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isVoteCompleted, setIsVoteCompleted] = useState(false);

  usePageLeave();

  const handleUserClick = (userId: number) => {
    if (!isVoteCompleted) {
      setSelectedUserId(userId);
      setIsVoteCompleted(true);
  
      fetch('/api/quiz/multi/honor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
        },
        body: JSON.stringify({
          honorRoomUserId: userId, 
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('API 응답:', data);
        })
        .catch((error) => {
          console.error('API 요청 오류:', error);
        });
    }
  };
  

  return (
    <MultiBackgroundRoom>
      <MultiResultContainer>
        <MultiResultHeader>
          <MultiResultHeaderTag teamId={teamId}>{teamId}팀 승리</MultiResultHeaderTag>
          <MultiResultHeaderText>명예를 주고 싶은 팀원을 선택해주세요</MultiResultHeaderText>
        </MultiResultHeader>

        <MultiResultCardContainer>
          {mappedUsers
            .filter(user => user.name !== "-")
            .map((user) => (
            <MultiResultCardWrap
              key={user.id}
              isSelected={selectedUserId === user.id}
              isVoted={isVoteCompleted}
              onClick={() => {
                if (user.name === '-' || isVoteCompleted) return;
                handleUserClick(user.id);
              }}
            >
              <MultiResultCard
                onClick={() => {
                  if (user.name === '-' || isVoteCompleted) return;
                  handleUserClick(user.id);
                }}
                style={{
                  cursor: !user.name || isVoteCompleted ? "not-allowed" : "pointer",
                }}
              >
                <MultiResultCardProfileWrap>
                  <MultiResultCardProfileImg src="/images/profile_image.png" />
                  <MultiResultCardProfileNameWrap>
                    {/* 팀장인 경우에만 아이콘 표시 */}
                    {user?.isLeader && <MultiResultCardProfileBadge src="/icons/medal.svg" />}
                    <MultiResultCardProfileName>{user.name || ""}</MultiResultCardProfileName>
                  </MultiResultCardProfileNameWrap>
                </MultiResultCardProfileWrap>

                <MultiResultCardBottom>
                  {/* 선택된 유저에만 체크 이미지 표시 */}
                  {selectedUserId === user.id && (
                    <MultiResultCardBottomSelected src="/icons/vote_selected.svg" />
                  )}
                </MultiResultCardBottom>
              </MultiResultCard>
            </MultiResultCardWrap>
          ))}
        </MultiResultCardContainer>


        <MultiResultButtonWrap>
          <SecondaryButtonSmall
            onClick={() => {
              if(roomUserId){
              readyRoomSocketEvents.userExitRoom(stompClient, _roomId, roomUserId);
              navigate(SERVICES.MULTI);}
            }}
          >나가기</SecondaryButtonSmall>
          <BlackButtonSmall>한번 더 하기</BlackButtonSmall>
        </MultiResultButtonWrap>
      </MultiResultContainer>
    </MultiBackgroundRoom>
  );
};
