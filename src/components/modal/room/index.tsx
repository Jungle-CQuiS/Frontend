import { useState } from "react"
import { Modal, IModalProps } from ".."
import { PrimaryButtonMedium, SecondaryButton } from "../../buttons/styled"
import { ModalTitle, ModalTitleIcon, ModalTitleWrap } from "../styled"
import { CreateRoomModalRow, CreateRoomModalLabel, CreateRoomModalInput, CreateRoomModalButtonWrap, CreateRoomModalRowContainer, CreateRoomModalNumber, CreateRoomModalNumberInfo, CreateRoomModalNumberInfoImg, CreateRoomModalNumberInfoText, CreateRoomModalPasswordCheckbox, CreateRoomModalPasswordInput, CreateRoomModalPasswordRow, CreateRoomModalPasswordWrap, CreateRoomModalText, CreateRoomModalNumberWrap, CreateRoomModalBodyWrap } from "./styled"


export const CreateRoomModal = ({
    ...props
}: IModalProps) => {
    const [value, setValue] = useState(4);
    const [isPasswordChecked, setIsPasswordChecked] = useState(false);
    const [isNoPasswordChecked, setIsNoPasswordChecked] = useState(true);

    const handleNoPasswordCheckbox = () => {
        setIsNoPasswordChecked(true);
        setIsPasswordChecked(false);
    }

    const handlePasswordCheckbox = () => {
        setIsPasswordChecked(true);
        setIsNoPasswordChecked(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value));
    };

    //TODO: 방 만들기
    const handleCreateRoom = () => {
        const userUuid = localStorage.getItem("uuid");

    }


    return(
        <Modal {...props} >
            <ModalTitleWrap>
                <ModalTitleIcon src="/icons/mdi_users_black.svg" alt="Create Room Icon"/>
                <ModalTitle>MULTI MODE</ModalTitle>
            </ModalTitleWrap>
            <CreateRoomModalBodyWrap>
                <CreateRoomModalRow>
                    <CreateRoomModalLabel>방이름</CreateRoomModalLabel>
                    <CreateRoomModalInput placeholder="방 이름을 입력해주세요"/>
                </CreateRoomModalRow>
                <CreateRoomModalRowContainer>
                    <CreateRoomModalRow>
                        <CreateRoomModalLabel>비밀번호</CreateRoomModalLabel>
                        <CreateRoomModalPasswordWrap>
                            <CreateRoomModalPasswordRow onClick={handleNoPasswordCheckbox}>
                                <CreateRoomModalPasswordCheckbox 
                                src={isNoPasswordChecked ? "/icons/checkbox_filled.svg" : "/icons/checkbox_base.svg"} 
                                alt="Checkbox No Password"/>
                                <CreateRoomModalText>사용안함</CreateRoomModalText>
                            </CreateRoomModalPasswordRow>
                            <CreateRoomModalPasswordRow onClick={handlePasswordCheckbox}>
                                <CreateRoomModalPasswordCheckbox 
                                src={isPasswordChecked ? "/icons/checkbox_filled.svg" : "/icons/checkbox_base.svg"} 
                                alt="Checkbox Use Password"/>
                                <CreateRoomModalPasswordInput 
                                disabled={!isPasswordChecked}  placeholder="숫자만 입력해주세요"/>
                            </CreateRoomModalPasswordRow>
                        </CreateRoomModalPasswordWrap>
                    </CreateRoomModalRow>
                    <CreateRoomModalRow>
                        <CreateRoomModalLabel>인원</CreateRoomModalLabel>
                        <CreateRoomModalNumberWrap>
                            <CreateRoomModalNumber
                                type="number"
                                id="participants"
                                name="participants"
                                min="4" 
                                max="10"
                                value={value}
                                onChange={handleChange}/>
                            <CreateRoomModalNumberInfo>
                                <CreateRoomModalNumberInfoImg src="/icons/info.svg" alt="Info Icon"/>
                                <CreateRoomModalNumberInfoText>최대 10명까지 입장할 수 있습니다.</CreateRoomModalNumberInfoText>
                            </CreateRoomModalNumberInfo>
                        </CreateRoomModalNumberWrap>
                    </CreateRoomModalRow>
                </CreateRoomModalRowContainer>
                <CreateRoomModalButtonWrap>
                    <SecondaryButton onClick={props.onClose}>취소하기</SecondaryButton>
                    <PrimaryButtonMedium onClick={handleCreateRoom}>방만들기</PrimaryButtonMedium>
                </CreateRoomModalButtonWrap>
            </CreateRoomModalBodyWrap>
        </Modal>
    )
}

