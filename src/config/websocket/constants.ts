export const SOCKET_DESTINATIONS = {
    QUIZ_MULTI: {
        ROOMS: {
            // 구독할 토픽
            SUBSCRIBE: {
                ROOM_INFO: (roomId: string) => `/topic/rooms/${roomId}`,
                USER_ENTER: (roomId: string) => `/topic/rooms/${roomId}/enter`
            },

            REQUEST: {
                ROOM_INFO: (roomId: string) => `/app/rooms/${roomId}/info`,
            },
            
            // 서버에 보낼 메시지 (액션)
            SEND: {
                READY: (roomId: string) => `/app/rooms/${roomId}/ready`,
                EXIT: (roomId: string) => `/app/rooms/${roomId}/exit`,
                JOIN: `/app/rooms/join`,
                TEAMSWITCH: (roomId: string) => `/app/rooms/${roomId}/team-switch`
            }
        }
    }
} as const;