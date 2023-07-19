"use client";
import useBreakpoints from "@/hooks/useBreakPoint";

import { ReactNode, useLayoutEffect } from "react";

const breakpoints = { mobile: 540, desktop: Infinity };

export default function ScreenDecider({
  mobile,
  desktop,
}: {
  mobile: ReactNode;
  desktop: ReactNode;
}) {
  const {ref,breakpoint } = useBreakpoints({
    breakpoints,
    defaultValue:'desktop'
  });


  useLayoutEffect(()=>{
    ref(document.documentElement);
  },[ref])

  


   return breakpoint !== "mobile" ?<>{desktop}</>  :<>{mobile}</> ;
}
