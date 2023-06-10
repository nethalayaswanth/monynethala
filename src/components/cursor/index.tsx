import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayout";
import useLatest from "@/hooks/useLatest";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

export const Cursor = ({ onMove = (translate: number) => {} }) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const prevCursorOffset = useRef(0);
  const _onMove = useLatest(onMove);
  const cursor = useMotionValue({ x: 0, y: 0, visibility: "hidden" });

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined" || !cursorRef.current) return;

    const { clientWidth, clientHeight } = cursorRef.current;
    const { clientWidth: screenWidth, clientHeight: screenHeight } =
      document.documentElement;
    const handleMouseMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!cursorRef.current) return;
      const { clientX, clientY, pageY, movementY } = e;

      const x = clientX  - clientWidth / 2;
      const y = clientY - clientHeight / 2;
      const visibility =
        x > 0 && clientX < screenWidth && y > 0 && clientY < screenHeight
          ? "visible"
          : "hidden";

          console.log(x,y)

      cursor.set({ x, y, visibility });

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

  const transform = useTransform(
    cursor,
    (latest) => `translate(${latest.x}px,${latest.y}px)`
  );
  const visibility = useTransform(cursor, (latest) => latest.visibility);

  return (
    <motion.div
      ref={cursorRef}
      style={{ transform, visibility }}
      className={`z-[1000] rounded-full w-[40px] h-[40px] pointer-events-none border-solid border border-black  fixed top-0 left-0 invisible `}
    ></motion.div>
  );
};
