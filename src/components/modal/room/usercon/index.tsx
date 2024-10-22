import { useState } from "react"
import { Modal, IModalProps } from "../.."
import { UserControlWrap, UserControlBtn} from "./styled"

export const UserControlInRoom = ({
    ...props
}:IModalProps) => {


    return(
        <Modal {...props} >
            <UserControlWrap>
                <UserControlBtn>강퇴</UserControlBtn>
                <UserControlBtn>팀장 넘겨주기</UserControlBtn>
            </UserControlWrap>
        </Modal>
    )
}