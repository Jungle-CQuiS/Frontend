import { Client } from '@stomp/stompjs';
import { useState, useEffect, useRef, useCallback } from "react";
import { TeamUser } from '../modules/room/components/TeamUser';
import { SOCKET_DESTINATIONS } from '../config/websocket/constants';

export const UseWebSocket = (roomId: string) => {
    const stompClient = useRef<Client | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const [teamOneUsers, setTeamOneUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));
    const [teamTwoUsers, setTeamTwoUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));

    // STOMP 클라이언트 설정 함수
    const setupStompClient = useCallback(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:3000/ws',
            connectHeaders: {
                roomId: 'rommId',
                userId: 'userId',
            },
            onConnect: () => { // Subscribe
                console.log('Connected to WebSocket');
                setIsLoading(false);
                subscribeToRoom(client); //구독 함수 구현( 연결되면 실행된다 )
                requestInitialRoomInfo(client);
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
            },
            onStompError: (error) => {
                console.error('WebSocket Error:', error);
                setError('Failed to connect to the game server');
                setIsLoading(false);
            },

            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        return client;
    }, []);

    // 방 구독 함수
    const subscribeToRoom = (client: Client) => {
        client.subscribe(SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.ROOM_INFO(roomId), (message) => {
            try {
                const response = JSON.parse(message.body);
                updateTeams(response.users);
            } catch (err) {
                console.error('Error processing message:', err);
            }
        });
    };

    // 0. 방 입장하기
    const enterRoom = () => {
        if (!stompClient.current?.active) {
            console.error('STOMP connection is not active');
            return;
        }
        stompClient.current.publish({
            destination: SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.JOIN,
            body : JSON.stringify({
                "uuid": "admin2",
                "roomId": roomId,
            })
        })
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
        if (!stompClient.current?.active) return;

        stompClient.current.publish({
            destination: SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.READY(roomId), 
            body: JSON.stringify({
                roomId,
                userId,
                status
            })
        });
    };

    // 3. 팀 바꾸기
    const changeUserTeam = (userId: string, team: 'red' | 'blue') => {
        if (!stompClient.current?.active) return;

        stompClient.current.publish({
            destination: SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.TEAMSWITCH(roomId), 
            body: JSON.stringify({
                roomId,
                userId,
                team
            })
        });
    }
    // 4. 방 나가기
    const userExitRoom = (userId : string, roomId: string) => {
        if (!stompClient.current?.active) return;

        stompClient.current.publish({
            destination: SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.EXIT(roomId), 
            body: JSON.stringify({
                roomId,
                userId,
            })
        });
    }

    // 5. 유저 강퇴하기(방장 권한)
    // 함수 이름 뭐지을지 모르겠어서 나중에 함수 적겠음 ㅋㅋ

    // 6. 방장 위임하기(방장 권한)

    // 7. 리더 위임하기(리더 권한)

    useEffect(() => {
        const client = setupStompClient(); // client 생성
        client.activate(); // client 활성화.
        stompClient.current = client;

        return () => { // clean up
            if (client.active) {
                client.deactivate();
            }
        };
    }, [roomId, setupStompClient]); //다른 방으로 이동할 때 실행!

    return { isLoading, error, stompClient, teamOneUsers, teamTwoUsers, 
        enterRoom, updateUserStatus, changeUserTeam ,userExitRoom};
};


