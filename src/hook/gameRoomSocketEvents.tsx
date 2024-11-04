import React from 'react';
import { Client } from '@stomp/stompjs';
import { TeamUser } from '../types/teamuser';
import { SOCKET_DESTINATIONS } from '../config/websocket/constants';
import { subscribe } from 'diagnostics_channel';
import { GamePlayEvents } from '../types/game';
import { GameUser } from '../contexts/GameUserContext/GameUserContext';
export const gameRoomSocketEvents = {
    // SUBSCRIBE -----------------------------------------------------------------
    // blueteam 구독
    subscribeBlueTeamInfo: (client: Client, roomId: string) => {
        try {
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.ROOM_INFO(roomId),// FIXME: API 수정해야함.
                (message) => {
                    try {
                        // TODO: 
                    } catch (err) {

                    }
                }
            );
        } catch (err) {

        }

    },
    // redteam 구독
    subscribeReadTeamInfo: (client: Client, roomId: string) => {
        try {
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.ROOM_INFO(roomId),// FIXME: API 수정해야함.
                (message) => {
                    try {
                        // TODO: 
                    } catch (err) {

                    }
                }
            );
        } catch (err) {

        }

    },

    // 방 상태 구독
    subscribeGameRoomState: (client: Client, roomId: string) => {
        try {
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.ROOM_INFO(roomId),// FIXME: API 수정해야함.
                (message) => {
                    try {
                        // TODO: 
                    } catch (err) {

                    }
                }
            );
        } catch (err) {

        }

    },

    // 방장의 선택 구독 ✅
    subscribeLeaderSelect: (client: Client, roomId: string, team: string, initLeaderSelectQuizeId: (leaderSelect: number) => void) => {
        try {
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.LEADER_SELECT_QUIZE(roomId, team),
                (message) => {
                    console.log('<SUB:Leader Select/ Received message:', message);
                    try {
                        const response = JSON.parse(message.body);
                        
                        const eventType = response.responseStatus;

                        switch (eventType) {
                            case GamePlayEvents.QUIZ_SELECT: // 문제 선택(공격팀 리더)
                                console.log(response.number);
                                initLeaderSelectQuizeId(response.number);
                                break;
                            // FIXME: 다른 case가 없다면 조건문 없애도 됩니다.
                            default:
                                break;
                        }

                    } catch (err) {
                        console.error('Error processing message:', err);
                    }
                }
            );
            console.log('Subscription successful:', subscription);
        } catch (err) {
            console.error('Subscription error:', err);
        }

    },



    // HP 업데이트
    subscribeTeamHpUpdate: (client: Client, roomId: string) => {
        try {
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.ROOM_INFO(roomId),// FIXME: API 수정해야함.
                (message) => {
                    try {
                        // TODO: 
                    } catch (err) {

                    }
                }
            );
        } catch (err) {

        }

    },



    // 게임 종료 -> roomState랑 합쳐도 될 것 같은디!

    // Publish  -----------------------------------------------------------------------
    // 문제 선택( 공격팀 리더 )
    selectQuiz: async (
        stompClient: React.RefObject<Client>,
        roomId: string,
        selected: number
    ) => {
        try {
            if (!stompClient.current?.active) {
                console.error('STOMP connection is not active');
                return;
            }

            // 1. PACKING MESSAGE
            const destination = SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.QUIZE_SELECT;// FIXME: API 수정해야함.
            const message = {
                responseStatus: "QUIZ_SELECT",
                number: selected,
                roomId: roomId
            }

            // 2. PUBLISH
            stompClient.current.publish({
                destination : destination,
                body: JSON.stringify(message)

            });

        } catch (error) {
            console.error('Send Leader Select error:', error);
            throw error;
        }
    },

    // 답안 제출( 수비팀 리더 )
    submitQuizAnswer: (client: Client, roomId: string) => {
        if (!client.active) {
            throw new Error('No active connection');
        }

        const destination = SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.JOIN;// FIXME: API 수정해야함.

        const message = {
            roomUserId: `제출한 유저의 id(int)`,
            answer: `유저가 입력한 정답(string)`,
            roomId: `현재 방의 id(int)`
        };

        client.publish({
            destination,
            body: JSON.stringify(message)
        });

    },

    // 최종 답은 선택( 수비팀 리더 )
    selectFinalAnswer: (client: Client, roomId: string) => {
        if (!client.active) {
            throw new Error('No active connection');
        }

        const destination = SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.JOIN;// FIXME: API 수정해야함.

        const message = {
            responseStatus: "ANSWER_SELECT",
            number: `선택한 답안의 인덱스 in 리스트(int, 0 ~)`,
            roomId: `현재 방의 id(int)`
        };

        client.publish({
            destination,
            body: JSON.stringify(message)
        });

    }
}