

import Rounded from "./Rounded";

import { HTMLAttributes, MouseEventHandler } from "react";
import {MdOutlineArrowBackIosNew} from 'react-icons/md'

import { MdOutlineArrowForwardIos } from "react-icons/md";
import { CardProps } from "../card";

type Props = {
  className?:string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  direction?:'left' | 'right'
};

const Arrow = ({
  direction = "left",
  className,
  onClick,
  ...cardProps
}: Omit<CardProps, "onClick"> & Props) => {
  return (
    <Rounded className={className} {...cardProps} onClick={onClick}>
      {direction === "left" ? (
        <MdOutlineArrowBackIosNew size={20} />
      ) : (
        <MdOutlineArrowForwardIos size={20} />
      )}
    </Rounded>
  );
};

export default Arrow;
 