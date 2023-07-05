"use client";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayout";
import useResizeObserver from "use-resize-observer";
import Accordion from "./accordionComponent";
import Menu from "./menuComponent";

const Projects = () => {
  const { ref, width } = useResizeObserver();

  useIsomorphicLayoutEffect(() => {
    ref(document.documentElement);
  });

  return !width ? <Accordion /> : width > 520 ? <Accordion /> : <Menu />;
};



export default Projects;
