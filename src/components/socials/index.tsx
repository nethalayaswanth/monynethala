
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";

import { SOCIAL_DATA } from "../../data/socials";
import SocialButton from "../button";

import { SiGithub, SiGmail, SiLinkedin } from "react-icons/si";

const socials = {
  github: { Icon: SiGithub, accent: "#4b9173" },
  mail: { Icon: SiGmail, accent: "#f037a5" },
  linkedin: { Icon: SiLinkedin, accent: "#cdf564" },
};

export default function Socials() {
  return (
    <div className="flex md:flex flex-row ">
        {SOCIAL_DATA.map((e, i) => {
          const { Icon, accent } =
            socials[e.name.toLowerCase() as keyof typeof socials];
          return (
            <SocialButton
              index={i}
              key={i}
              layoutId="floating"
              highlightcolor={accent}
            >
              <Link href={e.link} target="_blank">
                {Icon ? <Icon size={20} /> : null}
              </Link>
            </SocialButton>
          );
        })}
    </div>
  );
}
