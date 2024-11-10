import { Client } from '@stomp/stompjs';
import { useState, useEffect, useRef, useCallback } from 'react';
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
    const { joinRoom, disconnectSession } = useOpenViduContext();
    const { gameState, isAllReady, roomUserId,
        handleReadyRoomEvent, setRoomUserIdWithState, setRoomId } = useGameState();
    const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
    const navigate = useNavigate();
    const userUuid = localStorage.getItem("uuid");

    // 구독 로직
    const setupSubscriptions = useCallback((client: Client) => {
        console.log('Setting up room subscriptions');
        readyRoomSocketEvents.subscribeToRoom(client, roomId, updateTeams);
        readyRoomSocketEvents.subscribeRoomStatusMessage(client, roomId, handleReadyRoomEvent);

    }, []);

    const joinUserRoom = async (): Promise<void> => {
        const maxRetries = 3;  // 최대 재시도 횟수
        const retryDelay = 1000;  // 재시도 간격 (1초)

        const attemptFetch = async (retryCount: number): Promise<void> => {
            try {
                const token = localStorage.getItem("AccessToken");
                const response = await fetch('/api/quiz/multi/rooms/join', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                        "uuid": `${userUuid}`,
                        "RefreshToken": `${localStorage.getItem("RefreshToken")}`,
                    },
                    body: JSON.stringify({
                        "uuid": `${userUuid}`
                    })
                });

                if (!response.ok) {
                    console.log('Response error:', response);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setRoomUserIdWithState(data.data.roomUserId);
                setRoomId(roomId);
                joinRoom(data.data.sessionId, data.data.token, data.data.roomUserId);
                console.log("<Response> roomUSerID :", data.data.roomUserId);

            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : String(e);
                console.error(`Fetch attempt ${retryCount + 1} failed:`, errorMessage);

                if (retryCount < maxRetries - 1) {
                    console.log(`Retrying in ${retryDelay / 1000} seconds... (${retryCount + 1}/${maxRetries})`);
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                    return attemptFetch(retryCount + 1);
                } else {
                    console.error("Max retry attempts reached");
                    throw e;
                }
            }
        };

        try {
            await attemptFetch(0);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            console.error("All fetch attempts failed:", errorMessage);
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
            if (roomUserId){
                await readyRoomSocketEvents.userExitRoom(stompClient, roomId, roomUserId); // 수정 요!
                disconnectSession(); // session 해제
                navigate(SERVICES.MULTI);
            }
            else {
                console.error('Room exit failed: no roomUserId');
            }

            
        } catch (error) {
            console.error('Room exit failed:', error);
            throw error;
        }

     
    };

    const userReady = async () => {
        try {
            if (roomUserId)
                await readyRoomSocketEvents.updateUserState(stompClient, roomId, roomUserId);
            else {
                console.error('User Ready failed:no roomUserId');
            }
        } catch (error) {
            console.error('User ready failed:', error);
            throw error;
        }
    };

    const teamSwitch = async (clickedTeam: string) => {
        try {
            if (roomUserId)
                await readyRoomSocketEvents.changeUserTeam(stompClient, roomId, roomUserId);
            else {
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
        const initializeOnce = async () => {
            // 게임 준비 상태일 때만 해당 훅을 실행한다.
            if (gameState !== GameStatus.ENTER) return;
            if (Connected.current) return;
            if (hasJoinedRoom) return;

            Connected.current = true; // 초기화 시작 전에 플래그 설정

            try {
                setHasJoinedRoom(true);
                handleReadyRoomEvent(GameReadyEvents.ENTER);

                await enterRoom();
                await joinUserRoom();
                handleReadyRoomEvent(GameReadyEvents.LOADING);
            } catch (error) {
                console.error('Room initialization failed:', error);
                handleReadyRoomEvent(GameReadyEvents.ENTER);
                Connected.current = false; // 에러 시 플래그 리셋
            }
        };

        initializeOnce();

        // cleanup
        return () => {
            // necessary cleanup code
        };
    }, [roomId]);

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