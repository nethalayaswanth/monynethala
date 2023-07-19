"use client";

import GridWrapper from "../wrapper/gridWrapper";
import Accordion from "./accordionComponent";

const fillers = { mobile: 0, tablet: 2, desktop: 4 };

const Projects = () => {
  // const { ref, width } = useResizeObserver();

  // useIsomorphicLayoutEffect(() => {
  //   ref(document.documentElement);
  // });

  // return !width ? <Accordion /> : width > 520 ? <Accordion /> : <Menu />;
  return (
    <GridWrapper
      fillers={fillers}
      id="projects"
      className={`grid-screen min-w-[var(--min-width)] w-auto`}
    >
      <div
        style={{
          gridColumn: `content-start/content-end`,
        }}
        className={` grid-card flex justify-stretch   text-base tracking-wide line border-0 border-l-[0.5px] `}
      >
        <Accordion />
      </div>
    </GridWrapper>
  );
};

export default Projects;
