"use client";
import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

import { useOverlayState } from "@/contexts/overlayContext";
import { useIsomorphicLayoutEffect } from "framer-motion";

const Portal = ({
  children,
  rootId = "modal-wrapper",
  pathname,
}: {
  children: ReactNode;
  rootId?: string;
  pathname: string;
}) => {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const {
    state: { path: modalPath, opened, mount },
    dispatch,
  } = useOverlayState();

  console.log(modalPath, opened);

  useIsomorphicLayoutEffect(() => {
    setRoot(document.getElementById(rootId));
  }, []);
  const active = modalPath === pathname;
  return root && active && mount ? createPortal(children, root) : null;
};

export default Portal;
