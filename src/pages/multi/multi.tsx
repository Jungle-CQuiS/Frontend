import { useState } from "react";
import { CreateRoomModal } from "../../components/modal/room";
import NavBar from "../../components/navbar/navbar";
import { MainPageSearchBar, MainPageSearchBarWrap, MainPageTable, MainPageTableThead, MainPageTableTheadTh, MainPageTableTheadTr, MainPageTitleText, MultiPageTitle, MultiPageTitleIcon } from "./styled";
import { PrimaryButtonMedium } from "../../components/buttons/styled";
import { useNavigate } from "react-router-dom";
import { Background } from "../../components/background/styled";
import RoomList from './roomlist/roomlist';

export default function MultiPage(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

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
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return(
        <>
            <NavBar />
            <Background>
                <MultiPageTitle>
                    <MultiPageTitleIcon src="/icons/mdi_users_black.svg" alt="Multi Icon Black"/>
                    <MainPageTitleText>MULTI MODE</MainPageTitleText>
                </MultiPageTitle>
                <MainPageSearchBarWrap>
                    <MainPageSearchBar 
                        placeholder="방 이름으로 검색하기"
                        value={searchTerm}
                        onChange={handleSearch}/>
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
                    
                    <RoomList searchTerm={searchTerm} />

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