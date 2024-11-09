import { createContext, useState, useEffect, ReactNode, Children } from "react";
import { OpenVidu, Session, Subscriber, Publisher } from "openvidu-browser";

interface OpenViduContextType {
    session: Session | null;
    publisher: Publisher | null;
    subscribers: Subscriber[];
}

const OpenViduContext = createContext<OpenViduContextType | null>(null);

interface OpenViduProviderProps {
    children: ReactNode;
}

export const OpenViduProvider = ({ children }: OpenViduProviderProps) => {
    const [session, setSession] = useState<Session | null>(null); // OpenVidu 세션 객체
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [publisher, setPublisher] = useState<Publisher | null>(null); // 자신의 미디어 퍼블리셔
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]); // 다른 사용자의 미디어 구독자

    const CreateNewSession = async () => {
        try {
            // 1. 서버에 새 세션 생성 요청
            const response = await fetch('/api/sessions/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomName: 'MyRoom' })
            });
            const { sessionId, token } = await response.json();
            setSessionId(sessionId);

            // 2. 클라이언트 측에서 세션 초기화
            const ov = new OpenVidu();
            const session = ov.initSession();

            // 3. 세션에 연결
            await session.connect(token);
        } catch (error) {
            console.error('Error creating room:', error);
        }
    }

    const joinRoom = async () => {
        try {
            // 1. 서버에 기존 세션 참여 요청
            const response = await fetch('/api/sessions/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId,
                    userName: 'User2'
                })
            });
            const { token } = await response.json();

            // 2. 클라이언트 측에서 세션 초기화
            const ov = new OpenVidu();
            const session = ov.initSession();

            // 3. 세션에 연결
            await session.connect(token);
        } catch (error) {
            console.error('Error joining room:', error);
        }
    };
    // session을 초기화한다.
    const initOpenViduSession = async () => {
        try {
            const OV = new OpenVidu(); // OpenVidu 인스턴스 생성
            const session = OV.initSession(); // 세션 생성

            // 다른 사용자의 스트림이 생성될 때 발생하는 이벤트 핸들러
            session.on("streamCreated", (event) => {
                const subscriber = session.subscribe(event.stream, undefined); // 스트림 구독
                setSubscribers((prev) => [...prev, subscriber]); // 구독자를 state에 추가
            });

            session.on('streamDestroyed', (event) => {
                // 참가자가 나갔을 때 처리
            });

            // 세션 설정 완료, state에 세션 저장
            setSession(session);
        } catch (error) {
            console.error("Failed to initialize session", error);
        }
    };


    const publishStream = (audioElement: string | HTMLElement | undefined) => {
        if (session && !publisher) {
            const OV = new OpenVidu(); // OpenVidu 인스턴스 생성
            const newPublisher = OV.initPublisher(audioElement, {
                videoSource: false, // 비디오 트랙 비활성화 (오디오만 전송)
                audioSource: undefined, // 오디오 장치 기본값 사용
            });

            session.publish(newPublisher); // 세션에 퍼블리시
            setPublisher(newPublisher); // 퍼블리셔 상태 업데이트
        }
    };


    return {
        session,
        publisher,
        subscribers,
    }
}


export {OpenViduContext}