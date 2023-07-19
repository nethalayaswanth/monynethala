"use client";


import { IoMdCloseCircle } from "react-icons/io";
import Card, { CardProps } from "../card";

const Close = ({ onClick, className, ...cardProps }: CardProps) => {
  return (
    <Card
      className={`flex-grow-0 rounded-full ${className ? className : ""} `}
      style={{}}
      highlightStyle={{
        borderRadius: "50%",
      }}
      {...cardProps}
    >
      <div
        className={`uppercase  flex flex-row items-center cursor-pointer  font-bold rounded-full border border-solid border-[var(--accent,currentcolor)]  relative z-[2]  select-none transition-colors  `}
      >
        <IoMdCloseCircle size={32} />
      </div>
    </Card>
  );
};

export default Close;
