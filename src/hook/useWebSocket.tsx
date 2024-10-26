import { Client } from '@stomp/stompjs';
import { useState, useEffect, useRef, useCallback } from "react";
import { TeamUser } from '../modules/room/components/TeamUser';
import { SOCKET_DESTINATIONS } from '../config/websocket/constants';

interface RoomMessage {
    roomUserId: string;
    roomId: string;
}

interface TeamChangeMessage extends RoomMessage {
    team: 'red' | 'blue';
}

interface StatusMessage extends RoomMessage {
    status: 'READY' | 'NOT_READY';
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


    const [teamOneUsers, setTeamOneUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));
    const [teamTwoUsers, setTeamTwoUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));

 
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
        subscribeToRoom(client);
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

    // 입장 메시지 전송 함수 - 유저가 입장 함을 알림
    const sendJoinMessage = () => {
        if (!stompClient.current?.active) {
            throw new Error('No active connection');
        }

        const destination = SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.JOIN;
        const message = {
            uuid: "92a46f49-34fa-4c37-bf3f-09389468042a",
            roomId: roomId,
        };

        console.log('Sending message:', {
            destination,
            message
        });

        stompClient.current.publish({
            destination,
            body: JSON.stringify(message)
        });
    };

    // 방 구독 함수 -> 방 업데이트 구독중!
    const subscribeToRoom = (client: Client) => {
        try {
            console.log('Attempting to subscribe to room:', roomId);
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.ROOM_INFO(roomId),
                (message) => {
                    console.log('Received message:', message);  // 메시지 수신 로그
                    try {
                        const response = JSON.parse(message.body);
                        updateTeams(response.data.usersData);
                    } catch (err) {
                        console.error('Error processing message:', err);
                        setError('Failed to process room update');
                    }
                }
            );
            console.log('Subscription successful:', subscription);  // 구독 성공 로그
        } catch (err) {
            console.error('Subscription error:', err);
            setError('Failed to subscribe room update');
        }
    };

    // 소켓 이벤트 함수
    // 0. 방 입장하기
    const enterRoomSocketEvent = async () => {
        try {
            console.log('Starting room entry process');

            // 연결 상태 체크 - 
            if (!stompClient.current?.active || !isConnected) {
                console.log('No active connection, connecting...');
                await connect();
            }

            console.log('Connection status:', {
                clientExists: !!stompClient.current,
                isActive: stompClient.current?.active,
                isConnected
            });

            // 입장 메시지 전송
            console.log('Sending join message');
            sendJoinMessage();
            console.log('Join message sent successfully');

        } catch (error) {
            console.error('Enter room error:', error);
            throw error;
        }
    };

    // 1. 방의 정보 가져오기
    const requestInitialRoomInfo = (client: Client) => {
        client.publish({
            destination: SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.REQUEST.ROOM_INFO(roomId),
            body: JSON.stringify({ roomId }) //body에 꼭 보내야하낭? 딱히 필요 없음 지우기.
        });
    };

    // 팀 데이터 업데이트 함수 -> 따로 뺴기
    const updateTeams = (users: TeamUser[]) => {
        const blueTeamUsers = users.filter(user => user.team === 'blue');
        const redTeamUsers = users.filter(user => user.team === 'red');

        const filledBlueTeam = [
            ...blueTeamUsers,
            ...Array(5 - blueTeamUsers.length).fill(null)
        ].slice(0, 5);

        const filledRedTeam = [
            ...redTeamUsers,
            ...Array(5 - redTeamUsers.length).fill(null)
        ].slice(0, 5);

        setTeamOneUsers(filledBlueTeam);
        setTeamTwoUsers(filledRedTeam);
    };

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
        enterRoomSocketEvent();

        return () => {
            if (stompClient.current?.active) {
                stompClient.current.deactivate();
            }
        };
    }, [autoConnect, connect]);

    return {
        isConnected, isLoading, error, stompClient, teamOneUsers, teamTwoUsers,
        enterRoom: enterRoomSocketEvent, updateUserStatus, changeUserTeam, userExitRoom
    };
};


