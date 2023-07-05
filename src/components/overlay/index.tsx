"use client";

import { OverlayProvider, useOverlayState } from "@/contexts/overlayContext";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { Children, ReactNode, useLayoutEffect, useRef } from "react";

import { usePathname } from "next/navigation";

export const Overlay = ({ children }: { children: ReactNode }) => {
  return <OverlayProvider>{children}</OverlayProvider>;
};

export function StackAnimation({ children }: { children: ReactNode }) {
  const [main] = Children.toArray(children);

  const ref = useRef<HTMLDivElement | null>(null);
  const scrollY = useRef(0);
  const {
    state: { path: modalPath, opened, mount },
    dispatch,
  } = useOverlayState();
  const path = usePathname();

  const progress = useMotionValue(0);
  const opacity = useTransform(progress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(progress, [0.5, 1], [0, 1]);
  const translateX = useTransform(progress, [0, 1], [0, -100]);
  const translateOverlayX = useTransform(progress, [0, 1], [100, 0]);
  const transform = useMotionTemplate`translate(${translateX}%,0)`;
  const transformOverlay = useMotionTemplate`translate(${translateOverlayX}%,0)`;
  useMotionValueEvent(progress, "change", (latest) => {
    console.log(latest);
  });

  useLayoutEffect(() => {
    if (opened && modalPath) {
      if (ref.current) {
        scrollY.current = window.scrollY;
        ref.current.style.top = `${-scrollY.current}px`;
        ref.current.style.position = "fixed";
      }
      // progress.set(1);

      animate(progress, 1, { duration: 1 });
    }
    if (!opened && modalPath) {
      if (!ref.current) return;

      animate(progress, 0, { duration: 1 });
      ref.current.style.position = "relative";
      ref.current.style.top = `0px`;
      window.scrollTo({ top: scrollY.current });
    }
    progress.on("change", (latest) => {
      if (latest === 0) {
        dispatch({ type: "unMount" });
      }
    });
  }, [modalPath, opened, opacity, dispatch, progress]);
  return (
    <>
      <motion.div
        ref={ref}
        className="pointer-events-auto"
        style={{ transform, width: "100%" }}
      >
        {main}
        {/* {cloneElement(main as ReactElement, { key: path })} */}
      </motion.div>
      <motion.div
        id="modal-container"    
        className="flex  z-[1000] top-0 left-0 w-full absolute pointer-events-none  "
      >
        <motion.div
          id="modal-wrapper"
          className="w-full"
          style={{ transform: transformOverlay }}
        ></motion.div>
      </motion.div>
    </>
  );
}
