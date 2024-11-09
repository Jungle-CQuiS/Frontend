import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const BackgroundMusicContext = createContext<HTMLAudioElement | null>(null);

export const BackgroundMusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!audioRef.current) {
      // 새로 Audio 객체를 생성해서 ref에 할당
      audioRef.current = new Audio('/sounds/Aquarium.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.1;
    }

    // 새로고침 시에도 항상 클릭 이벤트를 추가
    const handleUserInteraction = () => {
      audioRef.current?.play().catch(error => {
        console.error("오디오 재생 실패:", error);
      });
    };

    document.addEventListener("click", handleUserInteraction);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // 페이지에 따라 배경음악을 변경하고 자동 재생 시도
      if (location.pathname.startsWith("/single")) {
        if (audio.src !== window.location.origin + "/sounds/Aquaroad.mp3") {
          audio.src = "/sounds/Aquaroad.mp3";
          audio.load(); // src 변경 시 load() 호출하여 새로운 파일을 불러옴
          audio.play().catch(error => console.error("오디오 재생 실패:", error));
        }
        audio.volume = 0.1;
      } else if (location.pathname.startsWith("/room/") || location.pathname.startsWith("/multi/")) {
        if (audio.src !== window.location.origin + "/sounds/where_stars_rest.mp3") {
          audio.src = "/sounds/where_stars_rest.mp3";
          audio.load();
          audio.play().catch(error => console.error("오디오 재생 실패:", error));
        }
        audio.volume = 0.02;
      } else {
        if (audio.src !== window.location.origin + "/sounds/Aquarium.mp3") {
          audio.src = "/sounds/Aquarium.mp3";
          audio.load();
          audio.play().catch(error => console.error("오디오 재생 실패:", error));
        }
        audio.volume = 0.1;
      }
    }
  }, [location]);

  return (
    <BackgroundMusicContext.Provider value={audioRef.current}>
      {children}
    </BackgroundMusicContext.Provider>
  );
};

export const useBackgroundMusic = () => {
  return useContext(BackgroundMusicContext);
};
