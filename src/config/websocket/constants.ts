export const SOCKET_DESTINATIONS = {
    QUIZ_MULTI: {
        ROOMS: {
            // 구독할 토픽
            SUBSCRIBE: {
                ROOM_INFO: (roomId: string) => `/topic/rooms/${roomId}/info`,
                USER_JOIN: `user/queue/rooms/join`,
                ALL_READY: (roomId: string) => `/topic/rooms/${roomId}/status`
            },

            REQUEST: {
                ROOM_INFO: (roomId: string) => `/app/rooms/${roomId}/info`,
            },
            
            // 서버에 보낼 메시지 (액션)
            SEND: {
                READY: `/app/rooms/ready`,
                EXIT: `/app/rooms/exit`,
                JOIN: `/app/rooms/join`,
                TEAMSWITCH: `/app/rooms/team-switch`,
                KICK: `/app/rooms/kick`,
                YIELDHOST: `/app/rooms/yield-host`,
                YIELDLEADER: `/app/rooms/yield-host`
            }
        }
    }
} as const;