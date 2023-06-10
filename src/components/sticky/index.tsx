"use client";

import {
  MutableRefObject,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import { getcolor, mergeRefs } from "@/utils";

import useResizeObserver from "use-resize-observer";
import Close from "../button/close";
import styles from "./sticky.module.css";

type fn = (x: number) => void;
const noop = () => {};

type Props = {
  scrollX: (newScrollX: number) => void;
  scrollY: (newScrollY: number) => void;
  scroll?: (distance: any) => Promise<unknown>;
  x: MutableRefObject<number>;
  y: MutableRefObject<number>;
};

const Context = createContext<Props>({
  scrollX: noop,
  scrollY: noop,
  x: { current: 0 },
  y: { current: 0 },
});

const Sticky = ({
  children,
  showProgress = true,
}: {
  children: ReactNode;
  showProgress?: boolean;
}) => {
  const scrollYContainer = useRef<HTMLDivElement | null>(null);
  const stickyContainer = useRef<HTMLDivElement | null>(null);
  const scrollXContainer = useRef<HTMLDivElement | null>(null);
  const scrollYContent = useRef<number>();
  const scrollXContent = useRef<HTMLDivElement | null>(null);
  const isHorizontal = useRef<boolean>();
  const isTouch = useRef();
  const forcedScroll = useRef(false);
  const minScrollX = useRef(0);
  const maxScrollX = useRef<number>(0);
  const maxScrollY = useRef<number>(0);
  const minScrollY = useRef(0);
  const scrollX = useRef(0);
  const scrollY = useRef(0);
  const minProgress = useRef<number>();

  const updateProgress = useCallback(() => {
    if (!scrollYContainer.current) return;

    const t =
      maxScrollX.current === 0
        ? 0
        : Math.max(
            0,
            Math.abs(Math.round(scrollX.current) / maxScrollX.current)
          );

    scrollYContainer.current.style.setProperty("--scroll-progress", `${t}`);
  }, []);

  const scrollXTo = useCallback(
    (newScrollX: number) => {
      if (!scrollYContainer.current || !scrollXContainer.current) return;
      forcedScroll.current = true;
      const boundedScrollX = Math.min(newScrollX, maxScrollX.current);

      scrollX.current = boundedScrollX;

      scrollY.current =
        maxScrollX.current === 0
          ? 0
          : ((boundedScrollX - minScrollX.current) * maxScrollY.current) /
            maxScrollX.current;
      // console.log(newScrollY, boundedScrollY,scrollX.current);
     
      scrollXContainer.current.scrollLeft = scrollX.current;
      scrollYContainer.current.scrollTop = scrollY.current;
      console.log(newScrollX, maxScrollX.current);
      updateProgress();
    },
    [updateProgress]
  );
  const scrollYTo = useCallback(
    (newScrollY: number) => {
      if (!scrollYContainer.current || !scrollXContainer.current) return;
      forcedScroll.current = true;
      const boundedScrollY = Math.min(newScrollY, maxScrollY.current);

      scrollY.current = boundedScrollY;

      scrollX.current =
        maxScrollX.current === 0
          ? 0
          : ((boundedScrollY - minScrollY.current) * maxScrollX.current) /
            maxScrollY.current;
      // console.log(newScrollY, boundedScrollY,scrollX.current);
        
       
        scrollXContainer.current.scrollLeft = scrollX.current;
        scrollYContainer.current.scrollTop = scrollY.current;

      console.log('y');
      updateProgress();
    },
    [updateProgress]
  );

  const scrollBy = useCallback(
    (distance: number) => {
      return new Promise((resolve) => {
        const newScrollY = Math.max(scrollY.current + distance, 0);

        scrollYTo(newScrollY);

        resolve(true);
      });
    },
    [scrollYTo]
  );

  const onScrollY = useCallback(
    async (x: Event) => {
    
      if (forcedScroll.current) {
        console.log(`%cy`, "color:orange");
        forcedScroll.current = false;
        return;
      }
        
      if (!scrollYContainer.current) return;
      const y = scrollYContainer.current.scrollTop;
      if (
        y < Math.round(minScrollY.current) ||
        y >= Math.round(maxScrollY.current)
      ) {
        // const distance = scrollYContainer.current.scrollTop - scrollY.current;
        scrollY.current = y;
        return;
      }

      isHorizontal.current = false;
      const distance = y - scrollY.current;

      await scrollBy(distance);
    },
    [scrollBy]
  );

  const onScrollX = useCallback(
    async (x: Event) => {
      console.log(`%cx`, "color:green", forcedScroll.current);
      if (forcedScroll.current) {
        return;
      }
      
      if (!scrollYContainer.current || !scrollXContainer.current) return;
      const y = scrollYContainer.current.scrollTop;

      const scrollLeft = scrollXContainer.current.scrollLeft;

      if (
        scrollLeft < 0 ||
        scrollLeft >= Math.round(maxScrollX.current) ||
        y < Math.round(minScrollY.current) ||
        y >= Math.round(maxScrollY.current)
      ) {
        return;
      }
      x.preventDefault();

      const distance = scrollLeft - scrollX.current;

      await scrollBy(distance);
    },
    [scrollBy]
  );

  const onMousewheel = useCallback(
    async (t: WheelEvent) => {
      if (!scrollYContainer.current) return;

      const y = scrollYContainer.current.scrollTop;

      if (
        y < Math.round(minScrollY.current) ||
        y >= Math.round(maxScrollY.current)
      ) {
        scrollY.current = y;

        return;
      }

      t.preventDefault();
      console.log(`%cwheel`, "color:red");
      const deltaX = t.deltaX;
      const deltaY = t.deltaY;
      isHorizontal.current = Math.abs(deltaX) > Math.abs(deltaY);

      if (isHorizontal.current && deltaX) {
        await scrollBy(deltaX);
      } else {
        await scrollBy(deltaY);
      }
    },
    [scrollBy]
  );

  const onKeyDown = useCallback(
    (t: KeyboardEvent) => {
      if (t.ctrlKey || t.metaKey || t.altKey) {
        return;
      }

      const isLeftArrow = t.key === "37";
      const isRightArrow = t.key === "39";
      const isUpArrow = t.key === "38";
      const isDownArrow = t.key === "40";

      isHorizontal.current =
        isUpArrow || isDownArrow || isLeftArrow || isRightArrow;
      if (!isHorizontal.current) {
        return;
      }

      const direction = isLeftArrow || isUpArrow ? -1 : 1;
      scrollBy(100 * direction);
    },
    [scrollBy]
  );

  const updateScrollDimensions = useCallback(() => {
    // return new Promise((resolve, reject) => {
    const sticky = stickyContainer.current;
    // const contentX = scrollXContent.current;
    const scrollContainerX = scrollXContainer.current;
    if (!sticky || !scrollContainerX) return;
    const { width: screenWidth, height: screenHeight } = window.screen;

    const contentWidth = scrollContainerX.scrollWidth;
    maxScrollX.current = contentWidth - screenWidth;

    const contentHeight = (contentWidth / screenWidth) * screenHeight;

    const isHorizontalScrollDisabled = maxScrollX.current <= 0;

    const scrollHeight = `${contentHeight}px`;

    sticky.style.setProperty("--scrollY-height", scrollHeight);

    requestAnimationFrame(() => {
      const scrollbarHeight = Math.max(
        10,
        scrollContainerX.offsetHeight - scrollContainerX.clientHeight
      );

      minScrollY.current = sticky.offsetTop;
      maxScrollY.current = minScrollY.current + contentHeight - screenHeight;
      console.log(maxScrollX.current, maxScrollY.current, minScrollY.current);
      sticky.style.setProperty("--scrollbar-height", `${scrollbarHeight}px`);

      // });
    });
  }, []);

  const { ref } = useResizeObserver({
    onResize: () => {
      updateScrollDimensions();
    },
  });
  useLayoutEffect(() => {
    const scrollContainerX = scrollXContainer.current;
    const scrollContainerY = scrollYContainer.current;
    const sticky = stickyContainer.current;
    if (!scrollContainerX || !scrollContainerY || !sticky) return;
    updateScrollDimensions();
    scrollContainerY.addEventListener("scroll", onScrollY, {
      passive: false,
    });
    scrollContainerX.addEventListener("scroll", onScrollX, { passive: false });

    sticky.addEventListener("wheel", onMousewheel, {
      passive: false,
    });
    sticky.addEventListener("keydown", onKeyDown);

    return () => {
      scrollContainerX.removeEventListener("scroll", onScrollX);
      scrollContainerY.removeEventListener("scroll", onScrollY);
      sticky.removeEventListener("wheel", onMousewheel);
      sticky.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown, onMousewheel, onScrollX, onScrollY, updateScrollDimensions]);

  const color = getcolor();
  const props = useMemo(
    () => ({
      scrollX: scrollXTo,
      scrollY: scrollYTo,
      scrollBy,
      x: scrollX,
      y: scrollY,
    }),
    [scrollBy, scrollXTo, scrollYTo]
  );

  return (
    <Context.Provider value={props}>
      <div
        ref={mergeRefs(scrollYContainer, ref)}
        className={styles["scroll_container-y"]}
      >
        <div ref={stickyContainer} className={styles["scroll_content-y"]}>
          <div className={styles["scroll_container-x-crop"]}>
            <div
              id="scroll-x"
              ref={scrollXContainer}
              className={styles["scroll_container-x"]}
            >
              <div ref={scrollXContent} className={styles["scroll_content-x"]}>
                <div className={styles["scrolling_content"]}>{children}</div>
              </div>
            </div>
          </div>
        </div>
        {showProgress && (
          <div
            className={`fixed right-[25px] left-[25px] bottom-[25px] flex flex-row-reverse items-center justify-between max-w-[980px] my-0 mx-auto `}
          >
            <div id="close" className={`pointer-events-auto flex`}>
              <Close highlightcolor={color} />
            </div>
            <div id="progress-container" className="mr-[28px] flex-1 h-[2px] ">
              <div
                id="progress"
                style={{
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(90deg,${color} ,${color} calc(var(--scroll-progress)*100%),#b1b1b1 calc(var(--scroll-progress)*100%),#b1b1b1)`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </Context.Provider>
  );
};

export function useScroller() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useScroller must be used within a ActiveProvider");
  }
  return context;
}

export default Sticky;
