// hooks/usePageLeave.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../config/api/constants';
import { readyRoomSocketEvents } from './readyRoomSocketEvent';
import { useConfirm } from '../components/confirmPopup';
import { useStompContext } from '../contexts/StompContext';
import { useGameState } from '../contexts/GameStateContext/useGameState';

/* 페이지 나가기 위한 커스텀 훅 */
export function usePageLeave() {
    const navigate = useNavigate();
    const customConfirm = useConfirm();
    const { stompClient } = useStompContext();
    const { roomUserId, _roomId } = useGameState();

    useEffect(() => {
        const handleClose = async (event: any) => {
            if (_roomId) {
                event.preventDefault();
                event.returnValue = '';
                const confirmed = await customConfirm('정말 나가시겠습니까?');
                if (confirmed && roomUserId) {
                    readyRoomSocketEvents.userExitRoom(stompClient, _roomId, roomUserId);
                    navigate(SERVICES.MULTI);
                }
            }
        };

        window.addEventListener('beforeunload', handleClose);
        window.addEventListener('popstate', handleClose);

        return () => {
            window.removeEventListener('beforeunload', handleClose);
            window.removeEventListener('popstate', handleClose);
        };
    }, [customConfirm, stompClient, _roomId, roomUserId, navigate]);
}
