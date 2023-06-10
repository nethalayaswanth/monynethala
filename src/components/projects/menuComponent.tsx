import { useState } from "react";
import { projectsData } from "@/data/projects";
import Content from "./content";
import { AnimatePresence, motion } from "framer-motion";
import { getcolor } from "@/utils";
import usePrevious from "@/hooks/usePrevious";

const variants = {
  enter: (direction: number) => {
    return {
      y: direction > 0 ? 100 : -100,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      y: direction < 0 ? 100 : -100,
      opacity: 0,
    };
  },
};
const Menu = () => {
  const [active, setActive] = useState<number>(0);
  const prevActive =   usePrevious(active)

  const direction =!prevActive?1:Math.sign(active-prevActive); 

  console.log(direction)
  const color = getcolor();
  return (
    <div
      id="projects"
      className={`grid-screen h-screen overflow-auto mr-[200px]`}
    >
      <div className={`flex flex-start `}>
        <div
          className={`flex flex-col justify-between items-start py-[100px] line border-y-0   `}
        >
          {projectsData.map(({ name }, index) => (
            <div
              key={name}
              className={`h3 vertical  text-center p-3 line border-x-0 ${
                active ? `text-[var(--accent)]` : ""
              }`}
              onClick={() => {
                setActive(index);
              }}
            >
              {name}
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col relative ">
          <AnimatePresence  custom={direction}>
            <motion.div
              className="absolute top-0 w-full"
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: "tween",duration:8 },
                opacity: { duration: 0.2 },
              }}
            >
              <Content
                {...{
                  color,
                  ...projectsData[active],
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};



export default Menu;
