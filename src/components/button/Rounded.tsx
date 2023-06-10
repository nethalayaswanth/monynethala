
import { HTMLAttributes, MouseEventHandler } from "react";
import Card, { CardProps } from "../card";


type click={
  onClick: MouseEventHandler<HTMLButtonElement>
}
const Rounded = ({
  children,
  onClick,
  ...cardProps
}: Omit<CardProps, "onClick"> & click) => {
  return (
    <Card
      className="flex-grow-0 rounded-full  "
      style={{}}
      highlightStyle={{
        borderRadius: "50%",
      }}
      {...cardProps}
    >
      <button
        onClick={onClick}
        className={`uppercase flex flex-row items-center cursor-pointer  font-bold rounded-full border border-solid border-[var(--accent,currentcolor)]  relative z-[2]  select-none transition-colors  `}
      >
        {children}
      </button>
    </Card>
  );
};

export default Rounded;
