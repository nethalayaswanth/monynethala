import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";
import ScramblingText from "../text";

const NavBar = ({
  children,
  gridVisible = true,
  className,
  absolute = false,
  backgroundTransparent = false,
  horizontal = false,
}: {
  children?: ReactNode;
  gridVisible?: boolean;
  absolute?: boolean;
  horizontal?: boolean;
  backgroundTransparent?: boolean;
} & HTMLAttributes<HTMLDivElement>) => {
  const border = gridVisible ? ` line` : "";
  return (
    <div
      className={` nav  ${
        !horizontal ? `w-[var(--navHeight)]` : `h-[var(--navHeight)] max-w-[696px]`
      }  p-4 ${
        absolute
          ? ` fixed top-0 left-0 h-screen `
          : `sticky left-[0px] top-[0px] `
      }  z-[999]  justify-center ${
        backgroundTransparent ? "" : "bg-white"
      } line   ${className}`}
    >
      <>
        <div
          className={`flex  justify-between  mb-[100px] ${
            !horizontal ? `flex-col ` : ""
          }`}
        >
          <Link className="flex justify-center mx-auto" href="/">
            <div
              className={`text-gray-900 text-3xl font-semibold ${
                !horizontal ? `vertical text-center` : ""
              }   tracking-[-.06em]`}
            >
              <ScramblingText  text={'MONY NETHALA'}/>
              
            </div>
          </Link>
          {children && children}
        </div>
      </>
    </div>
  );
};

export default NavBar;
