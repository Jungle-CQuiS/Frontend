import { createContext, useEffect, useState, useRef, ReactNode } from "react";
import { OpenVidu, Session, Subscriber, Publisher } from "openvidu-browser";

interface OpenViduContextType {
    session: Session | null;
    publisher: Publisher | null;
    subscribers: Subscriber[];
    // Voice
    isSpeaking: boolean;
    joinRoom: (sessionid: string, token: any, roomUserId: string) => void;
    publishStream: (session: Session) => void;
    unpublishStream: () => void;
    disconnectSession: () => void;
}

const OpenViduContext = createContext<OpenViduContextType | null>(null);

interface OpenViduProviderProps {
    children: ReactNode;
}

export const OpenViduProvider = ({ children }: OpenViduProviderProps) => {
    const OV = useRef<OpenVidu | null>(null);
    const [session, setSession] = useState<Session | null>(null); // OpenVidu 세션 객체
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [publisher, setPublisher] = useState<Publisher | null>(null); // 자신의 미디어 퍼블리셔
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]); // 다른 사용자의 미디어 구독자
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    // Team Voice
    useEffect(() => {
        if (publisher) {
            // 자신의 음성 감지
            publisher.on('publisherStartSpeaking', (event: any) => {
                setIsSpeaking(true);
                console.log('내가 말하기 시작함');
            });

            publisher.on('publisherStopSpeaking', (event: any) => {
                setIsSpeaking(false);
                console.log('내가 말하기 멈춤');
            });
        }
    }, [publisher]);


    // session을 초기화한다.
    const initOpenViduSession = async () => {
        try {
            OV.current = new OpenVidu(); // 매번 새로운 인스턴스 생성
            const session = OV.current.initSession();
            console.log("session Create", session);

            // 이벤트 핸들러 설정
            session.on("streamCreated", (event) => {
                const subscriber = session.subscribe(event.stream, undefined);
                subscriber.subscribeToAudio(true);
                setSubscribers((prev) => [...prev, subscriber]);
                console.log("스트림 생성됨");
            });

            session.on('streamDestroyed', (event) => {
                console.log("스트림 제거됨");
            });

            return session;
        } catch (error) {
            console.error("Failed to initialize session", error);
            throw error;  // 에러를 던져서 상위에서 처리하도록
        }
    };

    const joinRoom = async (sessionid: string, token: string, roomUserId: string) => {
        if (!sessionid || !token) {
            console.error('세션ID 또는 토큰이 없습니다', { sessionid, token });
            return;
        }

        try {
            setSessionId(sessionid);

            console.log('초기화 시작', { sessionid, roomUserId });
            const session = await initOpenViduSession();
            console.log('세션 생성됨', session);

            // 토큰 형식을 OpenVidu가 기대하는 형태로 변경
            const fullToken = `wss://voice.cquis.net:4443?sessionId=${sessionid}&token=${token}`;

            console.log('연결 시도', {
                originalToken: token,
                fullToken: fullToken,
                roomUserId
            });

            await session.connect(fullToken, {
                clientData: JSON.stringify({
                    roomUserId: roomUserId  // subscriber에서 사용할 데이터
                })
            });

            await publishStream(session);
        } catch (error) {
            console.error('joinRoom 에러:', error);
            // 에러 처리 로직 추가
        }
    };


    // 스트림 발행 (음성 채팅 시작)
    const publishStream = async (session: Session) => {
        if (session && !publisher && OV.current) {
            try {
                console.log("퍼블리셔 생성 시작작", session);
                const newPublisher = OV.current.initPublisher(undefined, {
                    videoSource: false,      // 비디오 사용 안 함
                    audioSource: undefined,   // 기본 마이크 사용
                    publishAudio: true,      // 오디오 활성화
                    publishVideo: false,     // 비디오 비활성화

                    
                });

                // 스트림 발행 시작
                await session.publish(newPublisher);
                console.log("퍼블리셔 발생완료", session);
                setPublisher(newPublisher);
                if (newPublisher)
                    console.log("<Client> 퍼블리셔 세팅 완료");
                // 음소거 상태 관리 등 추가 가능
                newPublisher.on('streamPlaying', () => {
                    console.log('내 스트림이 재생 중입니다.');
                });
            } catch (error) {
                console.error('스트림 발행 실패:', error);
            }
        }
    };


    // 스트림 발행 중지 (음성 채팅 중단)
    const unpublishStream = () => {
        if (session && publisher) {
            session.unpublish(publisher);
            setPublisher(null);
        }
    };

    const disconnectSession = () => {
        if (session)
            session.disconnect();

        unpublishStream();
        OV.current = null;
        setSessionId(null);
        setSubscribers([]);
    }

    return (
        <OpenViduContext.Provider
            value={{
                session,
                publisher,
                subscribers,
                isSpeaking,
                joinRoom,
                publishStream,   // 음성 채팅 시작
                unpublishStream,  // 음성 채팅 중단
                disconnectSession
            }}
        >
            {children}
        </OpenViduContext.Provider>
    );
}


export { OpenViduContext }