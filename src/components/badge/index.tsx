"use client";
import { ReactNode } from "react";
import Card, { CardProps } from "../card";


const Badge = ({ children,...cardProps }: CardProps) => {
  return (
    <Card
      className="flex-none  "
      highlightStyle={{
        margin: "6px",
        width: `calc(100% - 12px)`,
        height: `calc(100% - 12px)`,
      }}
      {...cardProps}
    >
      <div
        className={`uppercase flex flex-row cursor-pointer items-center m-[0.375rem]  pt-[0.3125rem] pb-[0.25rem] px-[0.25rem] font-bold leading-[1.01] tracking-[-.04em] text-[0.875rem] border border-solid border-[var(--accent,currentcolor)]  relative z-[2]  select-none transition-colors  `}
      >
        {children}
      </div>
    </Card>
  );
};



export const NavBadge = ({ children, ...cardProps }: CardProps) => {
  return (
    <Card className="flex justify-center " {...cardProps}>
      <div
        className={`uppercase flex flex-row justify-center cursor-pointer items-center m-[0.375rem]  pt-[0.3125rem] pb-[0.25rem] px-[0.25rem] font-bold leading-[1.01] tracking-[-.04em] text-[0.875rem]   relative z-[2]  select-none transition-colors  `}
      >
        {children}
      </div>
    </Card>
  );
};

export default Badge;
