"use client";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayout";
import React, { useCallback, useRef, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { userInteracted } from "../interactionDetector.js";

type Props = {
  src: string;
};

const Video = ({ src }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);

  const playVideo = useCallback(() => {
    if (videoRef.current) {
      setPlaying(true);
      videoRef.current.play();
    }
  }, []);
  const pauseVideo = useCallback(() => {
    if (videoRef.current) {
    
      setPlaying(false);
      videoRef.current.pause();
    }
  }, []);

  const handlePlay = () => {
    
    if (videoRef.current) {
      if (playing) {
        pauseVideo();
      } else {
        playVideo();
      }
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (userInteracted) {
      playVideo();
    }
  }, [pauseVideo]);
  const onTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    if (isNaN(video.duration)) return;
    // setProgress((video.currentTime / video.duration) * 100);
  };

  return (
    <div
      onClick={handlePlay}
      style={{ aspectRatio: 16 / 9, width: `calc(100% - 8px)` }}
      className=" flex items-center cursor-pointer "
    >
      <button className="h-full w-full flex justify-center  items-center relative">
        {!playing ? (
          <div className=" h-full w-full flex justify-center items-center z-999  absolute text-white  bg-[rgba(0,0,0,0.3)] ">
            <BsFillPlayFill size={40} />
          </div>
        ) : null}

        <div className="w-full h-full">
          <video
            src={src}
            loop={true}
            onTimeUpdate={onTimeUpdate}
            ref={videoRef}
          />
        </div>
      </button>
    </div>
  );
};

export default Video;
