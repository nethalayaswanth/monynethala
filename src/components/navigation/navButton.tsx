"use client";
import { useOverlayDispatch } from "@/contexts/overlayContext";
import useScrollToAnchor from "@/hooks/useScrollAnchor";
import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";


const NavButton = ({
  path,
  children,
  ...props
}: { path: string; children:ReactNode } & HTMLAttributes<HTMLButtonElement>) => {

  const hashNavigation = /^#/i.test(path.slice(1));
  const scrollToAnchor = useScrollToAnchor({
    onComplete: () => {
      window.location.hash = path.slice(2);
    },
  });

  const dispatch =useOverlayDispatch()
  return hashNavigation ? (
    <button
      {...props}
      onClick={() => {
        scrollToAnchor(path.slice(1));
      }}
    >
      {children}
    </button>
  ) : (
    <Link
     
      href={path}
    >
      {children}
    </Link>
  );
};

export default NavButton;
