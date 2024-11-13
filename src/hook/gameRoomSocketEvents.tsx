import React from 'react';
import { Client } from '@stomp/stompjs';
import { SOCKET_DESTINATIONS } from '../config/websocket/constants';
import { GamePlayEvents } from '../types/game';
import { TeamType } from '../types/teamuser';
import { Quiz } from '../types/quiz';

export const gameRoomSocketEvents = {
    // SUBSCRIBE -----------------------------------------------------------------
    // blueteam 구독 ✅
    subscribeBlueTeamInfo: (
        client: Client,
        roomId: string,
        onDefenseTeamAllSubmitted: () => void,
        handleGameEndEvent: (winner: TeamType) => void,
        handleReceivedEmoji: (emojiType: string, roomUserId: number, teamId : number) => void
    ) => {
        try {
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.TEAM_BLUE(roomId),
                (message) => {
                    try {
                        const response = JSON.parse(message.body);

                        const eventType = response.responseStatus;

                        switch (eventType) {
                            case GamePlayEvents.ALL_SUBMIT: // 문제 선택(공격팀 리더)
                                console.log(eventType);
                                onDefenseTeamAllSubmitted();
                                break;
                            case GamePlayEvents.GAME_END:
                                console.log('서버에서 게임 종료 메세지 수신');
                                handleGameEndEvent(response.teamColor);
                                break;
                            case GamePlayEvents.EMOJI_SELECT:
                                handleReceivedEmoji(
                                    response.emojiType,
                                    response.roomUserId,
                                    1
                                );
                                break;
                            default:
                                break;
                        }

                    } catch (err) {

                    }
                }
            );
            console.log('Subscription successful:', subscription);
        } catch (err) {
            console.error('Subscription error:', err);
        }

    },
    // redteam 구독 ✅
    subscribeRedTeamInfo: (
        client: Client,
        roomId: string,
        onDefenseTeamAllSubmitted: () => void,
        handleGameEndEvent: (winner: TeamType) => void,
        handleReceivedEmoji: (emojiType: string, roomUserId: number,teamId : number) => void
    ) => {
        try {
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.TEAM_RED(roomId),
                (message) => {
                    try {
                        const response = JSON.parse(message.body);

                        const eventType = response.responseStatus;

                        switch (eventType) {
                            case GamePlayEvents.ALL_SUBMIT: // 문제 선택(공격팀 리더)
                                console.log(eventType);
                                onDefenseTeamAllSubmitted();
                                break;
                            case GamePlayEvents.GAME_END:
                                console.log('서버에서 게임 종료 메세지 수신');
                                handleGameEndEvent(response.teamColor);
                                break;
                            case GamePlayEvents.EMOJI_SELECT:
                                handleReceivedEmoji(
                                    response.emojiType,
                                    response.roomUserId,
                                    2
                                );
                                break;
                            default:
                                break;
                        }

                    } catch (err) {

                    }
                }
            );
            console.log('Subscription successful:', subscription);
        } catch (err) {
            console.error('Subscription error:', err);
        }

    },

    // 리더의 선택 구독 ✅
    subscribeLeaderSelect: (client: Client, roomId: string, initLeaderSelectQuizeId: (leaderSelect: number) => void) => {
        try {
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.LEADER_SELECT_QUIZE(roomId),
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
                            case GamePlayEvents.DEF_QUIZ_SELECT:
                                console.log(response.number);
                                initLeaderSelectQuizeId(response.number);
                                break;
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

    // 리더 최종 선택 구독 ✅
    subscribeLeaderFinalSelect: (client: Client, roomId: string, handleCompleteSelection: (quiz: Quiz) => void) => {
        try {
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.LEADER_FINAL_SELECT(roomId),
                (message) => {
                    console.log('<SUB:Leader Final Select/ Received message:', message);
                    try {
                        const response = JSON.parse(message.body);

                        const quiz: Quiz = {
                            quizId: response.quizId,
                            name: response.name,
                            categoryType: response.categoryType,
                            // 객관식일 경우 choice 필드 추가
                            ...(response.type === '객관식' && {
                                choice1: response.choice1,
                                choice2: response.choice2,
                                choice3: response.choice3,
                                choice4: response.choice4
                            }),
                            // 필수 필드이지만 서버에서 오지 않는 필드들에 대한 기본값 설정
                            answer: 0, // 기본값 설정 필요
                            quizName: response.name, // name과 동일하게 설정
                            // 주관식일 경우 빈 문자열로 초기화
                            koreanAnswer: response.type === '주관식' ? '' : undefined,
                            englishAnswer: response.type === '주관식' ? '' : undefined
                        };

                        console.log('Converted Quiz object:', quiz);
                        handleCompleteSelection(quiz);
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

    // 정답 채점 구독 ✅
    subscribeGradingQuizAnswer: (
        client: Client,
        roomId: string,
        handleDefenseAnswerResults: (isCorrect: boolean) => void,
        saveGradingResponse: (event: GamePlayEvents, team: TeamType, health: number) => void
    ) => {
        try {
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.GRADING_RESULT(roomId),
                (message) => {
                    console.log('<SUB:Leader Select/ Received message:', message);
                    try {
                        const response = JSON.parse(message.body);

                        // 문제의 정답: response.answer 
                        handleDefenseAnswerResults(response.isCorrect); // 정답 여부 true false
                        saveGradingResponse(
                            response.responseStatus, // 게임 이벤트
                            response.nextOffenseTeam, // 다음 공격 팀
                            response.teamHp); // 수비팀 HP


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

    // 게임 종료 -> roomState랑 합쳐도 될 것 같은디!

    // Publish  -----------------------------------------------------------------------
    // 문제 선택( 공격팀 리더 - 실시간 공유) ✅
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
            const destination = SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.QUIZE_SELECT;
            const message = {
                responseStatus: "QUIZ_SELECT",
                number: selected,
                roomId: roomId
            }

            // 2. PUBLISH
            stompClient.current.publish({
                destination: destination,
                body: JSON.stringify(message)

            });

        } catch (error) {
            console.error('Send Leader Select error:', error);
            throw error;
        }
    },

    // 정답 선택 ( 수비팀 리더 - 실시간 공유)
    defSelectQuiz: async (
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
            const destination = SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.SELECT_FINAL_ANSWER;
            const message = {
                responseStatus: "DEF_QUIZ_SELECT",
                number: selected,
                roomId: roomId
            }

            // 2. PUBLISH
            stompClient.current.publish({
                destination: destination,
                body: JSON.stringify(message)

            });

        } catch (error) {
            console.error('Send Leader Select error:', error);
            throw error;
        }
    },

    // 문제 선택( 공격팀 리더 - 최종 선택) ✅
    selectQuizeLeaderFinal: async (
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
            const destination = SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.QUIZE_SELECT;
            const message = {
                responseStatus: "FINAL_SELECT",
                number: selected,
                roomId: roomId
            }

            // 2. PUBLISH
            stompClient.current.publish({
                destination: destination,
                body: JSON.stringify(message)

            });

        } catch (error) {
            console.error('Send Leader Final Select error:', error);
            throw error;
        }
    },


    // 개인 답안 제출( 수비팀 ) ✅
    submitQuizAnswer: (
        stompClient: React.RefObject<Client>,
        roomId: string,
        roomUserId: string,
        answer: string,
        reason: string
    ) => {
        if (!stompClient.current?.active) {
            throw new Error('No active connection');
        }
        const destination = SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.SUBMIT_ANSWER;

        const message = {
            roomUserId: roomUserId,
            answer: answer,
            reason: reason,
            roomId: roomId
        };

        stompClient.current.publish({
            destination,
            body: JSON.stringify(message)
        });

    },

    // 최종 답은 선택( 수비팀 리더 ) ✅
    selectFinalAnswer: (
        stompClient: React.RefObject<Client>,
        roomId: string,
        answer: number | null
    ) => {
        if (!stompClient.current) {
            throw new Error('No active connection');
        }

        const destination = SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.SELECT_FINAL_ANSWER;

        const message = {
            responseStatus: "ANSWER_SELECT",
            number: Number(answer),    // 또는 answer?.toString()
            roomId: Number(roomId)     // 또는 roomId.toString()
        };

        console.log(message);
        const userAccessToken = localStorage.getItem("AccessToken");
        stompClient.current.publish({
            destination: destination,
            headers: {
                'Authorization': `Bearer ${userAccessToken}`,  // 토큰 추가
                "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });

    },


    // 유저 이모지 입력
    sendUserEmoji: (
        stompClient: React.RefObject<Client>,
        teamColor: string,
        emojiType: string,
        roomId: string,
        roomUserId: string,
    ) => {
        if (!stompClient.current?.active) {
            throw new Error('No active connection');
        }
        const destination = SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.SEND_USER_EMOJI;

        const message = {
            teamColor: teamColor,
            emojiType: emojiType,
            roomUserId: roomUserId,
            roomId: roomId
        };

        stompClient.current.publish({
            destination,
            body: JSON.stringify(message)
        });

    },

}