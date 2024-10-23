import { Client } from '@stomp/stompjs';
import { useState, useEffect, useRef, useCallback } from "react";
import { TeamUser } from '../modules/room/components/TeamUser';


export const useWebSocket = (roomId: string) => {
    const stompClient = useRef<Client | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    

    const [teamOneUsers, setTeamOneUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));
    const [teamTwoUsers, setTeamTwoUsers] = useState<(TeamUser | null)[]>(Array(5).fill(null));
   
    // STOMP 클라이언트 설정 함수
    const setupStompClient = useCallback(() => {
        const client = new Client({
            brokerURL: 'ws://cquis.net/ws',
            onConnect: () => {
                console.log('Connected to WebSocket');
                setIsLoading(false);
                subscribeToRoom(client);
                requestInitialRoomInfo(client);
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
            },
            onStompError: (error) => {
                console.error('WebSocket Error:', error);
                setError('Failed to connect to the game server');
                setIsLoading(false);
            }
        });

        return client;
    }, []);

    // 방 구독 함수
    const subscribeToRoom = (client: Client) => {
        client.subscribe(`/quiz/multi/rooms/${roomId}`, (message) => {
            try {
                const response = JSON.parse(message.body);
                updateTeams(response.users);
            } catch (err) {
                console.error('Error processing message:', err);
            }
        });
    };

    // 초기 방 정보 요청 함수
    const requestInitialRoomInfo = (client: Client) => {
        client.publish({
            destination: '/quiz/multi/rooms/join',
            body: JSON.stringify({ roomId })
        });
    };

    // 팀 데이터 업데이트 함수
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

    useEffect(() => {
        const client = setupStompClient();
        client.activate();
        stompClient.current = client;

        return () => {
            if (client.active) {
                client.deactivate();
            }
        };
    }, [roomId, setupStompClient]);

    return { isLoading, error, stompClient ,teamOneUsers,teamTwoUsers};
};


