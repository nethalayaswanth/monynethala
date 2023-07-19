import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";
import ScramblingText from "../text";

const HorizontalNavBar = ({
  children,

  className,
}: {
  children?: ReactNode;
  gridVisible?: boolean;
  absolute?: boolean;
  horizontal?: boolean;
  backgroundTransparent?: boolean;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={` nav fixed top-0 left-0 right-0   z-[999] flex       ${className}`}
    >
      <div className="m-auto h-[var(--navHeight)] w-[calc(100%-200px)] max-w-[696px] md:w-full   p-4 ">
        <div className={`flex  justify-between `}>
          <div
            className={`text-gray-900  text-3xl font-semibold flex items-center  tracking-[-.06em]`}
          >
            <Link className="mx-auto blend " href="/">
              <ScramblingText text={"MONY NETHALA"} />
            </Link>
          </div>
          {children && children}
        </div>
      </div>
    </div>
  );
};

export default HorizontalNavBar;
