"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  CSSProperties,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useLayoutEffect,
  useRef,
} from "react";
import { MouseValueProvider, useMouseValue } from "./context";

export type RotaionWrapperProps = {
  children?: React.ReactNode;
  highlightStyle?: CSSProperties;
  style?: CSSProperties;
} & HTMLAttributes<HTMLDivElement>;

const HoverWrapper = ({ children }: { children: ReactNode }) => {
  const mouseX = useSpring(0);
  const mouseY = useSpring(0);

  const ref = useRef<HTMLDivElement>(null);
  const parentRect = useRef<DOMRect | null>(null);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;
    parentRect.current = container.getBoundingClientRect();
  }, []);
  // useIsomorphicLayoutEffect(() => {
  //   const container = ref.current;
  //   if (!container) return;
  //   const handleMouseMove = (e: MouseEvent) => {
  //     if (!container) return;

  //     parentRect.current = container.getBoundingClientRect();
  //     const { width, height, top, left } = parentRect.current;
  //     const x = e.clientX - left,
  //       y = e.clientY - top;

  //     animate(mouseX, clamp(x, 0, width));
  //     animate(mouseY, clamp(y, 0, height));
  //   };

  //   const handleMouseLeave = (e: MouseEvent) => {
  //     console.log("leave");
  //     animate(mouseX, 0);
  //     animate(mouseY, 0);
  //   };
  //   if (typeof window === "undefined") return;

  //   container.addEventListener("pointermove", handleMouseMove);
  //   container.addEventListener("mouseleave", handleMouseLeave);

  //   return () => {
  //     container.removeEventListener("pointermove", handleMouseMove);
  //     container.removeEventListener("mouseleave", handleMouseLeave);
  //   };
  // }, []);
  return (
    <MouseValueProvider parentRect={parentRect} x={mouseX} y={mouseY}>
      <motion.div ref={ref} className={``}>
        {children}
      </motion.div>
    </MouseValueProvider>
  );
};

// export const RotationWrapper = ({
//   children,
//   className,
//   style,
// }: RotaionWrapperProps) => {
//   const { x, y, parentRect } = useMouseValue();
//   const ref = useRef<HTMLDivElement>(null);
//   const dampen = 10;
//   const rotateY = useTransform<number, number>(x, (x: number) => {
//     const parent = parentRect.current;
//     if (!ref.current || !parent) return 0;
//     const rect = ref.current.getBoundingClientRect();

//     const newRotateY = x + parent.left - rect.left - rect.width / 2;
//     // console.log("x", x, newRotateY);
//     return newRotateY / dampen;
//   });
//   const rotateX = useTransform(y, (y: number) => {
//     const parent = parentRect.current;
//     if (!ref.current || !parent) return 0;
//     const rect = ref.current.getBoundingClientRect();
//     const newRotateX = y + parent.top - rect.top - rect.height / 2;
//       // console.log('y',  y,newRotateX);
//     return -newRotateX / dampen;
//   });
//   return (
//     <div style={{ perspective: "1000px" }} className={`z-[1]  `}>
//       <motion.div
//         className={`${className} w-full h-full`}
//         style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d" }}
//         ref={ref}
//       >
//         {children}
//       </motion.div>
//     </div>
//   );
// };

export const RotationWrapper = ({
  children,
  className,
  style,
}: RotaionWrapperProps) => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
 
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = ({
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) => {
  
    const card = ref.current;
    if (!card) return;
    const { width, height, top, left } = card.getBoundingClientRect();

    const x = clientX - left,
      y = clientY - top;



    rotateX.set((y - height / 2) / 10);
    rotateY.set(-(x - width / 2) / 10);
  };

  const handleMouseLeave = ({
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) => {
    animate(rotateX, 0), animate(rotateY, 0);
  };
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) `;

  return (
    <div className={`z-[1]  `}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${className} w-full h-full`}
        style={{ ...style, transform, transformStyle: "preserve-3d" }}
        ref={ref}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default HoverWrapper;
