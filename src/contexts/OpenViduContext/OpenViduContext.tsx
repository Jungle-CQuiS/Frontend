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
        if (OV.current === null) {
            try {
                OV.current = new OpenVidu(); // OpenVidu 인스턴스 생성
                const session = OV.current.initSession(); // 세션 생성
                console.log("session Create", session);

                // 다른 사용자의 스트림이 생성될 때 발생하는 이벤트 핸들러
                session.on("streamCreated", (event) => {
                    const subscriber = session.subscribe(event.stream, undefined); // 스트림 구독
                    setSubscribers((prev) => [...prev, subscriber]); // 구독자를 state에 추가
                    console.log("세션생성완료");
                });

                session.on('streamDestroyed', (event) => {
                    // 참가자가 나갔을 때 처리
                });

                return session; // session 객체를 반환
            } catch (error) {
                console.error("Failed to initialize session", error);
                return null;
            }
        }
        return null;
    };

    const joinRoom = async (sessionid: string, token: any, roomUserId: string) => {
        if (sessionid && token) {
            try {
                // 1. 세션 세팅
                setSessionId(sessionid);

                // 2. 세션 초기화
                const session = await initOpenViduSession();
                if (session) {
                    console.log("session Create 완료", session);

                    // 3. 세션에 연결
                    console.log("세션 연결시작:", session);
                    await session.connect(token, { userId: roomUserId });
                    console.log("세션 연결 완료", session);

                    // 4. 연결 후 스트림 발행 시작
                    await publishStream(session);
                }
            } catch (error) {
                console.error('Error:', error);
            }
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
                    publishVideo: false     // 비디오 비활성화
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