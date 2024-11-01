import { Client } from '@stomp/stompjs';
import { useState, useEffect, useRef, useCallback } from 'react';
import { readyRoomSocketEvents } from './readyRoomSocketEvent';
import { useTeamState } from './useTeamState';
import { UseWebSocket } from './useWebSocket';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../config/api/constants';
import { UseGameState } from './useGameState';
import { GameReadyEvents } from '../types/game';

export const useRoom = (roomId: string) => {
    const { teamOneUsers, teamTwoUsers, updateTeams } = useTeamState(roomId);
    const { stompClient, isConnected, connect } = UseWebSocket(roomId, false);
    const Connected = useRef(false);  // 연결 상태 체크용
    const { isAllReady, countdown, handleReadyRoomEvent } = UseGameState();
    const navigate = useNavigate();
    const userUuid = localStorage.getItem("uuid");

    // 구독 로직
    const setupSubscriptions = useCallback((client: Client) => {
        console.log('Setting up room subscriptions');
        readyRoomSocketEvents.subscribeToRoom(client, roomId, updateTeams);
        readyRoomSocketEvents.subscribeRoomStatusMessage(client, roomId, handleReadyRoomEvent);

    }, [roomId, updateTeams]);


    const fetchUserRoomId = async () => {
        let retries = 0;
        const maxRetries = 5;

        while (retries < maxRetries) {
            try {
                await getUserRoomID();
                break;
            } catch (error) {
                console.error(`Failed to get user room ID, retry attempt: ${retries + 1}`);
                retries++;
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }
    };

    const getUserRoomID = async (): Promise<void> => {
        try {
            const token = localStorage.getItem("AccessToken");
            const response = await fetch('/api/quiz/multi/rooms/join', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // 토큰 추가
                    "uuid": `${userUuid}`
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
            localStorage.setItem("roomUserId", data.data.roomUserId);

            console.log("<Response> roomUSerID :", data.data.roomUserId)
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            console.error("Fetching roomUuid failed:", errorMessage);
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
    }, [roomId, isConnected, connect, setupSubscriptions]);

    const exitRoom = async () => {
        try {
            await readyRoomSocketEvents.userExitRoom(stompClient, roomId); // 수정 요!
        } catch (error) {
            console.error('Room exit failed:', error);
            throw error;
        }

        navigate(SERVICES.MULTI);
    };

    const userReady = async () => {
        try {
            await readyRoomSocketEvents.updateUserState(stompClient, roomId); // 수정 요!
        } catch (error) {
            console.error('User ready failed:', error);
            throw error;
        }
    };

    const teamSwitch = async (clickedTeam: string) => {
        try {
            await readyRoomSocketEvents.changeUserTeam(stompClient, roomId);
        } catch (error) {
            console.error('Team switch failed:', error);
            throw error;
        }
    };


    // TODO: Team 나눠서 페이지 이동하는 함수 
    const navigateToTeamPage = async () => {
        // Local Storage에 Game State를 Start로 저장해준다.
        handleReadyRoomEvent(GameReadyEvents.GAME_START);

        // TODO: Team 별로 Subscribe 설정.
    };


    useEffect(() => {
        if (Connected.current) return;
        const initializeRoom = async () => {
            try {
                await enterRoom(); // Active Socket Protocol
                await fetchUserRoomId();
            } catch (error) {
                console.error('Room initialization failed:', error);
            }
        };

        initializeRoom();

        return () => {
            if (stompClient.current?.active) {
                stompClient.current.deactivate();
            }
        };
    }, [roomId]);

    // 디버깅을 위한 상태 변화 감지
    useEffect(() => {
        console.log('Team state updated:', {
            teamOneUsers,
            teamTwoUsers
        });
    }, [teamOneUsers, teamTwoUsers]);

    return {
        teamOneUsers,
        teamTwoUsers,
        exitRoom,
        userReady,
        teamSwitch,
        navigateToTeamPage,
        isAllReady, countdown,
        stompClient
    };
};