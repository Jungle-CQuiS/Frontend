import { useState } from "react";

export const useRoomUerId = () => {
    const [roomUserId , setRoomUserId ] = useState("");

    const initRoomUserID = (roomUid: string) => {
        setRoomUserId(roomUid);
    };


    return {
        roomUserId,
        initRoomUserID
    };
};