'use client'

import { useScroller } from "@/components/sticky";
import { useCallback } from "react";
import { animate, transform } from "framer-motion";
import useLatest from "./useLatest";
const useScrollToAnchor = ({ onComplete }: { onComplete?: () => void }={}) => {
  const onCompleteRef = useLatest(onComplete);
  const { scrollX, x } = useScroller();
  return useCallback(
    (targetAnchor: string) => {
      if (!(typeof window === "undefined")) {
        const hash = targetAnchor;

        const startWithHashRegex = /^#\w+/g;

        if (!startWithHashRegex.test(hash)) {
          return;
        }

        const targetElement = document?.querySelector(`${hash}`) as HTMLElement;

        if (!targetElement) return;

        const elementPosition = targetElement.offsetLeft;
        
        const currentX = x.current;
       
        if (currentX === elementPosition) return
          animate(currentX, elementPosition, {
            onUpdate: (latest) => {
             
              scrollX(latest);
            },
            onComplete: () => {
             
              onCompleteRef.current?.();
            },
            type: "spring",
            bounce: 0,
          });
      }
    },
    [onCompleteRef, scrollX, x]
  );
};

export default useScrollToAnchor;
