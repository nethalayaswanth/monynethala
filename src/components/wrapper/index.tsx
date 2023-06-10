import { generateRandomHsv } from "@/utils";
import Bars from "../bars";
import Card from "../card";
import { ReactNode } from "react";

const Wrapper = ({children}:{children:ReactNode}) => {
  return (
    <div className=" w-full tech-grid  font-noto duration-150 ease-linear  ">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={` grid-card flex justify-stretch  text-noto text-base tracking-wide    line`}
          >
            <Card className="flex-1" layoutId="floating" />
          </div>
        ))}
      <div
        style={{
          gridColumn: `2/7`,
          gridRow: `1/span 3`,
        }}
        className={` grid-card flex justify-stretch  text-noto text-base tracking-wide    line`}
      >
        {children}
      </div>
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={` grid-card h-[40px] flex justify-stretch  text-noto text-base tracking-wide   line`}
          >
            <Card className="flex-1" layoutId="floating" />
          </div>
        ))}
    </div>
  );
};

export default Wrapper;
