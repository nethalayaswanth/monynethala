"use client"

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayout";
import React, { useCallback, useRef, useState } from "react";
type Props = {
  src: string;
};

const Video = ({ src }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const handlePlayVideo =useCallback (() =>{
    if(videoRef.current){
 console.log("play");
    videoRef.current.play()
}},[]);

useIsomorphicLayoutEffect(() => {
 
  handlePlayVideo();
}, [handlePlayVideo]);
  const onTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (isNaN(e.target.duration)) return;
    setProgress((e.target.currentTime / e.target.duration) * 100);
  };

  return <video src={src} loop={true} onTimeUpdate={onTimeUpdate} ref={videoRef} />;
};

export default Video