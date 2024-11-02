import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { GameStatus,GameReadyEvents } from '../../types/game';

interface GameStateContextType {
    gameState: GameStatus;
    isAllReady: boolean;
    roomUserId : string;
    handleReadyRoomEvent: (event: string ) => void;
    setRoomUserID: (id: string) => void;
    roomUserIdError: string | null;
}

const GameStateContext = createContext<GameStateContextType | null>(null);

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
    const [isAllReady, setIsAllReady] = useState(false);
    const [gameState, setGameState] = useState<GameStatus>(GameStatus.ENTER);
    const [roomUserId, setRoomUserID] = useState<string>("none");
    const [roomUserIdError, setroomUserIdError] = useState<string | null>(null);

    const setRoomUserIDWithState = useCallback((id: string) => {
        setroomUserIdError(null);
        setRoomUserID(id);
    }, []);

    const handleReadyRoomEvent = useCallback((event: string) => {
        switch(event) {
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
            roomUserId: roomUserId,
            handleReadyRoomEvent,
            setRoomUserID: setRoomUserIDWithState,
            roomUserIdError
        }}>
            {children}
        </GameStateContext.Provider>
    );
};

export {GameStateContext}