"use client";

import { getcolor } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";

import { Dispatch, SetStateAction } from "react";
import Content from "./content";

type props = {
  name: string;
  tags: string[];
  description: string;
  github?: string;
  demo?: string;
  color?: string;
  image?: string;
  video?: string;
  active: boolean;
  index: number;
  setActive: Dispatch<SetStateAction<number>>;
};

const ProjectCard = ({
  setActive,
  index,name,active,
 ...props
}: props) => {
  const color = getcolor();

  return (
    <motion.div
      onMouseEnter={() => setActive(index)}
      style={{ "--accent": color }}
      className="group flex flex-row h-screen  cursor-pointer overflow-hidden"
    >
      <div
        className={`flex justify-between items-start p-3 pt-[100px] ${
          active ? `text-[var(--accent)]` : ""
        }  `}
      >
        <div className="h3 vertical text-center ">{name}</div>
      </div>
      <div className="w-[476px] h-full">
        <AnimatePresence>
          {active && (
            <motion.div
              className="font-body text-dark-blue text-xs mb-3"
              key={index}
              initial={{ width: 0, opacity: 0, marginRight: 2 }}
              animate={{
                width: "auto",
                opacity: 1,
              }}
              exit={{ width: 0, opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="line h-full  " />
    </motion.div>
  );
};

export default ProjectCard;
