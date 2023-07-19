import { getcolor } from "@/utils";
import Card from "../card";
import ScramblingText from "../text";
import NavButton from "./navButton";

const navLinks = [
  { link: "/images", name: "images" },
  { link: "/#techstack", name: "TechStack" },
  { link: "/#projects", name: "Projects" },
];
const Navigation = () => {
  return (
    <div className=" flex flex-col justify-center ">
      {navLinks.map(({ link, name }, i) => {
        return (
          <div className="flex justify-center" key={name}>
            <NavButton className="flex justify-center mx-auto" path={link}>
              <Card
                className="flex justify-center "
                layoutId="nav"
                highlightcolor={getcolor()}
              >
                <div className="badge-content border-0 text-vertical text-center ">
                  <ScramblingText text={name} />
                </div>
              </Card>
            </NavButton>
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;
