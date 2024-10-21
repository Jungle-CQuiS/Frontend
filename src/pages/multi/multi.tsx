import { useState } from "react";
import { CreateRoomModal } from "../../components/modal/room";
import NavBar from "../../components/navbar/navbar";
import { MainPageSearchBar, MainPageSearchBarWrap, MainPageTable, MainPageTableTbody, MainPageTableTbodyIcon, MainPageTableTbodyTd, MainPageTableTbodyTr, MainPageTableThead, MainPageTableTheadTh, MainPageTableTheadTr, MainPageTitleText, MultiPageTitle, MultiPageTitleIcon } from "./styled";
import { PrimaryButtonMedium } from "../../components/buttons/styled";
import { useNavigate } from "react-router-dom";
import { Background } from "../../components/background/styled";

export default function MultiPage(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    const handleCloseModal = () => {
        setIsModalOpen(false);
      };
      const handleDone = () => {
        setIsModalOpen(false);
      };
      const handleRowClick = (roomId: string, roomName: string) => {
        navigate(`/room/${roomId}`, { state: { roomName } });
    }
    

    //임시 방 정보 하드코딩
    const rooms = [
        { id: "room1", name: "이기는 팀 우리 팀", locked: true, participants: "7/8" },
        { id: "room2", name: "패배 팀", locked: false, participants: "5/8" },
        { id: "room3", name: "우승 팀", locked: true, participants: "6/8" },
    ];

    return(
        <>
            <NavBar />
            <Background>
                <MultiPageTitle>
                    <MultiPageTitleIcon src="/icons/mdi_users_black.svg" alt="Multi Icon Black"/>
                    <MainPageTitleText>MULTI MODE</MainPageTitleText>
                </MultiPageTitle>
                <MainPageSearchBarWrap>
                    <MainPageSearchBar placeholder="방 이름으로 검색하기"/>
                    <PrimaryButtonMedium onClick={handleOpenModal}>방 만들기</PrimaryButtonMedium>
                </MainPageSearchBarWrap>
                <MainPageTable>
                    <MainPageTableThead>
                        <MainPageTableTheadTr>
                            <MainPageTableTheadTh>이름</MainPageTableTheadTh>
                            <MainPageTableTheadTh>잠금</MainPageTableTheadTh>
                            <MainPageTableTheadTh>인원</MainPageTableTheadTh>
                        </MainPageTableTheadTr>
                    </MainPageTableThead>
                    <MainPageTableTbody>
                        {rooms.map((room) => (
                            <MainPageTableTbodyTr key={room.id} onClick={() => handleRowClick(room.id, room.name)}>
                                <MainPageTableTbodyTd>{room.name}</MainPageTableTbodyTd>
                                <MainPageTableTbodyTd>
                                    {room.locked ? (
                                        <MainPageTableTbodyIcon src="/icons/lock.svg" alt="Lock" />
                                    ) : null}
                                </MainPageTableTbodyTd>
                                <MainPageTableTbodyTd>{room.participants}</MainPageTableTbodyTd>
                            </MainPageTableTbodyTr>
                        ))}
                    </MainPageTableTbody>
                </MainPageTable>
            </Background>
            <CreateRoomModal 
                open={isModalOpen}
                onClose={handleCloseModal}
                onDone={handleDone}
            />
        </>
    )
}