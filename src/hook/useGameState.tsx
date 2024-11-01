import { useState , useRef} from "react";
import { GameStatus ,GameReadyEvents  } from "../types/game";


export const UseGameState = () => {
    const [isAllReady, setisAllReady ] = useState(false); // 모두 준비가 됐는지 불값.
    const [countdown, setcountdown ] = useState(5); // 카운트 다운 시간 number
    const [gameState, setGameState] = useState<GameStatus>(GameStatus.READY);

    const handleReadyRoomEvent = (event : string, time : number = 0) => {
        
        switch(event){
            case GameReadyEvents.ALL_READY:
                setcountdown(time);
                setisAllReady(true);
                setGameState(GameStatus.READY);
                break;
            case GameReadyEvents.STOP_READY:
                setcountdown(time);
                setisAllReady(false);
                setGameState(GameStatus.READY);
                break;
            case GameReadyEvents.GAME_START:
                // Local Storage에 게임 정보 저장
                // 그래야지 재 접속했을 때 다시 들어올 수 있음.
                setGameState(GameStatus.START);
                // 나중에 지울수도 있음.
                localStorage.setItem("GameState", JSON.stringify(`${GameStatus.START}`));
                break;
        }
    }


    return {
        gameState,
        isAllReady,
        countdown,
        handleReadyRoomEvent
    };
};