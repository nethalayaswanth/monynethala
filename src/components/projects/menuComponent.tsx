import { projectsData } from "@/data/projects";
import usePrevious from "@/hooks/usePrevious";
import { getcolor } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Content from "./content";

const variants = {
  enter: (direction: number) => {
    console.log(direction)
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


  const color = getcolor();
  return (
    <div
      id="projects"
      style={{ "--accent": color }}
      className={`grid-screen h-screen overflow-auto mr-[200px]`}
    >
      <div className={`flex flex-start `}>
        <div
          className={`flex flex-col justify-between items-start py-[100px] line border-y-0   `}
        >
          {projectsData.map(({ name }, index) => (
            <div
              key={name}
              className={`h3 text-vertical  text-center p-3 line border-x-0 ${
                active === index ? `text-[var(--accent)]` : ""
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
          <motion.div
            className="absolute top-0 w-full"
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
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
        </div>
      </div>
    </div>
  );
};



export default Menu;
