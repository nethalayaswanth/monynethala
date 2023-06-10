"use client";

import Rounded from "./Rounded";

import { useOverlayDispatch } from "@/contexts/overlayContext";
import { IoIosArrowForward } from "react-icons/io";
import { CardProps } from "../card";
type Path = {
  path: string;
};
const Open = ({ path,...cardProps }: CardProps & Path) => {
  const dispatch = useOverlayDispatch();
  return (
    <Rounded
      {...cardProps}
      onClick={() => {

        dispatch({ type: "open", payload: { path:path } });
      }}
    >
      <IoIosArrowForward size={32} />
    </Rounded>
  );
};

export default Open;
