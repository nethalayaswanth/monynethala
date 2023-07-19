"use client";

import { mergeRefs } from "@/utils";
import {
  animate,
  clamp,
  motion,
  MotionValue,
  useMotionValue,
} from "framer-motion";
import {
  cloneElement,
  forwardRef,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import useResizeObserver from "use-resize-observer";
import "./styles.css";
import { detectSwipeDirection, filterChildren } from "./utils";

export type CarouselProps = {};
export type Node = {
  node: HTMLDivElement;
  key: string;
  span: number;
};

export type CarouselHandle = {
  panLeft: () => void;
  panRight: () => void;
  activeIndex: MutableRefObject<number>;
  isDragging: MutableRefObject<boolean>;
  progress: MotionValue<number>;
  x: MotionValue<number>;
};

export type Nodes = { [key: string]: Node };

export const Carousel = forwardRef<
  CarouselHandle,
  PropsWithChildren<Partial<CarouselProps>>
>((props, carouselRef) => {
  const { children } = props;
  const childItems = useMemo(
    () => filterChildren(children, "CarouselItem"),
    [children]
  );

  const childNodes = useRef(new Set<HTMLDivElement>());

  const setNodes = (node: HTMLDivElement) => {
    childNodes.current.add(node);
  };

  const x = useMotionValue(0);
  const progress = useMotionValue(0);
  const lastPointer = useRef(0);
  const lastPointerY = useRef(0);
  const swipeDistance = useRef(0);
  const overShootingDistance = useRef(0);
  const maxScroll = useRef(0);
  const isDragging = useRef(false);
  const isOverThresold = useRef(false);
  const scrollingDirection = useRef(0);
  const intervalPoints = useRef<number[]>([]);
  const overShooting = useRef(0);
  const containerRect = useRef<{
    containerScrollWidth: number;
    width: number;
    height: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
    x: number;
    y: number;
  }>({
    containerScrollWidth: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    x: 0,
    y: 0,
  });

  const activeIndex = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const doInitialMeaurements = useCallback(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;
    const { width, height, top, left, right, bottom, x, y } =
      container.getBoundingClientRect();
    const containerWidth = width;
    const containerScrollWidth = wrapper.scrollWidth;

    containerRect.current = {
      width,
      height,
      top,
      left,
      right,
      bottom,
      x,
      y,
      containerScrollWidth,
    };

    for (let i = 0; i < childNodes.current.size; i++) {
      intervalPoints.current.push((i * width) / childNodes.current.size);
    }
    intervalPoints.current.push(width);

    maxScroll.current = Math.abs(containerWidth - containerScrollWidth);
  }, []);

  const setActiveSlide = useCallback(() => {
    const currentX = x.get();
    const prevX = x.getPrevious();
    const direction = scrollingDirection.current;
    const panVelocity = x.getVelocity();
    let newX, active;
    const nodeOffsets = [...childNodes.current].map((node) => [
      node.offsetLeft,
      node.offsetWidth,
    ]);

    const passedVelocityThresold = Math.abs(panVelocity) / 10 > 3;

    for (
      let i = 0, j = nodeOffsets.length - 1;
      i < nodeOffsets.length && j >= 0;
      i++, j--
    ) {
      let offset;

      if (direction < 0 && -1 * currentX < (offset = nodeOffsets[i][0])) {
        active = i;
        if (
          !passedVelocityThresold &&
          -1 * currentX < nodeOffsets[i - 1][0] + nodeOffsets[i - 1][1] / 2
        ) {
          offset = nodeOffsets[i - 1][0];
          active = i - 1;
        }
        newX = Math.min(offset, maxScroll.current);

        break;
      } else if (
        direction > 0 &&
        -1 * currentX > (offset = nodeOffsets[j][0])
      ) {
        active = j;
        if (
          !passedVelocityThresold &&
          -1 * currentX > nodeOffsets[j + 1][0] - nodeOffsets[j][1] / 2
        ) {
          (offset = nodeOffsets[j + 1][0]), (active = j + 1);
        }
        newX = offset;
        break;
      }
    }

    if (active) activeIndex.current = active;
    if (newX !== undefined) {
      animate(x, -newX, {
        velocity: panVelocity / 30,
        type: "spring",
        bounce: 0,
      });
      animate(progress, clamp(Math.abs(newX / maxScroll.current), 0, 1));
    }
  }, [progress, x]);

  const startPanning = useCallback(
    (x: number, y: number) => {
      lastPointer.current = x;
      lastPointerY.current = y;

      doInitialMeaurements();
    },
    [doInitialMeaurements]
  );

  const stopPanning = useCallback((x?: number) => {
    if (x) lastPointer.current = x;
    isDragging.current = false;
    isOverThresold.current = false;
    swipeDistance.current = 0;
    overShootingDistance.current = 0;
  }, []);

  const pan = useCallback(
    (pan: number, elasticConstant = 0.55) => {
      const prevProgress = progress.get();
      const prevX = x.get();
      overShooting.current = 0;

      let currentX = prevX + pan;
      const { width } = containerRect.current;

      const rubberbandValue = (x: number, d: number) =>
        (1 - 1 / ((x * elasticConstant) / d + 1)) * d;

      if (currentX > 0 || currentX < -1 * maxScroll.current) {
        overShooting.current = currentX > 0 ? -1 : 1;
        overShootingDistance.current += pan;
        const ox = Math.abs(overShootingDistance.current);
        currentX =
          currentX > 0
            ? Math.sign(currentX) * rubberbandValue(ox, width)
            : -1 * maxScroll.current +
              Math.sign(currentX) * rubberbandValue(ox, width);
      } else {
        overShootingDistance.current = 0;
      }
      const direction = Math.sign(currentX - prevX);
      if (direction) {
        {
          scrollingDirection.current = direction;
        }
      }

      x.set(currentX);
      progress.set(clamp(Math.abs(currentX / maxScroll.current), 0, 1));
    },
    [progress, x]
  );

  const handlePanning = useCallback(
    (
      clientX: number,
      clientY: number,
      e: MouseEvent | TouchEvent | WheelEvent
    ) => {
      let deltaX = clientX - lastPointer.current;
      let deltaY = clientY - lastPointerY.current;

      isDragging.current = true;
      const drag = () => {
        e.preventDefault();
        lastPointer.current = clientX;
        lastPointerY.current = clientY;
        swipeDistance.current += deltaX;
        pan(deltaX);
      };
      if (isOverThresold.current) {
        drag();
        return;
      }

      const direction = detectSwipeDirection(deltaX, deltaY, 8);


      if (direction === "left" || direction === "right") {
        e.stopPropagation();
        isOverThresold.current = true;
        drag();
      }
    },
    [pan]
  );

  const handlePointUp = useCallback(
    (clientX?: number) => {
      if (overShooting.current !== 0) {
        animate(x, overShooting.current === -1 ? 0 : -1 * maxScroll.current, {
          type: "spring",
          bounce: 0,
        });
      }
      stopPanning(clientX);
      setActiveSlide();
    },
    [x, setActiveSlide, stopPanning]
  );

  const panLeft = useCallback(() => {
    if (activeIndex.current === 0) return;
    activeIndex.current -= 1;
    const offset = [...childNodes.current][activeIndex.current].offsetLeft;
    const newX = -1 * Math.min(offset, maxScroll.current);
    animate(x, newX, {
      type: "spring",
      bounce: 0,
    });
    animate(progress, clamp(Math.abs(newX / maxScroll.current), 0, 1));
  }, [x, progress]);

  const panRight = useCallback(() => {
    if (activeIndex.current === childNodes.current.size - 1) return;
    activeIndex.current += 1;
    const offset = [...childNodes.current][activeIndex.current].offsetLeft;
    const newX = -1 * Math.min(offset, maxScroll.current);
    animate(x, newX, {
      type: "spring",
      bounce: 0,
    });
    animate(progress, clamp(Math.abs(newX / maxScroll.current), 0, 1));
  }, [x, progress]);

  const panOnHover = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      const active = activeIndex.current;

      if (!container) return;
      const { left } = container.getBoundingClientRect();

      const tx = clientX - left;

      const offsets: number[] = [];
      const points = intervalPoints.current;

      for (const node of childNodes.current) {
        offsets.push(node.offsetLeft);
      }

      let offset;
      for (let i = 0; i < points.length - 1; i++) {
        if (tx >= points[i] && tx < points[i + 1]) {
          activeIndex.current = i;

          offset = offsets[i];
          break;
        }
      }

      if (offset !== undefined && active !== activeIndex.current) {
        const newX = -1 * Math.min(offset, maxScroll.current);

        animate(x, newX, {
          type: "spring",
          stiffness: 50,
          mass: 0.5,
          bounce: 0,
        });
      }
      return;
    },
    [x]
  );
  const setupPanSupport = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelTimeout: ReturnType<typeof setTimeout>;

    const onTouchStart = (e: TouchEvent) => {
    
      var touch = e.touches[0];
      startPanning(touch.clientX, touch.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
    
      var touch = e.touches[0];
      handlePanning(touch.clientX, touch.clientY, e);
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!e.touches[0]) {
        var touch = e.changedTouches[0];
       
        handlePointUp(touch.clientX);
      }
    };

    const onTouchCancel = (e: TouchEvent) => {
     
      if (!e.touches[0]) {
        var touch = e.changedTouches[0];
        handlePointUp(touch.clientX);
      }
    };
    const onMouseDown = (e: MouseEvent) => {
    
      startPanning(e.clientX, e.clientY);
    };
    const onMouseMove = (e: MouseEvent) => {
    
      if (isDragging.current) {
       
        handlePanning(e.clientX, e.clientY, e);
        return;
      }
      panOnHover(e.clientX);
    };
    const onMouseUp = (e: MouseEvent) => {
    
      handlePointUp(e.clientX);
    };
    const onMouseLeave = (e: MouseEvent) => {
      
      handlePointUp();
    
    };

    const clearWheelTimeout = () => {
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
    };
    const onWheel = (e: WheelEvent) => {
      clearWheelTimeout();
      wheelTimeout = setTimeout(() => {
        handlePointUp();
      }, 200);

      // e.stopPropagation();
      // if (!isDragging.current) doInitialMeaurements();
     
      isDragging.current = true;
      const drag = () => {
        e.preventDefault();
        swipeDistance.current += e.deltaX;
        pan(-1 * e.deltaX);
      };
      if (isOverThresold.current) {
        drag();
        return;
      }
      const direction = detectSwipeDirection(-1 * e.deltaX, -1 * e.deltaY, 1);
     
      if (direction === "left" || direction === "right") {
        e.stopPropagation();
        isOverThresold.current = true;
        drag();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === "37") {
      } else if (e.key === "39") {
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === "37") {
        panLeft();
      } else if (e.key === "39") {
        panRight();
      }
    };

    container.addEventListener("touchstart", onTouchStart, false);

    container.addEventListener("touchmove", onTouchMove, false);

    container.addEventListener("touchend", onTouchEnd, false);

    container.addEventListener("touchcancel", onTouchCancel, false);

    container.addEventListener("mousedown", onMouseDown, false);

    container.addEventListener("mousemove", onMouseMove, false);

    container.addEventListener("mouseup", onMouseUp, false);

    container.addEventListener("mouseleave", onMouseLeave, false);

    container.addEventListener("wheel", onWheel);
    container.addEventListener("keydown", onKeyDown);
    container.addEventListener("keyup", onKeyUp);

    return () => {
      container.removeEventListener("touchstart", onTouchStart, false);

      container.removeEventListener("touchmove", onTouchMove, false);

      container.removeEventListener("touchend", onTouchEnd, false);

      container.removeEventListener("touchcancel", onTouchCancel, false);

      container.removeEventListener("mousedown", onMouseDown, false);

      container.removeEventListener("mousemove", onMouseMove, false);

      container.removeEventListener("mouseup", onMouseUp, false);

      container.removeEventListener("mouseleave", onMouseLeave, false);
      clearWheelTimeout();
      container.removeEventListener("wheel", onWheel, false);
    };
  }, [
    startPanning,
    handlePanning,
    handlePointUp,
    panOnHover,
    pan,
    panLeft,
    panRight,
  ]);

  useLayoutEffect(() => {
    doInitialMeaurements();
    const removePanSupport = setupPanSupport();

    return () => {
      removePanSupport?.();
    };
  }, [doInitialMeaurements, setupPanSupport]);

  const { ref } = useResizeObserver({
    onResize: () => {
      doInitialMeaurements();
    },
  });

  useImperativeHandle(carouselRef, () => ({
    panLeft,
    panRight,
    activeIndex,
    isDragging,
    progress,
    x,
  }));

  function renderSlides() {
    return childItems.map((child, index) => {
      return cloneElement(child, {
        setNodes,
      });
    });
  }

  return (
    <div ref={containerRef} className="carousel carousel-container">
      <motion.div
        ref={mergeRefs(wrapperRef, ref)}
        style={{ x }}
        className="carousel-wrapper "
      >
        {renderSlides()}
      </motion.div>
    </div>
  );
});

Carousel.displayName = "Carousel";

export default Carousel;
