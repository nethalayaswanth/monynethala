"use client";

import { Children, ReactNode, useCallback, useRef } from "react";

import useBreakpoints from "@/hooks/useBreakPoint";
import useCursor from "@/hooks/useCursorMove";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayout";
import { generateRandomHsv, mergeRefs } from "@/utils";
import { stagger, transform, useAnimate } from "framer-motion";
import { getPosition,breakpoints,rows } from "./utils";


const Grid = ({ children }: { children: ReactNode }) => {
  const disabled = useRef<boolean>(false);
  const mounted = useRef<boolean>(false);
  const main = useRef<HTMLDivElement | null>(null);
  const nodes = useRef(new Set<HTMLElement>([]));
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();

  const grids = useRef<{
    first: HTMLDivElement | null;
    second: HTMLDivElement | null;
  }>({ first: null, second: null });

  const handleScroll = useCallback(() => {
    const container = main.current;
    const firstgrid = grids.current.first;
    if (!firstgrid || !container) return;
    const y = container.scrollTop;

    const gridHeight = firstgrid.clientHeight;
    const mainHeight = container.scrollHeight;

    if (!disabled.current && gridHeight + y >= mainHeight) {
      // window.scrollTo({ top: 1 });
      container.scrollTop = 1;
      disabled.current = true;
    } else if (y <= 0 && !disabled.current) {
      console.log(mainHeight, gridHeight);
      container.scrollTop = mainHeight - 1 - gridHeight;
      // window.scrollTo({
      //   top: mainHeight - 1 - gridHeight,
      // });
      disabled.current = true;
    }
    if (disabled.current) {
      timeoutId.current = setTimeout(function () {
        disabled.current = false;
      }, 200);
    }

    const animate = () => {
      const container = main.current;

      if (!container) return;
      const y = container.scrollTop;
      const { clientHeight: height, clientWidth: width } = container;
      Object.values(grids.current).forEach((grid, index) => {
        if (!grid) return;

        grid.style.perspective = `1000px`;
        grid.style.perspectiveOrigin = `50% ${
          height / 2 + y - grid.offsetTop
        }px`;
      });

      nodes.current.forEach((node, index) => {
        if (!node) return;
        const top = node.getBoundingClientRect().top;

        if (top <= height && top >= -node.clientHeight) {
          const scale = transform([-node.clientHeight, height], [1, 0.7])(top);
          const rotate = transform(
            [-node.clientHeight, height],
            [-70, 70]
          )(top);
          node.style.transform = `rotateX(${rotate}deg) scale(${scale},${scale})`;
        }
      });
    };

    requestAnimationFrame(() => {
      animate();
    });
  }, []);

  const images = Children.toArray(children);

  useIsomorphicLayoutEffect(() => {
    const container = main.current;

    if (!container) return;
    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const onMove = useCallback((translate: number) => {

    if (typeof window !== "undefined") {
      const container = main.current;

      if (!container) return;
       window.scrollBy({ top: translate });
    }
  }, []);

  useCursor({ onMove });
  const { ref, breakpoint } = useBreakpoints({ breakpoints });

  const [scope, animate] = useAnimate();

  useIsomorphicLayoutEffect(() => {

    try{
       animate(
      ".grid_item",
      { opacity: [0, 1] },
      { delay: stagger(0.1, { from: "center" }), duration: 1, type: "spring" }
    );
    animate(0, 200, {
      onUpdate: (latest) => {
        const container = main.current;
        if (!container) return;
        const scrollBy = transform([0, 100, 200], [0, 200, 0])(latest);
        // window.scrollBy({
        //   top: scrollBy,
        // });
        container.scrollTop += scrollBy;
      },
      type: "spring",
      duration: 10,
    })
    }catch(e){
      
    }
   
  }, []);

  return (
    <>
      <div
        id={"gallery"}
        ref={mergeRefs(main, ref, scope)}
        className="w-full h-screen overflow-y-scroll"
      >
        <div
          className={`w-full  flex overflow-x-hidden  flex-col items-center relative min-h-[100vh]`}
        >
          {images ? (
            <>
              <div
                ref={(node) => {
                  if (node) {
                    grids.current.first = node;
                  }
                }}
                className={`w-full grid px-[16px] `}
                style={{
                  gridTemplateColumns: ` repeat(${rows[breakpoint].cols},1fr)`,
                  gridAutoRows: "minmax(180px,auto)",
                }}
              >
                {images.map((image, index) => {
                  const [row, col] = getPosition(index, breakpoint);

                  return (
                    <div
                      key={`first-${index}`}
                      ref={(node) => {
                        if (node) {
                          nodes.current.add(node);
                        }
                      }}
                      className={" grid_item relative "}
                      style={{
                       
                        gridColumn: col,
                        gridRow: row,
                      }}
                    >
                      {image}
                    </div>
                  );
                })}
              </div>
              <div
                ref={(node) => {
                  if (node) {
                    grids.current.second = node;
                  }
                }}
                key={`second-grid`}
                className={` w-full grid px-[16px] `}
                style={{
                  gridTemplateColumns: ` repeat(${rows[breakpoint].cols},1fr)`,
                  gridAutoRows: "minmax(180px,auto)",
                }}
              >
                {images.map((image, index) => {
                  const [row, col] = getPosition(index, breakpoint);

                  return (
                    <div
                      key={`second-${index}`}
                      ref={(node) => {
                        if (node) {
                          nodes.current.add(node);
                        }
                      }}
                      className={"grid_item relative "}
                      style={{
                       
                        gridColumn: col,
                        gridRow: row,
                      }}
                    >
                      {image}
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Grid;
