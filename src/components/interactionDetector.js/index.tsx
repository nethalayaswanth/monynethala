"use client";
import { ReactNode, useEffect } from "react";

export let userInteracted = false;
export default function InteractionDetector({
  children,
}: {
  children?: ReactNode;
}) {
  useEffect(() => {
    const handler = () => {
      if (!userInteracted) {
        userInteracted = true;
      }
    };
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return <>{children}</>;
}
