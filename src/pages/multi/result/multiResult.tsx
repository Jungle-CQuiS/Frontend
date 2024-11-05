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
  MultiResultCardBottomVoteImg,
  MultiResultCardBottomVoteNumber,
  MultiResultCardBottomVoteWrap,
  MultiResultCardProfileBadge,
  MultiResultCardProfileImg,
  MultiResultCardProfileName,
  MultiResultCardProfileNameWrap,
  MultiResultCardProfileWrap,
  MultiResultCardWrap,
} from "./styled";
import { Background } from "../../../components/background/styled";
import { usePageLeave } from "../../../hook/pageLeaveHandler";

interface User {
  id: number;
  name: string;
  isLeader: boolean;
  votes: number;
}

export const MultiModeResultPage = () => {
  const [teamId, setTeamId] = useState(2);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isVoteCompleted, setIsVoteCompleted] = useState(false);

  usePageLeave();

  const users: User[] = [
    { id: 1, name: "백승현코치님", isLeader: true, votes: 1 },
    { id: 2, name: "김현수코치님", isLeader: false, votes: 1 },
    { id: 3, name: "백정훈코치님", isLeader: false, votes: 1 },
    { id: 4, name: "-", isLeader: false, votes: 0 },
    { id: 5, name: "-", isLeader: false, votes: 0 }, 
  ];

  const handleUserClick = (userId: number) => {
    if (!isVoteCompleted) {
      setSelectedUserId(userId);
      setIsVoteCompleted(true);
    }
  };

  return (
    <Background>
      <MultiResultContainer>
        <MultiResultHeader>
          <MultiResultHeaderTag teamId={teamId}>{teamId}팀 승리</MultiResultHeaderTag>
          <MultiResultHeaderText>명예를 주고 싶은 팀원을 선택해주세요</MultiResultHeaderText>
        </MultiResultHeader>

        <MultiResultCardContainer>
          {users.map((user) => (
            <MultiResultCardWrap key={user.id}>
              <MultiResultCard
                onClick={() => handleUserClick(user.id)}
                style={{ pointerEvents: isVoteCompleted && selectedUserId !== user.id ? "none" : "auto" }}
              >
                <MultiResultCardProfileWrap>
                  <MultiResultCardProfileImg src="/images/profile_image.png" />
                  <MultiResultCardProfileNameWrap>
                    {/* 팀장인 경우에만 아이콘 표시 */}
                    {user.isLeader && <MultiResultCardProfileBadge src="/icons/medal.svg" />}
                    <MultiResultCardProfileName>{user.name}</MultiResultCardProfileName>
                  </MultiResultCardProfileNameWrap>
                </MultiResultCardProfileWrap>

                <MultiResultCardBottom>
                  {/* 선택된 유저에만 체크 이미지 표시 */}
                  <div style={{ width: "36px" }}></div>
                  {selectedUserId === user.id && (
                    <MultiResultCardBottomSelected src="/icons/vote_selected.svg" />
                  )}
                  <MultiResultCardBottomVoteWrap>
                    <MultiResultCardBottomVoteImg src="/icons/up_arrow.svg" />
                    <MultiResultCardBottomVoteNumber>{user.votes}</MultiResultCardBottomVoteNumber>
                  </MultiResultCardBottomVoteWrap>
                </MultiResultCardBottom>
              </MultiResultCard>
            </MultiResultCardWrap>
          ))}
        </MultiResultCardContainer>

        <MultiResultButtonWrap>
          <SecondaryButtonSmall>나가기</SecondaryButtonSmall>
          <BlackButtonSmall>한번 더 하기</BlackButtonSmall>
        </MultiResultButtonWrap>
      </MultiResultContainer>
    </Background>
  );
};
