import { getContrastColor, getcolor } from "@/utils";
import Link from "next/link";
import { NavBadge } from "../badge";
import Card from "../card";
import NavButton from "./navButton";
import ScramblingText from "../text";

const navLinks = [
  { link: "/images", name: "images" },
  { link: "/#techstack", name: "TechStack" },
  { link: "/#projects", name: "Projects" },
];
const Navigation = () => {
  
  return (
    
      <div className=" flex flex-col justify-center mt-[100px] ">
        {navLinks.map(({ link, name }, i) => {
          return (
            <div key={name}>
              
              <NavButton className="flex justify-center mx-auto" path={link}>
                <NavBadge layoutId="nav" highlightcolor={getcolor()}>
                  <div className="vertical text-center "><ScramblingText text={name} /></div>
                </NavBadge>
              </NavButton>
            </div>
          );
        })}
      </div>
  
  );
};

export default Navigation;
