export const SOCKET_DESTINATIONS = {
    QUIZ_MULTI: {
        ROOMS: {
            // 구독할 토픽
            SUBSCRIBE: {
                ROOM_INFO: (roomId: string) => `/topic/rooms/${roomId}/info`,
                USER_JOIN: `user/queue/rooms/join`,
                READY_STATUS: (roomId: string) => `/topic/rooms/${roomId}/status`,

                // 팀별 이벤트 관련 구독 ✅
                TEAM_BLUE : (roomId : string )=> `/topic/game/${roomId}/blue`,
                TEAM_RED : (roomId : string )=> `/topic/game/${roomId}/red`,
                
                // 게임 전체 진행 관련 구독
                GAME_STATE : (roomId : string )=> `/topic/game/${roomId}/general`,

                // 사용자 입력 실시간 공유 ✅
                LEADER_SELECT_QUIZE: (roomId:string) =>  `/topic/game/${roomId}/select/option`,// 공격팀 리더의 퀴즈 주제 선택 공유
                // 리더 최종 선택 공우 ✅
                LEADER_FINAL_SELECT : (roomId:string) => `/topic/game/${roomId}/select/quiz`,

                // 채점 결과 구독 ✅
                GRADING_RESULT : (roomId:string) => `/topic/game/${roomId}/grading`,
                
                // HP 업데이트 구독
                UPDATE_HP :  (roomId:string) => `/topic/game/${roomId}/general`
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
                YIELDLEADER: `/app/rooms/yield-host`,

                QUIZE_SELECT: `/app/game/quiz-select`, //공격팀 리더가 문제를 선택할 때 사용
                SUBMIT_ANSWER: `/app/game/personal-submit`, // 수비팀 사람들이 각자 답안을 제출할 떄 사용
                SELECT_FINAL_ANSWER: `/app/game/team-submit` // 수비팀에서 최종 제출할 답안을 리더가 선택할 때 사용.
            }
        }
    }
} as const;