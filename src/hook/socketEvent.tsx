import { Client } from '@stomp/stompjs';
import { useState, useEffect, useRef, useCallback } from "react";
import { TeamUser } from '../modules/room/components/TeamUser';
import { SOCKET_DESTINATIONS } from '../config/websocket/constants';

export const socketEvents = {
    subscribeToRoom: (client: Client, roomId: string, updateTeams: (users: TeamUser[]) => void) => {
        try {
            console.log('Attempting to subscribe to room:', roomId);
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.ROOM_INFO(roomId),
                (message) => {
                    console.log('Received message:', message);
                    try {
                        const response = JSON.parse(message.body);
                        updateTeams(response.data.usersData);
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

    sendJoinMessage: (client: Client, roomId: string) => {
        if (!client.active) {
            throw new Error('No active connection');
        }

        const destination = SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.JOIN;
        const message = {
            uuid: "92a46f49-34fa-4c37-bf3f-09389468042a",
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
    }
};