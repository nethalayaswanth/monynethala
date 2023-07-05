"use client";

import Rounded from "./Rounded";

import { useOverlayDispatch } from "@/contexts/overlayContext";
import { IoMdCloseCircle } from "react-icons/io";
import { CardProps } from "../card";

const Close = ({onClick, ...cardProps }: CardProps) => {
  const dispatch = useOverlayDispatch();
  return (
    <Rounded {...cardProps} >
      <IoMdCloseCircle size={32} />
    </Rounded>
  );
};

export default Close;
