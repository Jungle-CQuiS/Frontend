import { EndpointCreator } from '../enpoint-creator';
import { SERVICES } from '../constants';

const quizMultiEndpoints = new EndpointCreator(SERVICES.QUIZ.MULTI);

export const QUIZ_MULTI_ENDPOINTS = {
    ROOMS: {
        LIST: quizMultiEndpoints.create('/rooms'), //GET
        PWCHECK: quizMultiEndpoints.create('/rooms/check'), //POST
        JOIN: (roomId: number) => `/room/${ roomId }`, //GET
        CREATE: quizMultiEndpoints.create('/rooms/create') //POST
    },
    ROOM: {
        CREATE: quizMultiEndpoints.create('/rooms'), //POST
        JOIN: quizMultiEndpoints.create('/rooms/join'), //POST
        TEAM_CHANGE: quizMultiEndpoints.create('/team-switch'), //POST
        READY: quizMultiEndpoints.create('/ready'), //POST
        KICK: quizMultiEndpoints.create('/ready'), //POST
        EXIT: quizMultiEndpoints.create('/exit') //POST
    },
    YEILD: {
        HOST: quizMultiEndpoints.create('/yield-host'), //POST
        LEADER: quizMultiEndpoints.create('/yield-leader'), //POST
    },
    GAME: {
        HONOR: quizMultiEndpoints.create('/honor'), //POST
    }
} as const;