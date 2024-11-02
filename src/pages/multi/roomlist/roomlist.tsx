import React, { useState, useEffect } from 'react';
import { MainPageTableTbody, MainPageTableTbodyIcon, MainPageTableTbodyTd, MainPageTableTbodyTr } from "./styled";
import { useNavigate } from "react-router-dom";
import { Room } from "../../../types/room"
import { PasswordCheckModal } from '../../../components/modal/roomlist/passwordCheck';
import { QUIZ_MULTI_ENDPOINTS } from '../../../config/api/endpoints/quiz-multi.endpoints';

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
                // 로컬 스토리지에서 AccessToken 가져오기
                const token = localStorage.getItem("AccessToken");
                if (!token) {
                    throw new Error("로그인이 필요합니다."); // 토큰이 없으면 에러 처리
                }
    
                // API 요청에 Authorization 헤더 포함
                const response = await fetch(QUIZ_MULTI_ENDPOINTS.ROOMS.LIST, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // 토큰 추가
                    },
                });
    
                if (!response.ok) {
                    console.log(response);
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
                roomName,
            }
        });
    };

    
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