"use client";
import { projectsData } from "@/data/projects";
import { LayoutGroup } from "framer-motion";
import { useState } from "react";
import ProjectCard from "./projectCard";

const fillers = { mobile: 0, tablet: 2, desktop: 4 };

const Accordion = ({ vertical = false }: { vertical?: boolean }) => {
  const [active, setActive] = useState<number>(0);

  return (
    <LayoutGroup>
      {projectsData.map(
        ({ name, description, github, content, demo, tags, npm }, index) => (
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
              npm,
              tags,
              vertical,
            }}
          />
        )
      )}
    </LayoutGroup>
  );
};

export default Accordion;
