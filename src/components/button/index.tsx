"use client";


import Card, { CardProps } from "../card";


const Button = ({ children, ...cardProps }: CardProps) => {

 
  return (
    <Card {...cardProps}>
      <div
        className={` flex flex-row items-center pt-[0.3125rem] pb-[0.25rem] px-[0.25rem]    relative z-[2]  select-none  `}
      >
        {children}
      </div>
    </Card>
  );
};

export default Button;
