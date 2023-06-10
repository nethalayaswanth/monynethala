"use client";

import useScrollToAnchor from "@/hooks/useScrollAnchor";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

export default function HashNavigation({ children }: { children: ReactNode }) {
  const nextHash = useRef("");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const scrollToAnchor = useScrollToAnchor();
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName !== "A") return;
      const el = e.target as HTMLAnchorElement;
      const id = el.hash.slice(1);
      if (!id) return;
      if (el.origin !== window.location.origin) return;
      if (el.pathname === window.location.pathname) {
        scrollToEl(id);
        return;
      }
      nextHash.current = id;
    };
    scrollToEl(window.location.hash.slice(1));
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (nextHash.current) {
      scrollToEl(nextHash.current);
      nextHash.current = "";
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    scrollToAnchor(hash);
  }, [scrollToAnchor]);

  return <>{children}</>;
}

function scrollToEl(id: string) {
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView();
}
