"use client";

import { clamp } from "@/utils";
import { animate, motion, useMotionTemplate, useSpring } from "framer-motion";

import {
  CSSProperties,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useRef,
  useState,
} from "react";
export type FloatingProps = {
  children?: ReactNode;
  highlightStyle?: CSSProperties;
  style?: CSSProperties;
} & HTMLAttributes<HTMLDivElement>;

export const Floating = ({ children, className, style }: FloatingProps) => {
  const rotateX = useSpring(0);
  const rotateY = useSpring(0);
  const x = useSpring(0);
  const y = useSpring(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseMove = ({
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    const wrapper = wrapperRef.current;
    if (!card || !wrapper) return;
    const wrapperRect = wrapper.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const offsetX = clientX - wrapperRect.left,
      offsetY = clientY - wrapperRect.top;
    const { innerWidth, innerHeight } = window;
    const centerX = offsetX - wrapperRect.width / 2;
    const centerY = offsetY - wrapperRect.height / 2;
   
    x.set(
      Math.sign(centerX) *
        clamp(Math.abs(centerX), 0, wrapperRect.width / 2 - cardRect.width/2)
    );
     y.set(
       Math.sign(centerY) *
         clamp(Math.abs(centerY), 0, wrapperRect.height / 2 - cardRect.height / 2)
     );
    rotateX.set((offsetY - wrapperRect.height / 2) / 10);
    rotateY.set(-(offsetX - wrapperRect.width / 2) / 10);
  };
    
  const handleMouseLeave = ({
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) => {
   
     rotateX.set(0);
     rotateY.set(0);
      x.set(0);
      y.set(0);
    setShow(false);
  };
  const transform = useMotionTemplate`perspective(1000px) translate(${x}px,${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) `;

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`z-[2] h-full w-full  top-0 left-0 flex justify-center items-center `}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${
          className ? className : ""
        } absolute  justify-center items-center`}
        style={{ ...style, transform, transformStyle: "preserve-3d" }}
        ref={ref}
      >
        {children}
      </motion.div>
    </div>
  );
};
