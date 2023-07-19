
import { RefObject, useCallback, useState } from "react";

import useResizeObserver, { ResizeHandler } from "use-resize-observer";

type Breakpoints = {
  [k: string]: number;
};

const useBreakpoints = <T extends Breakpoints>({
  breakpoints,
  ref,
  defaultValue,
}: {
  breakpoints: T;
  ref?: Element | RefObject<Element> | null | undefined;
  defaultValue?: keyof Breakpoints;
}) => {
  const [breakpoint, setBreakpoint] = useState<keyof T>(
    () => defaultValue ?? Object.keys(breakpoints)[0]
  );
  const observer = useResizeObserver({
    ref,
    onResize: useCallback(
      ({ width }) => {
        if (!width) return;
        const points = Object.entries(breakpoints);
        for (let i = 0; i < points.length; i++) {
          if (width <= points[i][1]) {
            setBreakpoint(points[i][0] as keyof typeof breakpoints);
            break;
          }
        }
      },
      [breakpoints]
    ) as ResizeHandler,
  });

  return { ref: observer.ref, breakpoint };
};

export default useBreakpoints;





