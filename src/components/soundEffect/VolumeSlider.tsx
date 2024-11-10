import React, { useEffect, useState } from 'react';
import { useBackgroundMusic } from './BackgroundMusic';

const VolumeControl: React.FC = () => {
  const backgroundMusic = useBackgroundMusic();
  const [volume, setVolume] = useState(backgroundMusic?.audio?.volume || 0.1);

  useEffect(() => {
    const savedVolume = parseFloat(localStorage.getItem('backgroundVolume') || '0.1');
    setVolume(savedVolume);
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    backgroundMusic?.setVolume(newVolume);
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        />
    </div>
  );
};

export default VolumeControl;
