import { Client } from '@stomp/stompjs';
import { TeamUser } from '../modules/room/components/TeamUser';
import { SOCKET_DESTINATIONS } from '../config/websocket/constants';

export const socketEvents = {
    // SUBSCRIBE ------------------------------------------------------------------------------------
    // 방 정보 구독 함수
    subscribeToRoom: (client: Client, roomId: string, updateTeams: (users: TeamUser[]) => void) => {
        try {
            console.log('Attempting to subscribe to room:', roomId);
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.ROOM_INFO(roomId),
                (message) => {
                    console.log('Received message:', message);
                    try {
                        interface ServerUser {
                            roomUserId: number;  // string이 아닌 number
                            username: string;
                            honorCount: number;
                            role: string;
                            team: string;
                            isLeader: boolean;
                            isReady: boolean;
                        }

                        const response = JSON.parse(message.body);

                        console.log(response);

                        const teamUsers: TeamUser[] = response.usersData.map((user: ServerUser) => ({
                            id: user.roomUserId,
                            name: user.username,
                            honor: user.honorCount,
                            profileImage: "/images/profile_image.png",
                            role: user.role,
                            team: user.team,
                            isLeader: user.isLeader ? 'leader' : 'member', // bool?
                            state: user.isReady ? 'ready' : 'notready'// bool?
                        }));

                        console.log(teamUsers);
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

    // 유저 roomUserId 구독 함수
    subscribeRoomUserId: (client: Client, uuid: string, setRoomUserID: (roomUid: string) => void) => {
        try {
            console.log('Attempting to subscribe to roomUserId:', uuid);
            const subscription = client.subscribe(
                SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SUBSCRIBE.USER_JOIN,
                (message) => {
                    console.log('Received message:', message);
                    try {
                        const response = JSON.parse(message.body);
                        setRoomUserID(response.data.roomUserId);
                        console.log(response);
                    } catch (err) {
                        console.error('Error processing message:', err);
                    }
                },
                {
                    'uuid': uuid // 헤더에 uuid 포함
                });
            console.log('Subscription successful:', subscription);
        } catch (err) {
            console.error('Subscription error:', err);
        }
    },

    // 준비방 상태 구독 함수
    subscribeRoomStatusMessage: (client: Client , roomId: string, setUseGameState:(event : string, time : number) => void) => {
        try {
            // client에 구독 요청
            // message를 받는다.
            /*
            {
                "data": {
                    "isAllReady": 1 or 0(bool)
                    },
                    "message": 성공,
                    "code": S001
                }
            
            */
           // setUseGameState(response.data.message)

        } catch (error) {

        }

        // 게임이 시작되면 구독 해지도 해야함.
    },

    // ----------------------------------------------------------------------------------------------

    // APP ( room enter )---------------------------------------------------------------------------
    // 유저 방 입장 알림 함수
    sendJoinMessage: (client: Client, roomId: string) => {
        if (!client.active) {
            throw new Error('No active connection');
        }

        const destination = SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.JOIN;
        const message = {
            uuid: "8a9aa9b8-5cba-4281-b4bc-833b1459c273", // 수정 요!
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

    // 유저 방 입장 함수
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
    //-----------------------------------------------------------------------------------------------

    // APP ( state change )--------------------------------------------------------------------------
    // todo : 유저 준비 상태 변경 함수
    updateUserState: async (
        stompClient: React.RefObject<Client>,
        roomUserId: string,
        roomId: string,
    ) => {
        try {
            if (!stompClient.current?.active) {
                console.error('STOMP connection is not active');
                return;
            }

            stompClient.current.publish({
                destination: SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.READY,
                body: JSON.stringify({
                    "roomUserId": roomUserId,
                    "roomId": roomId,
                })
            });
        } catch (error) {
            console.error('Update UserState error:', error);
            throw error;
        }
    },
    // -----------------------------------------------------------------------------------------------

    // APP ( action ) --------------------------------------------------------------------------------
    // todo : 유저 팀 변경 함수
    changeUserTeam: async (
        stompClient: React.RefObject<Client>,
        roomUserId: string,
        roomId: string,
    ) => {
        try {
            if (!stompClient.current?.active) {
                console.error('STOMP connection is not active');
                return;
            }

            stompClient.current.publish({
                destination: SOCKET_DESTINATIONS.QUIZ_MULTI.ROOMS.SEND.TEAMSWITCH,
                body: JSON.stringify({
                    "roomUserId": roomUserId,
                    "roomId": roomId
                })
            });

        } catch (error) {

        }
    },

    // todo : 유저 방 나가기 함수.
    userExitRoom: async (
        stompClient: React.RefObject<Client>,
        roomUserId: string,
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
                    "roomUserId": roomUserId,
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