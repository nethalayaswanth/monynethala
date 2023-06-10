"use client";
import useScrollToAnchor from "@/hooks/useScrollAnchor";
import { HTMLAttributes, ReactNode } from "react";


const NavButton = ({
  path,
  children,
  ...props
}: { path: string; children:ReactNode } & HTMLAttributes<HTMLButtonElement>) => {
  const scrollToAnchor = useScrollToAnchor({
    onComplete: () => {
      window.location.hash = path.slice(2);
    },
  });
  return <button {...props} onClick={() => {scrollToAnchor(path.slice(1));}}>{children}</button>;
};

export default NavButton;
