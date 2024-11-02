import { useState, useEffect } from "react";
import { OpenVidu, Session, Subscriber, Publisher } from "openvidu-browser";
import { useStompContext } from "../contexts/StompContext";
export const useOpenVidu = (roomId: string) => {
  const [session, setSession] = useState<Session | null>(null); // OpenVidu 세션 객체
  const [publisher, setPublisher] = useState<Publisher | null>(null); // 자신의 미디어 퍼블리셔
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]); // 다른 사용자의 미디어 구독자
  const { stompClient, connect, isConnected } = useStompContext();

  useEffect(() => {
    /*const initOpenViduSession = async () => {
      try {
        if (!isConnected) {
          await connect();
        }
        if (stompClient.current) {
          readyRoomSocketEvents.enterRoom(stompClient, roomId);
        }

        const OV = new OpenVidu(); // OpenVidu 인스턴스 생성
        const session = OV.initSession(); // 세션 생성

        // 다른 사용자의 스트림이 생성될 때 발생하는 이벤트 핸들러
        session.on("streamCreated", (event) => {
          const subscriber = session.subscribe(event.stream, undefined); // 스트림 구독
          setSubscribers((prev) => [...prev, subscriber]); // 구독자를 state에 추가
        });

        // 세션 설정 완료, state에 세션 저장
        setSession(session);
      } catch (error) {
        console.error("Failed to initialize session", error);
      }
    };*/

    //initOpenViduSession();

    // 컴포넌트 언마운트 시 세션 연결 종료
    return () => {
      if (session) {
        session.disconnect(); // 세션 종료
      }
    };
  }, [roomId, connect, isConnected, stompClient]); // roomId가 변경될 때마다 세션을 다시 초기화

  // 오디오 스트림 퍼블리시
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

  // 세션 객체, 퍼블리셔, 구독자 리스트와 오디오 퍼블리시 함수 반환
  return { session, publisher, subscribers, publishStream };
};
