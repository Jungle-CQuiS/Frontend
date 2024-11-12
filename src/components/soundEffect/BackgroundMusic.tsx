import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BackgroundMusicContext = createContext<{
  audio: HTMLAudioElement | null;
  setVolume: (volume: number) => void;
} | null>(null);

export const BackgroundMusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  
  // localStorage에서 볼륨 불러오기 (없으면 0.1로 초기 설정)
  const initialVolume = parseFloat(localStorage.getItem('backgroundVolume') || '0.1');
  const [volume, setVolume] = useState(initialVolume);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/where_stars_rest.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }

    const handleUserInteraction = () => {
      audioRef.current?.play().catch(error => {
        console.error("오디오 재생 실패:", error);
      });
    };

    document.addEventListener("click", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setNewAudioSource = (src: string) => {
        if (audio.src !== window.location.origin + src) {
          audio.src = src;
          audio.load();
          audio.play().catch(error => console.error("오디오 재생 실패:", error));
        }
      };

      if (location.pathname.startsWith("/single")) {
        setNewAudioSource("/sounds/Aquaroad.mp3");
      } else if (location.pathname.startsWith("/room/") || location.pathname.startsWith("/multi/")) {
        setNewAudioSource("/sounds/where_stars_rest.mp3");
      } else {
        setNewAudioSource("/sounds/where_stars_rest.mp3");
      }
    }
  }, [location]);

  // 볼륨이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      localStorage.setItem('backgroundVolume', volume.toString());
    }
  }, [volume]);

  return (
    <BackgroundMusicContext.Provider
      value={{
        audio: audioRef.current,
        setVolume,
      }}
    >
      {children}
    </BackgroundMusicContext.Provider>
  );
};

export const useBackgroundMusic = () => {
  return useContext(BackgroundMusicContext);
};
