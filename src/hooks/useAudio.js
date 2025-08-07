import { useRef } from 'react';

export default function useAudio(src) {
  const audioRef = useRef(new Audio(src));

  const play = () => {
    audioRef.current.play().catch((e) => {
      console.warn('Audio play blocked:', e);
    });
  };

  return { play };
}
