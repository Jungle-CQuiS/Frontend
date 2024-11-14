import { useEffect , useState} from "react";
import { TeamUserTagProps } from "../../../../../types/room";
import { UserTag, UserTagImg, UserTagsContainer, EmojiButtonWrapper,CooldownMessage } from "./styled";
import { useTeamState } from "../../../../../contexts/TeamStateContext/useTeamState";
import { useGameUser } from "../../../../../contexts/GameUserContext/useGameUser";
import { EmojiButton } from "../../../../../components/buttons/emoji";
import { AnimatedEmoji } from "../../../../../components/modal/emogi/animatedEmoji";
import { useEmoji } from "../../../../../hook/useEmoji";
import { gameRoomSocketEvents } from "../../../../../hook/gameRoomSocketEvents";
import { useStompContext } from "../../../../../contexts/StompContext";
import { useGameState } from "../../../../../contexts/GameStateContext/useGameState";

export const UserTagsComponent = ({ teamId, roomId }: TeamUserTagProps) => {
    const {userTagRefs} = useGameState();
    const { user } = useGameUser();
    const { stompClient } = useStompContext();
    const { teamOneUsers, teamTwoUsers } = useTeamState()
    const teamUsers = teamId === 1 ? teamOneUsers : teamTwoUsers;
    const [message, setMessage] = useState('');
    const { animatedEmojis , handleEmojiSelect } = useEmoji();

    // refs 설정을 useEffect로 관리
    useEffect(() => {
        // 현재 teamUsers의 refs 설정
        teamUsers.forEach(user => {
            if (user && user.username) {
                const element = document.getElementById(`user-tag-${user.username}`);
                if (element instanceof HTMLDivElement) {
                    userTagRefs.current[user.username] = element;
                }
            }
        });

        // 컴포넌트 언마운트 시 해당 팀의 ref들 정리
        return () => {
            teamUsers.forEach(user => {
                if (user?.username) {
                    delete userTagRefs.current[user.username];
                }
            });
        };
    }, [teamUsers, userTagRefs]);


    return (
        <UserTagsContainer>
            {teamUsers
                .filter((user): user is NonNullable<typeof user> => user !== null)
                .map((teamUser) => {
                    const username = teamUser.username;

                    return (
                        <UserTag
                            key={teamUser.roomUserId} // index 대신 고유한 ID 사용
                            id={`user-tag-${username}`} // id 추가
                            teamId={teamId}
                        >
                            {teamUser.isLeader === 'leader' && <UserTagImg src="/icons/medal.svg" />}
                            {username}
                        </UserTag>
                    );
                })}
            <EmojiButtonWrapper>
            <EmojiButton
                onEmojiSelect={(emojiType: string) => {
                    if (user?.username) {
                        const result = handleEmojiSelect();
                        if(result){
                            gameRoomSocketEvents.sendUserEmoji(
                                stompClient, 
                                teamId === 1 ? "BLUE" : "RED",
                                emojiType, 
                                roomId, 
                                user.roomUserId
                                );}
                        }
                        else{
                            setMessage('잠시 후 다시 시도해주세요');
                            setTimeout(() => setMessage(''), 2000);
                        }
                }}
            />
            {message && <CooldownMessage>{message}</CooldownMessage>}
            </EmojiButtonWrapper>
            {animatedEmojis.map(emoji => {
                return <AnimatedEmoji
                    key={emoji.id}
                    src={emoji.src}
                    startX={emoji.x}
                    startY={emoji.y}
                />
            })}
            
        </UserTagsContainer>
    );
};