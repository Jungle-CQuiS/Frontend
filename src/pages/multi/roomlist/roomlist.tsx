import React, { useState, useEffect } from 'react';
import { MainPageTableTbody, MainPageTableTbodyIcon, MainPageTableTbodyTd, MainPageTableTbodyTr } from "./styled";
import { useNavigate } from "react-router-dom";
import { Room } from "../../../types/room"
import { PasswordCheckModal } from '../../../components/modal/roomlist/passwordCheck';
//임시 방 정보 하드코딩
const testrooms = [
    { id: "room1", name: "이기는 팀 우리 팀", isLocked: true, currentUsers: "7", maxUser: "8" },
    { id: "room2", name: "패배 팀", isLocked: false, currentUsers: "6", maxUser: "8" },
    { id: "room3", name: "우승 팀", isLocked: true, currentUsers: "5", maxUser: "10" },
];

interface RoomListProps {
    searchTerm: string;
}

const RoomList: React.FC<RoomListProps> = ({ searchTerm }) => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [roomID, setRoomId] = useState<string>();
    const [roomName, setRoomName] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (roomId: string, roomName:string) => {
        setRoomId(roomId);
        setRoomName(roomName);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleDone = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchRooms = async (): Promise<void> => {
            try {
                const response = await fetch("/quiz/multi/rooms");
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
        };

        fetchRooms();
    }, []);

    const handleRowClick = (roomId: string, roomName: string) => {
        navigate(`/room/${roomId}`, {
            state: {
                roomId,  // roomId도 state에 포함
                roomName
            }
        });
    };

    //rooms로 변경해야함. API 받으면
    const filteredRooms = rooms.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <div>Loading rooms...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <MainPageTableTbody>
                {filteredRooms.map((room) => (
                    <MainPageTableTbodyTr key={room.gameRoomId} onClick={() => room.isLocked ? handleOpenModal(room.gameRoomId, room.name) : handleRowClick(room.gameRoomId, room.name) }>
                        <MainPageTableTbodyTd>{room.name}</MainPageTableTbodyTd>
                        <MainPageTableTbodyTd>
                            {room.isLocked && <MainPageTableTbodyIcon src="/icons/lock.svg" alt="Lock" />}
                        </MainPageTableTbodyTd>
                        <MainPageTableTbodyTd>{room.currentUsers}/{room.maxUsers}</MainPageTableTbodyTd>
                    </MainPageTableTbodyTr>
                ))}
            </MainPageTableTbody>
            <PasswordCheckModal
                roomId = {roomID}
                roomName = {roomName}
                open={isModalOpen}
                onClose={handleCloseModal}
                onDone= {handleDone} 
            />
        </>
    );
};

export default RoomList;