import { Client } from '@stomp/stompjs';
import { useState, useEffect, useRef, useCallback } from "react";
import { SOCKET_DESTINATIONS } from '../config/websocket/constants';
import { socketEvents } from './socketEvent';

interface RoomMessage {
    roomUserId: string;
    roomId: string;
}

const CONSTANTS = {
    RECONNECT_DELAY: 5000,
    HEARTBEAT_INCOMING: 0,// 타임아웃 비활성화
    HEARTBEAT_OUTGOING: 0,// 타임아웃 비활성화
    MAX_TEAM_SIZE: 5
} as const;

export const UseWebSocket = (roomId: string, autoConnect: boolean = false) => {
    const stompClient = useRef<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

 
    // 기본 STOMP 클라이언트 설정
    const setupStompClient = useCallback(() => {
        return new Client({
            brokerURL: 'ws://dev.cquis.net:8080/ws',
            connectHeaders: {
                roomId: roomId,
            },
            debug: (str) => {
                console.log('STOMP Debug:', str);
            },
            // onConnect는 connect 함수에서 설정하므로 여기서는 제거
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                setIsConnected(false)
            },
            onStompError: (error) => {
                console.error('WebSocket Error:', error);
                setError('Failed to connect to the game server');
                setIsLoading(false);
            },
            reconnectDelay: CONSTANTS.RECONNECT_DELAY,
            heartbeatIncoming: CONSTANTS.HEARTBEAT_INCOMING,
            heartbeatOutgoing: CONSTANTS.HEARTBEAT_OUTGOING,
        });
    }, [roomId]);

    const handleConnect = useCallback((client: Client) => {
        console.log('Connected to WebSocket');
        setIsLoading(false);
        setIsConnected(true);

        // 구독 설정
        //socketEvents.subscribeToRoom(client, roomId, updateTeams);
    }, []);

    // 연결 로직 
    const connect = useCallback(() => {
        return new Promise<void>((resolve, reject) => {
            if (stompClient.current?.active && isConnected) {
                console.log('Already connected');
                resolve();
                return;
            }

            try {
                const client = setupStompClient();

                // 연결 되면 할 것.
                client.onConnect = () => {
                    console.log('Connection successful');

                    handleConnect(client);
                    stompClient.current = client;
                    setIsConnected(true);
                    resolve();
                };

                // 에러 핸들러 추가
                client.onStompError = (error) => {

                    reject(error);
                };

                client.onWebSocketError = (event) => {

                    reject(new Error('WebSocket connection failed'));
                };

                console.log('Activating client');
                stompClient.current = client;
                client.activate();  // 여기서 activate 호출해야 함

            } catch (error) {
                console.error('Connection setup error:', error);
                reject(error);
            }
        });
    }, [setupStompClient, handleConnect]);

    // 소켓 이벤트 함수
    // 2. 준비하기
    const updateUserStatus = (userId: string, status: 'READY' | 'NOT_READY') => {
        if (!stompClient.current?.active || !isConnected) {
            console.error('STOMP connection is not active');
            return;
        }

        stompClient.current.publish({
            destination: SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.READY(roomId),
            body: JSON.stringify({
                "roomUserId": userId,
                "roomId": roomId,
            })
        });
    };

    // 3. 팀 바꾸기
    const changeUserTeam = (userId: string, team: 'red' | 'blue') => {
        if (!stompClient.current?.active || !isConnected) {
            console.error('STOMP connection is not active');
            return;
        }

        stompClient.current.publish({
            destination: SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.TEAMSWITCH(roomId),
            body: JSON.stringify({
                "roomUserId": userId,
                "roomId": roomId
            })
        });
    }
    // 4. 방 나가기
    const userExitRoom = (userId: string, roomId: string) => {
        if (!stompClient.current?.active || !isConnected) {
            console.error('STOMP connection is not active');
            return;
        }

        stompClient.current.publish({
            destination: SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.EXIT(roomId),
            body: JSON.stringify({
                "roomUserId": userId,
                "roomId": roomId,
            })
        });
    }

    // 5. 유저 강퇴하기(방장 권한)
    // 함수 이름 뭐지을지 모르겠어서 나중에 함수 적겠음 ㅋㅋ

    // 6. 방장 위임하기(방장 권한)

    // 7. 리더 위임하기(리더 권한)

    // 초기 자동 연결
    useEffect(() => {
        if (!autoConnect) return;

        return () => {
            if (stompClient.current?.active) {
                stompClient.current.deactivate();
            }
        };
    }, [autoConnect, connect]);

    return {
        isConnected, isLoading, error, stompClient,
        connect, updateUserStatus, changeUserTeam, userExitRoom
    };
};


