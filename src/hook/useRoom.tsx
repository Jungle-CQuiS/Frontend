import { Client } from '@stomp/stompjs';
import { useEffect ,useCallback} from 'react';
import { socketEvents } from './socketEvent';
import { useTeamState } from './useTeamState';
import { UseWebSocket } from './useWebSocket';


export const useRoom = (roomId: string) => {
    const { teamOneUsers, teamTwoUsers, updateTeams } = useTeamState(roomId);
    const { stompClient, isConnected, connect } = UseWebSocket(roomId, false);

    // 구독 로직
    const setupSubscriptions = useCallback((client: Client) => {
        socketEvents.subscribeToRoom(client, roomId, updateTeams);
    }, [roomId, updateTeams]);

    // 입장 로직
    const enterRoom = useCallback(async () => {
        try {
            // 연결 확인 및 구독 설정
            if (!stompClient.current?.active || !isConnected) {
                await connect();
                // 연결 성공 후 구독 설정
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

    useEffect(() => {
        enterRoom();

        return () => {
            if (stompClient.current?.active) {
                stompClient.current.deactivate();
            }
        };
    }, []);

    return {
        teamOneUsers,
        teamTwoUsers,
    };
};