"use client";

import { getcolor } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";

import { Dispatch, SetStateAction, useMemo } from "react";
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

const ProjectCard = ({ setActive, index, name, active, ...props }: props) => {
  const color = useMemo(() => getcolor(), []);
 
  return (
    <motion.div
      onMouseEnter={() => setActive(index)}
      layout
      style={{ "--accent": color }}
      className="group flex flex-row h-screen   overflow-hidden"
    >
      <motion.div
        layout
        className={`flex justify-between cursor-pointer items-start p-3 pt-[100px] ${
          active ? `text-[var(--accent)]` : ""
        }  `}
      >
        <div className="h3 vertical text-center ">{name}</div>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="font-body text-black text-xs mb-3"
            key={index}
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: "auto",
              opacity: 1,
            }}
            exit={{ width: 0, opacity: 0 }}
            // transition={{
            //   // x: { type: "spring", stiffness: 300, damping: 30 ,bounce:0},
            //   opacity: { duration: 0.2 },
            // }}
          >
            <div className="w-[476px] h-full">
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

      <div className="line h-full  " />
    </motion.div>
  );
};

export default ProjectCard;
