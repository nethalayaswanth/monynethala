"use client";

import { getcolor } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";

import { Dispatch, SetStateAction, useMemo } from "react";
import Content from "./content";
import { ProjectsDataType } from "@/data/projects";

type props = {
  active: boolean;
  index: number;
  vertical?:boolean
  setActive: Dispatch<SetStateAction<number>>;
} & ProjectsDataType;

const ProjectCard = ({ setActive,vertical=false, index, name, active, ...props }: props) => {
  const color = useMemo(() => getcolor(), []);

  return (
    <motion.div
      onMouseEnter={() => setActive(index)}
      layout
      style={{ "--accent": color }}
      className={`group flex    overflow-hidden ${
        vertical ? "flex-col" : "flex-row h-screen  "
      } ${vertical ? "vertical" : ""}`}
    >
      <motion.div 
        layout
        className={`flex  cursor-pointer items-start p-3  ${
          active ? `text-[var(--accent)]` : ""
        } ${
          vertical ? "justify-start" : "justify-between items-start pt-[100px]"
        }  `}
      >
        <div
          className={`h3  text-center  ${vertical ? "" : "text-vertical "} `}
        >
          {name}
        </div>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="font-body text-xs mb-3"
            key={index}
            initial={{
              ...(vertical ? { height: 0 } : { width: 0 }),
              opacity: 0,
            }}
            animate={{
              ...(vertical ? { height: "auto" } : { width: "auto" }),
              opacity: 1,
            }}
            exit={{ ...(vertical ? { height: 0 } : { width: 0 }), opacity: 0 }}
            // transition={{
            //   // x: { type: "spring", stiffness: 300, damping: 30 ,bounce:0},
            //   opacity: { duration: 0.2 },
            // }}
          >
            <div
              className={`${
                vertical ? "w-full" : "w-[476px] h-full pt-[100px] flex "
              }  `}
            >
              <Content
                {...{
                  name,
                  active,
                  index,
                  color,
                  ...props,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`line  ${vertical ? "w-full border-[white]" : "h-full"} `}
      />
    </motion.div>
  );
};

export default ProjectCard;
