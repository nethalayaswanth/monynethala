"use client";
import useBreakpoints from "@/hooks/useBreakPoint";
import { ReactNode, HTMLAttributes } from "react";
import Card from "../card";

const breakpoints = {
  mobile: 520,
  tablet: 1024,
  desktop: Infinity,
};

const GridWrapper = ({
  children,
  fillers,id,
  className,style
}: {
  children: ReactNode;
  id?:string;
  fillers?: typeof breakpoints;
} & HTMLAttributes<HTMLDivElement>) => {
  
  const { ref, breakpoint } = useBreakpoints({ breakpoints });

  const fillerCount =fillers? fillers[breakpoint]:0;

  return (
    <div
      ref={ref}
      className={`grid-screen grid-layout   ${className} `}
      style={style}
      id={id}
    >
      
      {children}
    </div>
  );
};

export default GridWrapper;
