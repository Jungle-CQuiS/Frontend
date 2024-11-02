// StompContext.tsx
import { Client } from '@stomp/stompjs';
import { createContext, useContext,useCallback, useState,useRef, ReactNode } from 'react';
import { CONSTANTS } from './types';

interface StompContextType {
    stompClient: React.MutableRefObject<Client | null>;
    isConnected: boolean;
    isLoading: boolean;
    error: string | null;
    connect: () => Promise<void>;
}

// Context 생성 (null 체크를 위한 초기값)
const StompContext = createContext<StompContextType | null>(null);

// Provider 컴포넌트
interface StompProviderProps {
    children: ReactNode;
}

export const StompProvider = ({ children }: StompProviderProps) => {
    const stompClient = useRef<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // 기본 STOMP 클라이언트 설정
    const setupStompClient = useCallback(() => {
        const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
        const accessToken = localStorage.getItem("AccessToken");
        const userUuid = localStorage.getItem("uuid") || "";
        // console.log(userUuid);
        return new Client({           
            brokerURL: `${wsProtocol}://dev.cquis.net/ws`,
            connectHeaders: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                uuid: userUuid,
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
    }, []);

    const handleConnect = useCallback((client: Client) => {
        console.log('Connected to WebSocket');
        setIsLoading(false);
        setIsConnected(true);

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



    const value = {
        stompClient,
        isConnected,
        isLoading,
        error,
        connect
    };



    return (
        <StompContext.Provider value={value}>
            {children}
        </StompContext.Provider>
    );
};


export { StompContext };