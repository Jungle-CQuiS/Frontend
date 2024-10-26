import { Client } from '@stomp/stompjs';
import { useState, useEffect, useRef, useCallback } from "react";
import { TeamUser } from '../modules/room/components/TeamUser';
import { SOCKET_DESTINATIONS } from '../config/websocket/constants';


export const socketEvents = {
    // 방 정보 구독 함수
    subscribeToRoom: (client: Client, roomId: string, updateTeams: (users: TeamUser[]) => void) => {
        try {
            console.log('Attempting to subscribe to room:', roomId);
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.ROOM_INFO(roomId),
                (message) => {
                    console.log('Received message:', message);
                    try {
                        const response = JSON.parse(message.body);
                        
                        interface ServerUser {
                            roomUserId: string;
                            username: string;
                            honorCount: number;
                            role: string;
                            team: string;
                            isLeader: boolean;
                            isReady: boolean;
                        }

                        console.log(response);

                        const teamUsers: TeamUser[] = response.usersData.map((user:ServerUser) => ({
                            id: user.roomUserId ,
                            name: user.username,
                            honor: user.honorCount,
                            role: user.role,
                            team: user.team, 
                            isLeader: user.isLeader ? 'leader' : 'member', // bool?
                            state: user.isReady ? 'ready' : 'notready'// bool?
                        }));

                        updateTeams(teamUsers);
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

    // 유저 방 입장 알림 함수
    sendJoinMessage: (client: Client, roomId: string) => {
        if (!client.active) {
            throw new Error('No active connection');
        }

        const destination = SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.JOIN;
        const message = {
            uuid: "341eb9d5-b8a9-4f35-9489-b13010ea01c8", // 수정 요!
            roomId: roomId,
        };

        console.log('Sending message:', {
            destination,
            message
        });

        client.publish({
            destination,
            body: JSON.stringify(message)
        });
    },

    // 유저 방 입장 알림 함수
    enterRoom: async (
        stompClient: React.RefObject<Client>,
        roomId: string,
    ) => {
        try {
            // 입장 메시지 전송만 담당
            if (stompClient.current) {
                socketEvents.sendJoinMessage(stompClient.current, roomId);
                console.log('Join message sent successfully');
            }
        } catch (error) {
            console.error('Enter room error:', error);
            throw error;
        }
    },

    // todo : 유저 준비 상태 변경 함수
    updateUserState: async (
        stompClient: React.RefObject<Client>,
        userId: string,
        roomId: string,
        status: 'READY' | 'NOT_READY'
    ) => {
        try {
            if (!stompClient.current?.active) {
                console.error('STOMP connection is not active');
                return;
            }

            stompClient.current.publish({
                destination: SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.READY(roomId),
                body: JSON.stringify({
                    "roomUserId": userId,
                    "roomId": roomId,
                })
            });
        } catch (error) {
            console.error('Update UserState error:', error);
            throw error;
        }
    },

    // todo : 유저 팀 변경 함수
    changeUserTeam: async (
        stompClient: React.RefObject<Client>,
        userId: string,
        roomId: string,
        team: 'red' | 'blue'
    ) => {
        try {
            if (!stompClient.current?.active) {
                console.error('STOMP connection is not active');
                return;
            }

            stompClient.current.publish({
                destination: SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.TEAMSWITCH(roomId),
                body: JSON.stringify({
                    "roomUserId": userId,
                    "roomId": roomId
                })
            });

        } catch (error) {

        }
    },

    // todo : 유저 방 나가기 함수.
    userExitRoom: async (
        stompClient: React.RefObject<Client>,
        userId: string,
        roomId: string
    ) => {
        try {
            if (!stompClient.current?.active) {
                console.error('STOMP connection is not active');
                return;
            }

            stompClient.current.publish({
                destination: SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.EXIT,
                body: JSON.stringify({
                    "roomUserId": userId,
                    "roomId": roomId,
                })
            });

        } catch (error) {

        }
    }

    
    // todo : 유저 강퇴하기(방장 권한)

    // todo : 방장 위임하기(방장 권한)

    // todo : 리더 위임하기(리더 권한)

};