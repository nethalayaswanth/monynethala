'use client'
import {
  useMotionValue,
  useMotionTemplate,
  motion,useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ReactNode, useRef } from "react";

export default function MotionWrapper({
  header,
  gallery,
  projects,
}: {
  header: ReactNode;
  gallery: ReactNode;
  projects: ReactNode;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    offset: ["start end", "start start"],
  });


  const translateY=  useTransform(scrollYProgress,[0,1],[0,  200])
  const scale = useTransform(scrollYProgress, [0, 1], [1,0.8]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

   const transform = useMotionTemplate`translate(0,${translateY}px) scale(${scale})`;
  
  return (
    <div
      ref={containerRef}
      className="w-full  absolute h-full overflow-scroll bg-black"
    >
      <motion.div
        className={`mobile-header text-white  top-0 z-[3] bg-[rgba(0,0,0,0.5)] backdrop-blur-[8px]  text-xl font-semibold flex items-center justify-between h-[60px] fixed w-full   tracking-[-.06em]  p-[12px]`}
      >
        {header}
      </motion.div>

      <motion.div
        style={{ opacity, transform }}
        className="h-[calc(100%-40px)] w-full sticky top-[40px] mt-[40px]   py-[10px] "
      >
        <div className="w-full absolute top-0 z-[1] h-[30px] fade pointer-events-none"></div>
        {gallery}
        <div className="w-full absolute bottom-0 z-[1] h-[30px] fade top pointer-events-none "></div>
      </motion.div>
      <motion.div
        ref={targetRef}
        className="min-h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[20px] sticky top-[60px] z-[2] pt-[40px] flex flex-col text-white"
      >
        {projects}
      </motion.div>
    </div>
  );
}
