import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { MainPageTableTbody, MainPageTableTbodyIcon, MainPageTableTbodyTd, MainPageTableTbodyTr, MultiRoomBottom, MultiRoomContainer, MultiRoomLock, MultiRoomName, MultiRoomUsersIcon, MultiRoomUsersText, MultiRoomUsersWrap, MultiRoomWrap } from "./styled";
import { useNavigate } from "react-router-dom";
import { Room } from "../../../types/room";
import { PasswordCheckModal } from '../../../components/modal/roomlist/passwordCheck';
import { QUIZ_MULTI_ENDPOINTS } from '../../../config/api/endpoints/quiz-multi.endpoints';
import { RoomListLoading } from '../../../modules/room/roomListLoading';
import { useAlert } from '../../../components/confirmPopup';

interface RoomListProps {
    searchTerm: string;
    onRefresh?: () => void;
}

const RoomList = forwardRef<{}, RoomListProps>(({ searchTerm }, ref) => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [roomID, setRoomId] = useState<string>();
    const [roomName, setRoomName] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const customAlert = useAlert();

    const handleOpenModal = useCallback((roomId: string, roomName: string) => {
        setRoomId(roomId);
        setRoomName(roomName);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleDone = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const fetchRooms = useCallback(async (): Promise<void> => {
        try {
            const token = localStorage.getItem("AccessToken");
            if (!token) {
                throw new Error("로그인이 필요합니다.");
            }

            const response = await fetch(QUIZ_MULTI_ENDPOINTS.ROOMS.LIST, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setRooms(data.data.rooms);
            setIsLoading(false);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            console.error("Fetching rooms failed:", errorMessage);
            setError(errorMessage);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    useImperativeHandle(ref, () => ({
        refreshRooms: fetchRooms
    }));

    const checkRoomAvailability = (selectedRoom: Room) => {
        if (!selectedRoom) {
            customAlert("존재하지 않는 방입니다.");
            return false;
        }

        if (selectedRoom.currentUsers >= selectedRoom.maxUsers) {
            customAlert("이미 가득찬 방입니다.");
            return false;
        }
        
        return true;
    };

    const handleRowClick = async (roomId: string, roomName: string) => {
        try {
            const token = localStorage.getItem("AccessToken");
            if (!token) {
                throw new Error("로그인이 필요합니다.");
            }

            const response = await fetch(QUIZ_MULTI_ENDPOINTS.ROOMS.LIST, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Authorization-refresh": `${localStorage.getItem("RefreshToken")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch room status: ${response.status}`);
            }

            const data = await response.json();
            const selectedRoom = data.data.rooms.find((room: Room) => room.gameRoomId === roomId);

            if (checkRoomAvailability(selectedRoom)) {
                navigate(`/room/${roomId}`, {
                    state: {
                        roomId,
                        roomName,
                    }
                });
            } else {
                // 방이 가득 차거나 존재하지 않는 경우 목록을 다시 검색
                fetchRooms();
            }
        } catch (error) {
            console.error("Failed to fetch room details:", error);
        }
    };

    const filteredRooms = rooms.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <RoomListLoading />;

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <MultiRoomContainer>
                {filteredRooms.length === 0 ? (
                    <RoomListLoading />
                ) : (
                    filteredRooms.map((room) => (
                        <MultiRoomWrap
                            key={room.gameRoomId}
                            onClick={() => room.isLocked
                                ? handleOpenModal(room.gameRoomId, room.name)
                                : handleRowClick(room.gameRoomId, room.name)
                            }
                        >
                            <MultiRoomName>{room.name}</MultiRoomName>
                            <MultiRoomBottom>
                                <MultiRoomUsersWrap>
                                    <MultiRoomUsersIcon src='/icons/mdi_user_black.svg'/>
                                    <MultiRoomUsersText>{room.currentUsers}/{room.maxUsers}</MultiRoomUsersText>
                                </MultiRoomUsersWrap>
                                <MultiRoomLock>
                                    {room.isLocked && <MainPageTableTbodyIcon src="/icons/lock.svg" alt="Lock" />}
                                </MultiRoomLock>
                            </MultiRoomBottom>
                        </MultiRoomWrap>
                    ))
                )}
            </MultiRoomContainer>
            <PasswordCheckModal
                roomId={roomID}
                roomName={roomName}
                open={isModalOpen}
                onClose={handleCloseModal}
                onDone={handleDone}
            />
        </>
    );
});

export default RoomList;
