"use client";
import React, { CSSProperties, HTMLAttributes, useMemo, useState } from "react";

import { ActiveProvider } from "@/contexts/cardContext";
import { getcolor, isDarkColor, parseRgb } from "@/utils";
import { AnimatePresence, AnimationProps, motion } from "framer-motion";

export type CardProps = {
  layoutId?: string;
  highlightcolor?: string;
  darkTextColor?: string;
  lightTextColor?: string;
  index?: number;
  children?: React.ReactNode;
  highlightStyle?: CSSProperties;
  cardStyle?: CSSProperties;
} & HTMLAttributes<HTMLDivElement> &
  AnimationProps;

const Card = ({
  index = 3,
  layoutId,
  children,
  highlightcolor,
  highlightStyle,
  darkTextColor = "rgb(255,255,255)",
  lightTextColor = "rgb(31,41,55)",
  cardStyle,
  className,
  animate,
  exit,
  initial,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  const color = useMemo(() => highlightcolor ?? getcolor(), [highlightcolor]);

  const textColor = isDarkColor(color) ? darkTextColor : lightTextColor;
  
  console.log(highlightcolor)
  return (
    <motion.div
      layout
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
      initial={initial}
      exit={exit}
      animate={animate}
      className={`card relative  ${className} `}
      style={{
        ...cardStyle,
        ...(isHovered 
          ? {
              color: textColor,
              ["--color-rgb"]: parseRgb(textColor),
              ["--accent"]: color,
            }
          : {
              ["--accent"]: "currentColour",
            }),
      }}
    >
      {/* <AnimatePresence>
        <motion.div
          initial="collapsed"
          animate="open"
          // exit="collapsed"
          // variants={{
          //   open: { opacity: 0 },
          //   collapsed: { opacity: 1 },
          // }}
          // onAnimationComplete={() => {
          //   setMounted(true);
          // }}
          // transition={{ type: "spring", duration: index * 0.4 }}
          className="absolute z-0  h-full w-full   "
          style={{ backgroundColor: color, ...highlightStyle }}
        ></motion.div>
      </AnimatePresence> */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            layoutId={layoutId}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1 },
              collapsed: { opacity: 0 },
            }}
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute z-0  h-full w-full   "
            style={{ backgroundColor: color, ...highlightStyle }}
          ></motion.div>
        )}
      </AnimatePresence>
      <ActiveProvider active={isHovered} color={color}>
        {children}
      </ActiveProvider>
    </motion.div>
  );
};

export default Card;
