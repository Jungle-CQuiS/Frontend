import { useState, useRef } from "react";
import { GameReadyEvents } from "../types/game";


export const UseGameState = () => {
    const GameState = useRef<GameReadyEvents | null>(null); //게임의 전체적인 상태값 ref로 저장
    const [isAllReady, setisAllReady ] = useState(false); // 모두 준비가 됐는지 불값.
    const [isGameStart, setisGameStart ] = useState(false); // 게임 시작 boolean
    const [countdown, setcountdown ] = useState(5); // 게임 시작 boolean


    const handleReadyRoomEvent = (event : string, time : number) => {
        // todo : 서버에서 받은 이벤트 타입에 따라 처리.
        setcountdown(time);
        switch(event){
            case GameReadyEvents.ALLREADY:
                break;
            case GameReadyEvents.STOPREADY:
                break;
            case GameReadyEvents.GAME_START:
                break;
        }
    }


    return {
        GameState,
        isAllReady,
        isGameStart,
        countdown,
        handleReadyRoomEvent
    };
};