import React, { useState, useEffect } from 'react';
import { MainPageTableTbody ,MainPageTableTbodyIcon, MainPageTableTbodyTd, MainPageTableTbodyTr} from "./styled";
import { useNavigate } from "react-router-dom";

interface Room {
    id: string;
    name: string;
    isLocked: boolean;
    currentUsers: number; 
    maxUser: number;
}


//임시 방 정보 하드코딩
const testrooms = [
    { id: "room1", name: "이기는 팀 우리 팀", isLocked: true, currentUsers: "7", maxUser: "8" },
    { id: "room2", name: "패배 팀", isLocked: false, currentUsers: "6", maxUser: "8" },
    { id: "room3", name: "우승 팀", isLocked: true, currentUsers: "5", maxUser: "10" },
];

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleRowClick = (roomId: string, roomName: string) => {
    navigate(`/room/${roomId}`, { state: { roomName } });
    }
  /*useEffect(() => {
    const fetchRooms = async (): Promise<void> => {
      try {
        const response = await fetch("/quiz/multi/rooms");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Room[] = await response.json();
        setRooms(data);
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

  if (isLoading) return <div>Loading rooms...</div>;
  if (error) return <div>Error: {error}</div>;*/
    
 

  return (
    <MainPageTableTbody>
      {testrooms.map((room) => (
            <MainPageTableTbodyTr key={room.id} onClick={() => handleRowClick(room.id, room.name)}>
                <MainPageTableTbodyTd>{room.name}</MainPageTableTbodyTd>
                    <MainPageTableTbodyTd>
                        {room.isLocked ? (
                            <MainPageTableTbodyIcon src="/icons/lock.svg" alt="Lock" />
                            ) : null}
                            </MainPageTableTbodyTd>
                            <MainPageTableTbodyTd>{room.currentUsers}/{room.maxUser}</MainPageTableTbodyTd>
                    </MainPageTableTbodyTr>
        ))}
    </MainPageTableTbody>
  );
};

export default RoomList;