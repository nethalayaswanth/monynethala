import { useState } from "react";
import GridWrapper from "../wrapper/gridWrapper";
import ProjectCard from "./projectCard";
import { projectsData } from "@/data/projects";
import { LayoutGroup } from "framer-motion";

const fillers = { mobile: 0, tablet: 2, desktop: 4 };
  const Accordion = () => {
  const [active, setActive] = useState<number>(0);

  return (
    <GridWrapper
      fillers={fillers}
      id="projects"
      className={`grid-screen min-w-[var(--min-width)] w-auto`}
    >
      <div
        style={{
          gridColumn: `content-start/content-end`,
          // gridRow: `1/auto`,
        }}
        className={` grid-card flex justify-stretch   text-base tracking-wide line border-0 border-l-[0.5px]`}
      >
        <LayoutGroup>
          {projectsData.map(
            (
              { name, description, github, content, demo, tags },
              index
            ) => (
              <ProjectCard
                key={index}
                {...{
                  name,
                  active: active === index,
                  setActive,
                  index,
                  description,
                  github,
                  content,
                  demo,
                  tags,
                }}
              />
            )
          )}
        </LayoutGroup>
      </div>
    </GridWrapper>
  );
};


export default Accordion;