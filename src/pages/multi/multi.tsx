import { useState } from "react";
import { CreateRoomModal } from "../../components/modal/room";
import NavBar from "../../components/navbar/navbar";
import { MainPageSearchBar, MainPageSearchBarWrap, MainPageTable, MainPageTableTbody, MainPageTableTbodyIcon, MainPageTableTbodyTd, MainPageTableTbodyTr, MainPageTableThead, MainPageTableTheadTh, MainPageTableTheadTr, MainPageTitleText, MultiPageContainer, MultiPageTitle, MultiPageTitleIcon } from "./styled";
import { PrimaryButtonMedium } from "../../components/buttons/styled";

export default function MultiPage(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    const handleCloseModal = () => {
        setIsModalOpen(false);
      };
      const handleDone = () => {
        setIsModalOpen(false);
      };

    return(
        <>
            <NavBar />
            <MultiPageContainer>
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
                        <MainPageTableTbodyTr>
                            <MainPageTableTbodyTd>이기는 팀 우리 팀</MainPageTableTbodyTd>
                            <MainPageTableTbodyTd>
                                <MainPageTableTbodyIcon src="/icons/lock.svg" alt="Lock" />
                            </MainPageTableTbodyTd>
                            <MainPageTableTbodyTd>7/8</MainPageTableTbodyTd>
                        </MainPageTableTbodyTr>
                        <MainPageTableTbodyTr>
                            <MainPageTableTbodyTd>이기는 팀 우리 팀</MainPageTableTbodyTd>
                            <MainPageTableTbodyTd>
                                <MainPageTableTbodyIcon src="/icons/lock.svg" alt="Lock" />
                            </MainPageTableTbodyTd>
                            <MainPageTableTbodyTd>7/8</MainPageTableTbodyTd>
                        </MainPageTableTbodyTr>
                        <MainPageTableTbodyTr>
                            <MainPageTableTbodyTd>이기는 팀 우리 팀</MainPageTableTbodyTd>
                            <MainPageTableTbodyTd>
                                <MainPageTableTbodyIcon src="/icons/lock.svg" alt="Lock" />
                            </MainPageTableTbodyTd>
                            <MainPageTableTbodyTd>7/8</MainPageTableTbodyTd>
                        </MainPageTableTbodyTr>
                    </MainPageTableTbody>
                </MainPageTable>
            </MultiPageContainer>
            <CreateRoomModal 
                open={isModalOpen}
                onClose={handleCloseModal}
                onDone={handleDone}
            />
        </>
    )
}