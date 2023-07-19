
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";

import { SOCIAL_DATA } from "../../data/socials";
import SocialButton from "../button";

import { SiGithub, SiGmail, SiLinkedin } from "react-icons/si";
import { HTMLAttributes } from "react";
import Button from "../button";

const socials = {
  github: { Icon: SiGithub, accent: "#4b9173" },
  mail: { Icon: SiGmail, accent: "#f037a5" },
  linkedin: { Icon: SiLinkedin, accent: "#cdf564" },
};
export default function Socials({ className,horizontal=false,...props }: HTMLAttributes<HTMLDivElement> &{horizontal?:boolean}) {
  return (
    <div
      className={`flex  items-center justify-center  ${
        className ? className : ""
      } ${!horizontal?'flex-col':'flex-row'} `}
      {...props}
    >
      {SOCIAL_DATA.map((e, i) => {
        const { Icon, accent } =
          socials[e.name.toLowerCase() as keyof typeof socials];
        return (
          <Button key={i} layoutId="floating" highlightcolor={accent}>
            <Link href={e.link} className="text-white" target="_blank">
              {Icon ? <Icon size={20} /> : null}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
