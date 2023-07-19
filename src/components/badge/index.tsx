"use client";
import { ReactNode } from "react";
import Card, { CardProps } from "../card";


const Badge = ({ children,my=6,mx=6,...cardProps }: CardProps &{my?:number;mx?:number;}) => {
  return (
    <Card
      className="flex-none "
      highlightStyle={{
        margin: `${my}px ${mx}px`,
        width: `calc(100% - calc(${mx} * 2px))`,
        height: `calc(100% - calc(${my} * 2px))`,
      }}
      {...cardProps}
    >
     
        {children}
      
    </Card>
  );
};



export const NavBadge = ({ children, ...cardProps }: CardProps ) => {
  return (
    <Card className="flex justify-center " {...cardProps}>
      <div
        className={` badge-content`}
      >
        {children}
      </div>
    </Card>
  );
};

export default Badge;
