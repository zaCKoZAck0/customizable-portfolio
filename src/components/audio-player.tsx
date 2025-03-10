'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Slider } from '~/components/ui/slider';
import {
  Play,
  Pause,
  SparklesIcon,
} from 'lucide-react';

export function AudioPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    // Set up event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    // Clean up event listeners
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Format time in MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mx-auto my-4 max-w-md rounded-lg border p-4 shadow-sm">
      {/* Audio element (hidden) */}
      <audio ref={audioRef} src={src} preload="none" />

      {/* Header with title and actions */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-medium md:text-lg">Listen as Podcast</h2>
        <div className="flex items-center gap-2 text-xs text-secondary-foreground/50">
          <SparklesIcon size={16} />
          <span className="hidden md:block">Generated by AI</span>
        </div>
      </div>

      {/* Player controls */}
      <div className="flex items-center space-x-4">
        {/* Play/Pause button */}
        <Button
          onClick={togglePlayPause}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary p-0 hover:bg-primary/75"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6 text-primary-foreground" />
          ) : (
            <Play className="ml-0.5 h-6 w-6 text-primary-foreground" />
          )}
        </Button>

        {/* Progress bar and time */}
        <div className="flex-1">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSliderChange}
            className="mb-2"
          />
          <div className="text-sm text-muted-foreground">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  );
}
