import { generateRandomHsv } from "@/utils";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  MotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef ,  ReactNode
} from "react";

type GridItemProps = {
  children: ReactNode;
  col: number;
  row: number;
  y: MotionValue<number>,
  style?: React.CSSProperties;
};

export const GridItem = ({  children,col,row,y ,style }: GridItemProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });


  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  const rotate = useTransform(scrollYProgress, [0, 1], [70, -70]);

  const transform = useMotionTemplate`scale(${scale},${scale}) rotateX(${rotate}deg)`;
  const color=generateRandomHsv()

  return (
    <motion.div
    
      className={"relative "}
      style={{ ...style,backgroundColor:color, gridColumn: col, gridRow: row,transform  }}
      ref={ref}
    >
      {children}
    </motion.div>
  );
};
