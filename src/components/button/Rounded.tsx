
import { HTMLAttributes,CSSProperties, MouseEventHandler } from "react";
import Card, { CardProps } from "../card";


type props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  buttonClassName?: string;
  buttonStyles?:CSSProperties;
};
const Rounded = ({
  children,
  onClick,
  className,
  buttonClassName,
  buttonStyles,
  ...cardProps
}: Omit<CardProps, "onClick"> & props) => {
  return (
    <Card
      className={`flex-grow-0 rounded-full ${className ? className : ""} `}
      style={{}}
      highlightStyle={{
        borderRadius: "50%",
      }}
      {...cardProps}
    >
      <button
        onClick={onClick}
        className={`uppercase p-2 flex flex-row items-center cursor-pointer  font-bold rounded-full border border-solid border-[var(--accent,currentcolor)]  relative z-[2]  select-none transition-colors ${buttonClassName?buttonClassName:''}  `}
      >
        {children}
      </button>
    </Card>
  );
};

export default Rounded;
