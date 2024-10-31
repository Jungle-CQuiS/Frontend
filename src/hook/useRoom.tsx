import { Client } from '@stomp/stompjs';
import { useState, useEffect, useRef, useCallback } from 'react';
import { socketEvents } from './socketEvent';
import { useTeamState } from './useTeamState';
import { UseWebSocket } from './useWebSocket';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../config/api/constants';
import { useRoomUserId } from './useRoomUserId';
import { UseGameState } from './useGameState';

export const useRoom = (roomId: string) => {
    const { teamOneUsers, teamTwoUsers, updateTeams } = useTeamState(roomId);
    const { stompClient, isConnected, connect } = UseWebSocket(roomId, false);
    const Connected = useRef(false);  // 연결 상태 체크용
    const { GameState, isAllReady, isGameStart, countdown, handleReadyRoomEvent } = UseGameState();
    const navigate = useNavigate();
    const userUuid = localStorage.getItem("uuid");
    // 구독 로직
    const setupSubscriptions = useCallback((client: Client) => {
        console.log('Setting up room subscriptions');
        /*if (userUuid) {  // userUuid가 null이 아닌 경우에만 호출
            socketEvents.subscribeRoomUserId(client, userUuid, initRoomUserID);
        }*/

        //REST API : room ID 가져오기
        socketEvents.subscribeToRoom(client, roomId, updateTeams);
        socketEvents.subscribeRoomStatusMessage(client, roomId, handleReadyRoomEvent);

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
            await socketEvents.enterRoom(stompClient, roomId);
            

        } catch (error) {
            console.error('Room entry failed:', error);
            throw error;
        }
    }, [roomId, isConnected, connect, setupSubscriptions]);

    const exitRoom = async (roomUserId_: string) => {
        try {
            await socketEvents.userExitRoom(stompClient, roomUserId_, roomId); // 수정 요!
        } catch (error) {
            console.error('Room exit failed:', error);
            throw error;
        }

        navigate(SERVICES.MULTI);
    };

    const userReady = async () => {
        try {
            await socketEvents.updateUserState(stompClient, roomId); // 수정 요!
        } catch (error) {
            console.error('User ready failed:', error);
            throw error;
        }
    };

    const teamSwitch = async (clickedTeam: string) => {
        try {
            // TODO: team switch socket protocol
        } catch (error) {
            console.error('Team switch failed:', error);
            throw error;
        }
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
        GameState, isAllReady, isGameStart, countdown,
        stompClient
    };
};