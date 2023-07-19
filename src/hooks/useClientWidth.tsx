import { RefObject, useCallback, useLayoutEffect, useState } from "react";

import useResizeObserver, { ResizeHandler } from "use-resize-observer";

type Breakpoints = number[]

const useClientWidth =<T extends Breakpoints> ({
  breakpoints,
  ref,
  defaultValue,
}: {
  breakpoints:T;
  ref?: Element | RefObject<Element> | null | undefined;
  defaultValue?: number;
}) => {
  const [width, setWidth] = useState<number>(document.documentElement.clientWidth);
  const { ref: observerRef } = useResizeObserver({
    ref,
    onResize: useCallback(
      ({ width }) => {
        if (!width) return;
          for (let i = 0; i < breakpoints.length; i++) {
            if (width <= breakpoints[i]) {
              setWidth(breakpoints[i]);
              break;
            }
          }
        setWidth(width);
      },
      [breakpoints]
    ) as ResizeHandler,
  });

  useLayoutEffect(() => {
    observerRef(document.documentElement);
  }, [observerRef]);

  return width;
};

export default useClientWidth;
