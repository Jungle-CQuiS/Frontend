import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useCallback } from 'react';
import { readyRoomSocketEvents } from './readyRoomSocketEvent';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../config/api/constants';
import { useGameState } from '../contexts/GameStateContext/useGameState';
import { GameReadyEvents, GameStatus } from '../types/game';
import { useStompContext } from '../contexts/StompContext';
import { useOpenViduContext } from '../contexts/OpenViduContext/useOpenViduContext';
import { useTeamState } from '../contexts/TeamStateContext/useTeamState';

export const useRoom = (roomId: string) => {
    const { teamOneUsers, teamTwoUsers, isTeamsLoaded, updateTeams } = useTeamState();
    const { stompClient, isConnected, connect } = useStompContext();
    const Connected = useRef(false);  // 연결 상태 체크용
    const { joinRoom , disconnectSession} = useOpenViduContext();
    const { gameState, isAllReady, roomUserId ,
        handleReadyRoomEvent, setRoomUserIdWithState, setRoomId  } = useGameState();
    const navigate = useNavigate();
    const userUuid = localStorage.getItem("uuid");

    // 구독 로직
    const setupSubscriptions = useCallback((client: Client) => {
        console.log('Setting up room subscriptions');
        readyRoomSocketEvents.subscribeToRoom(client, roomId, updateTeams);
        readyRoomSocketEvents.subscribeRoomStatusMessage(client, roomId, handleReadyRoomEvent);

    }, []);

    const joinUserRoom = async (): Promise<void> => {
        try {
            const token = localStorage.getItem("AccessToken");
            const response = await fetch('/api/quiz/multi/rooms/join', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // 토큰 추가
                    "uuid": `${userUuid}`,
                    "RefreshToken": `${localStorage.getItem("RefreshToken")}`,
                },
                body: JSON.stringify({
                    "uuid": `${userUuid}`
                })
            });

            if (!response.ok) {
                console.log(response);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // session과 토큰을 받아서 세팅해준다.
            setRoomUserIdWithState(data.data.roomUserId);  // context에 roomUserId 업데이트
            setRoomId(roomId); // Context에 roomId 업데이트
            joinRoom(data.data.sessionId, data.data.token, data.data.roomUserId);
            console.log("<Response> roomUSerID :", data.data.roomUserId)
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            console.error("Fetching roomUuid failed:", errorMessage);
            throw e;
        }
    };

    // 입장 로직
    const enterRoom = useCallback(async () => {
        try {
            // 연결 확인 및 구독 설정
            if (!stompClient.current?.active || !isConnected) {
                await connect();
                Connected.current = true; // 연결 성공 후 구독 설정
            }

            if (stompClient.current) {
                await new Promise<void>((resolve) => {
                    setupSubscriptions(stompClient.current!);
                    resolve();
                });
            }

            // 입장 메시지 전송
            await readyRoomSocketEvents.enterRoom(stompClient, roomId);


        } catch (error) {
            console.error('Room entry failed:', error);
            throw error;
        }
    }, []);

    const exitRoom = async () => {
        try {
            if(roomUserId)
                await readyRoomSocketEvents.userExitRoom(stompClient, roomId,roomUserId); // 수정 요!
            else{
                console.error('Room exit failed: no roomUserId');
            }

            disconnectSession(); // session 해제
        } catch (error) {
            console.error('Room exit failed:', error);
            throw error;
        }

        navigate(SERVICES.MULTI);
    };

    const userReady = async () => {
        try {
            if(roomUserId)
                await readyRoomSocketEvents.updateUserState(stompClient, roomId, roomUserId);
            else{
                console.error('User Ready failed:no roomUserId');
            }
        } catch (error) {
            console.error('User ready failed:', error);
            throw error;
        }
    };

    const teamSwitch = async (clickedTeam: string) => {
        try {
            if(roomUserId)
                await readyRoomSocketEvents.changeUserTeam(stompClient, roomId, roomUserId);
            else{
                console.error('Team switch failed: no roomUserId');
            }
        } catch (error) {
            console.error('Team switch failed:', error);
            throw error;
        }
    };


    const navigateToGamePage = async () => {
        //GameStart 상태로 만들어줌.
        handleReadyRoomEvent(GameReadyEvents.GAME_START);


        if (!userUuid) {
            console.error('userUuid가 없습니다');
            return;
            // 또는 다른 에러 처리
        }
        if (!stompClient.current) {
            console.error('StompClient가 연결되지 않았습니다');
            return;
            // 또는 다른 에러 처리
        }

        


        // Navigate Game Page
        navigate("/multi/game");
    };

    useEffect(() => {
        if (!isTeamsLoaded && stompClient.current?.active) {
            console.log('Requesting initial team data...');
            // 필요한 경우 초기 팀 데이터 요청 로직
        }
    }, [isTeamsLoaded, stompClient]);


    useEffect(() => {
        // 게임 준비 상태일 때만. 해당 훅을 실행한다.
        if (gameState !== GameStatus.ENTER) return;
        if (Connected.current) return;

        const initializeRoom = async () => {
            try {
                handleReadyRoomEvent(GameReadyEvents.ENTER);
                await enterRoom(); // Active Socket Protocol
                await joinUserRoom();
                handleReadyRoomEvent(GameReadyEvents.LOADING);
            } catch (error) {
                console.error('Room initialization failed:', error);
                handleReadyRoomEvent(GameReadyEvents.ENTER);
            }
        };

        if(roomUserId === null)
            initializeRoom();
        else{
            handleReadyRoomEvent(GameReadyEvents.ENTER);
        }
        

        return () => {
        };
    }, [gameState, roomUserId]);

    return {
        teamOneUsers,
        teamTwoUsers,
        exitRoom,
        userReady,
        teamSwitch,
        navigateToGamePage,
        isAllReady,
        stompClient,
        isTeamsLoaded
    };
};