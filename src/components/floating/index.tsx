"use client";

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

    x.set(offsetX - cardRect.width/2);
    y.set(offsetY - cardRect.height/2);
    rotateX.set((offsetY - wrapperRect.height / 2) / 10);
    rotateY.set(-(offsetX - wrapperRect.width / 2) / 10);
  };

  const handleMouseLeave = ({
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) => {
    animate(rotateX, 0), animate(rotateY, 0);
    setShow(false);
  };
  const transform = useMotionTemplate`perspective(1000px) translate(${x}px,${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) `;

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`z-[2] h-full w-full absolute top-0 left-0  `}
    >
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${className ? className : ""} absolute top-0 left-0`}
          style={{ ...style, transform, transformStyle: "preserve-3d" }}
          ref={ref}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};
