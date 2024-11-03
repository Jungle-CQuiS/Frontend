import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { GameStatus,GameReadyEvents } from '../../types/game';
import { TeamUser } from '../../types/teamuser';

interface GameStateContextType {
    // 게임방 정보
    gameState: GameStatus;
    isAllReady: boolean;

    // 유저 정보
    _roomId : string;
    roomUserId : string;
    roomUserIdError: string | null;

    // 전역 메소드
    handleReadyRoomEvent: (event: string ) => void;
    setRoomUserIdWithState: (id: string) => void;
    setRoomId: (roomId : string) => void;
}

const GameStateContext = createContext<GameStateContextType | null>(null);

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
    const [isAllReady, setIsAllReady] = useState(false);
    const [gameState, setGameState] = useState<GameStatus>(GameStatus.ENTER);
    const [roomUserId, setRoomUserID] = useState<string>("none");
    const [roomUserIdError, setroomUserIdError] = useState<string | null>(null);
    const [_roomId , set_RoomId] = useState<string>("");

    const setRoomUserIdWithState = useCallback((id: string) => {
        setroomUserIdError(null);
        setRoomUserID(id);
    }, []);

    const setRoomId = useCallback((roomid: string) => {
        set_RoomId(roomid);
    }, []);

    const handleReadyRoomEvent = useCallback((event: string) => {
        switch(event) {
            case GameReadyEvents.ENTER:
                setGameState(GameStatus.LOADING);
                break;
            case GameReadyEvents.LOADING:
                setGameState(GameStatus.WAITING);
                break;
            case GameReadyEvents.ALL_READY:
                setIsAllReady(true);
                setGameState(GameStatus.READY);
                break;
            case GameReadyEvents.STOP_READY:
                setIsAllReady(false);
                setGameState(GameStatus.WAITING);
                break;
            case GameReadyEvents.GAME_START:
                setGameState(GameStatus.START);
                localStorage.setItem("GameState", JSON.stringify(GameStatus.START));// FIXME: 나중에 지우기. Context로 대체함
                break;
        }
    }, []);

    return (
        <GameStateContext.Provider value={{
            gameState,
            isAllReady,
            roomUserId,
            _roomId,
            handleReadyRoomEvent,
            setRoomUserIdWithState,
            setRoomId,
            roomUserIdError
        }}>
            {children}
        </GameStateContext.Provider>
    );
};

export {GameStateContext}