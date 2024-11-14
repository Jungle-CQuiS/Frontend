import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import { WaitingScreenButtonWrap, WaitingScreenContainer } from "./styled";
import { TeamUserTagProps } from "../../../../../types/room";
import { SecondaryButtonSmall } from "../../../../../components/buttons/styled";
import { useGameState } from "../../../../../contexts/GameStateContext/useGameState";
import { readyRoomSocketEvents } from "../../../../../hook/readyRoomSocketEvent";
import { useNavigate } from "react-router-dom";
import { SERVICES } from "../../../../../config/api/constants";
import { useStompContext } from "../../../../../contexts/StompContext";
import { useConfirm } from "../../../../../components/confirmPopup";

export const WaitingScreen = ({ teamId }: TeamUserTagProps) => {
    // likecontainer의 타입을 명시적으로 지정 (HTMLDivElement | null)
    const likecontainer = useRef<HTMLDivElement | null>(null);
    const animationInstance = useRef<any>(null); // 애니메이션 인스턴스 저장
    const { roomUserId, _roomId } = useGameState();
    const { stompClient } = useStompContext();
    const navigate = useNavigate();
    const customConfirm = useConfirm();

    const handleLeaveRoom = async () => {
        const confirmed = await customConfirm("정말 나가시겠습니까?");
        if (confirmed && roomUserId) {

            readyRoomSocketEvents.userExitRoom(stompClient, _roomId, roomUserId);

            navigate(SERVICES.MULTI);
        }
    }

    useEffect(() => {
        if (likecontainer.current) {

            const animationData = teamId === 1
                ? require("../../../../../lottie/waiting.json")
                : require("../../../../../lottie/waiting_red.json");

            // lottie 애니메이션 로드
            animationInstance.current = lottie.loadAnimation({
                container: likecontainer.current, // 타입 확인된 container 사용
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData
            });
        }

        // 클린업 함수: useEffect가 재실행될 때 이전 애니메이션을 정리
        return () => {
            if (animationInstance.current) {
                animationInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div>
            <WaitingScreenContainer>
                <div ref={likecontainer}></div>
            </WaitingScreenContainer>
            <WaitingScreenButtonWrap>
                <SecondaryButtonSmall onClick={handleLeaveRoom}>나가기</SecondaryButtonSmall>
            </WaitingScreenButtonWrap>
        </div>
    );
};
