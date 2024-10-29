import { Client } from '@stomp/stompjs';
import { useState, useEffect,useRef, useCallback } from 'react';
import { socketEvents } from './socketEvent';
import { useTeamState } from './useTeamState';
import { UseWebSocket } from './useWebSocket';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../config/api/constants';
import { useRoomUerId } from './useRoomUserId';
import { UseGameState } from './useGameState';

export const useRoom = (roomId: string) => {
    const { teamOneUsers, teamTwoUsers, updateTeams } = useTeamState(roomId);
    const { stompClient, isConnected, connect } = UseWebSocket(roomId, false);
    const Connected = useRef(false);  // 연결 상태 체크용
    const { roomUserId, initRoomUserID } = useRoomUerId();
    const {GameState, isAllReady, isGameStart,countdown, handleReadyRoomEvent} = UseGameState();
    const navigate = useNavigate();
    const userUuid = localStorage.getItem("uuid");
    // 구독 로직
    const setupSubscriptions = useCallback((client: Client) => {
        console.log('Setting up room subscriptions');
        if (userUuid) {  // userUuid가 null이 아닌 경우에만 호출
            socketEvents.subscribeRoomUserId(client, userUuid, initRoomUserID);
        }

        socketEvents.subscribeToRoom(client, roomId, updateTeams);
        socketEvents.subscribeRoomStatusMessage(client, roomId, handleReadyRoomEvent);

    }, [roomId, updateTeams]);

    // 입장 로직
    const enterRoom = useCallback(async () => {
        try {
            // 연결 확인 및 구독 설정
            if (!stompClient.current?.active || !isConnected) {
                await connect();
                // 연결 성공 후 구독 설정
                Connected.current = true;
                if (stompClient.current) {
                    setupSubscriptions(stompClient.current);
                }
            }

            // 입장 메시지 전송
            await socketEvents.enterRoom(stompClient, roomId);
        } catch (error) {
            console.error('Room entry failed:', error);
            throw error;
        }
    }, [roomId, isConnected, connect, setupSubscriptions]);

    const exitRoom = async (roomUserId: string) => {
        try {
            await socketEvents.userExitRoom(stompClient, roomUserId, roomId); // 수정 요!
        } catch (error) {
            console.error('Room exit failed:', error);
            throw error;
        }

        navigate(SERVICES.MULTI);
    };

    const userReady = async (roomUserId: string) => {
        try {
            await socketEvents.updateUserState(stompClient, roomUserId, roomId); // 수정 요!
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

        enterRoom(); // Active Socket Protocol 


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
        roomUserId,
        teamOneUsers,
        teamTwoUsers,
        exitRoom,
        userReady,
        teamSwitch,
        GameState, isAllReady, isGameStart, countdown
    };
};