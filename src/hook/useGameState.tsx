import { useState } from "react";
import { GameReadyEvents  } from "../types/game";


export const UseGameState = () => {
    const [isAllReady, setisAllReady ] = useState(false); // 모두 준비가 됐는지 불값.
    const [isGameStart, setisGameStart ] = useState(false); // 게임 시작 boolean
    const [countdown, setcountdown ] = useState(5); // 카운트 다운 시간 number


    const handleReadyRoomEvent = (event : string, time : number = 0) => {
        switch(event){
            case GameReadyEvents.ALL_READY:
                setcountdown(time);
                setisAllReady(true);
                break;
            case GameReadyEvents.STOP_READY:
                setcountdown(time);
                setisAllReady(false);
                break;
            case GameReadyEvents.GAME_START:
                setisGameStart(true);
                break;
        }
    }


    return {
        isAllReady,
        isGameStart,
        countdown,
        handleReadyRoomEvent
    };
};