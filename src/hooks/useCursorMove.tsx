"use client";

import { useRef } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayout";
import useLatest from "./useLatest";

export default function useCursor<T extends HTMLDivElement>({
  onMove = (translate: number) => {},
}) {
  const prevCursorOffset = useRef(0);
  const _onMove = useLatest(onMove);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const { clientWidth: screenWidth, clientHeight: screenHeight } =
      document.documentElement;
    const handleMouseMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;

      const { clientX, clientY, pageY, movementY } = e;

      const x = clientX;
      const y = clientY;

      const offset = y - screenHeight / 2;
      const translate = offset - prevCursorOffset.current;

      prevCursorOffset.current = offset;
      _onMove.current(translate);
    };

    document.addEventListener("pointermove", handleMouseMove);

    return () => {
      document.removeEventListener("pointermove", handleMouseMove);
    };
  }, [_onMove]);

}
