import { useLocation } from 'react-router-dom';
import { Background } from '../../../components/background/styled';
import { RoomTitle, RoomTeamOne, RoomTeamOneTitleWrap, RoomTeamOneTitleBackground, RoomTeamOneTitle, RoomTeamOneUserWrap, RoomTeamOneUser, RoomTeamOneUserName, RoomTeamOneUserProfile, RoomTeamOneUserHonorWrap, RoomTeamOneUserHonor, RoomTeamOneUserHonorIcon, RoomTeamOnebackground, RoomTeamContainer, RoomTeamTwo, RoomTeamTwoTitle, RoomTeamTwoTitleBackground, RoomTeamTwoTitleWrap, RoomTeamTwoUser, RoomTeamTwoUserHonor, RoomTeamTwoUserHonorIcon, RoomTeamTwoUserHonorWrap, RoomTeamTwoUserName, RoomTeamTwoUserProfile, RoomTeamTwoUserWrap, RoomTeamTwobackground } from './styled';

export default function Room() {
  const { state } = useLocation();
  
  return (
    <Background>
      <RoomTitle>{state?.roomName}</RoomTitle>
      <RoomTeamContainer>
        <RoomTeamOne>
            <RoomTeamOneTitleWrap>
                <RoomTeamOneTitleBackground></RoomTeamOneTitleBackground>
                <RoomTeamOneTitle>1팀</RoomTeamOneTitle>
            </RoomTeamOneTitleWrap>
            <RoomTeamOneUserWrap>
                <RoomTeamOneUser>
                    <RoomTeamOneUserName>흑화해버린담곰</RoomTeamOneUserName>
                    <RoomTeamOneUserProfile src='/images/profile_image.png' alt='Profile' />
                    <RoomTeamOneUserHonorWrap>
                        <RoomTeamOneUserHonor>54</RoomTeamOneUserHonor>
                        <RoomTeamOneUserHonorIcon src='/icons/badge.svg' alt='Badge' />
                    </RoomTeamOneUserHonorWrap>
                    <RoomTeamOnebackground></RoomTeamOnebackground>
                </RoomTeamOneUser>
            </RoomTeamOneUserWrap>
        </RoomTeamOne>
        <img src='/icons/VS.svg' alt='VS' />
        <RoomTeamTwo>
            <RoomTeamTwoTitleWrap>
                <RoomTeamTwoTitle>2팀</RoomTeamTwoTitle>
                <RoomTeamTwoTitleBackground></RoomTeamTwoTitleBackground>
            </RoomTeamTwoTitleWrap>
            <RoomTeamTwoUserWrap>
                <RoomTeamTwoUser>
                <RoomTeamTwobackground></RoomTeamTwobackground>
                    <RoomTeamTwoUserHonorWrap>
                        <RoomTeamTwoUserHonor>54</RoomTeamTwoUserHonor>
                        <RoomTeamTwoUserHonorIcon src='/icons/badge.svg' alt='Badge' />
                    </RoomTeamTwoUserHonorWrap>
                    <RoomTeamTwoUserProfile src='/images/profile_image.png' alt='Profile' />
                    <RoomTeamTwoUserName>흑화해버린담곰</RoomTeamTwoUserName>

                </RoomTeamTwoUser>
            </RoomTeamTwoUserWrap>
        </RoomTeamTwo>
      </RoomTeamContainer>
    </Background>
  );
}
