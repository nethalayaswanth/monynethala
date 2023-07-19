"use client";


import Card, { CardProps } from "../card";
import {CSSProperties} from 'react'

const Button = ({ children,buttonStyles, buttonClassName,...cardProps }: CardProps &{buttonClassName?:string;buttonStyles?:CSSProperties}) => {

 
  return (
    <Card {...cardProps}>
      <div
        style={{ ...buttonStyles }}
        className={` flex flex-row items-center pt-[0.3125rem] pb-[0.25rem] px-[0.25rem] justify-center    relative z-[2]  select-none ${buttonClassName?buttonClassName:''}  `}
      >
        {children}
      </div>
    </Card>
  );
};

export default Button;
