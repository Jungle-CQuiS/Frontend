export const API_PREFIX = '/api';

export const SERVICES = {
    QUIZ: {
        MULTI: '/quiz/multi',
        SINGLE: '/quiz/single',
        GAME: {
            ATTACK:'/multi/attack',
            DEFEND:{
                DEFEND: '/multi/defend',
                SOLVING:'/multi/defend/solving',
                SELEECT:'/multi/defend/select',
            },
            RESULT: '/multi/result' 
            
            
        }
    },
    MULTI: '/multi',
    MAIN: '/main',
    AUTH: '/auth'
} as const;