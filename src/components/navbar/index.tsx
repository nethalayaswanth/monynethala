import { generateRandomHsv } from "@/utils";
import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";
import Card from "../card";
import Navigation from "../navigation";
import GridWrapper from "../wrapper/gridWrapper";

//Framer Motion

const fillers = { mobile: 1, tablet: 9, desktop: 15 };

// const NavBar = ({
//   children,
//   gridVisible = true,
//   className,
//   absolute = false,
// }: {
//   children: ReactNode;
//   gridVisible?: boolean;
//   absolute?: boolean;
// } & HTMLAttributes<HTMLDivElement>) => {
//   const border = gridVisible
//     ? ` line`
//     : "";
//   return (
//     <GridWrapper
//       fillers={fillers}
//       className={` nav  ${
//         absolute ? ` fixed top-0 left-0 w-full` : `sticky top-[-50px] bg-white`
//       }  z-[999]  justify-center    ${className}`}
//     >
//       <>
//         <div
//           style={{
//             gridColumn: `content-start/content-end`,
//             gridRow: `2/3`,
//           }}
//           className={`flex   flex-col justify-between flex-1 ${border} `}
//         >
//           <div className=" flex flex-row justify-between p-4">
//             <Link href="/">
//               <div className="text-gray-900 text-3xl font-semibold  tracking-[-.06em]">
//                 MONY NETHALA
//               </div>
//             </Link>
//             {children}
//           </div>
//         </div>
//         <div
//           style={{
//             gridColumn: `content-start/content-end`,
//             gridRow: `3/4`,
//           }}
//           className={`${border} `}
//         >
//           {gridVisible && <Navigation />}
//         </div>
//       </>
//     </GridWrapper>
//   );
// };


const NavBar = ({
  children,
  gridVisible = true,
  className,
  absolute = false,
  backgroundTransparent = false,
}: {
  children?: ReactNode;
  gridVisible?: boolean;
  absolute?: boolean;
  backgroundTransparent?: boolean;
} & HTMLAttributes<HTMLDivElement>) => {
  const border = gridVisible ? ` line` : "";
  return (
    <div
      className={` nav w-[var(--navHeight)] p-4 ${
        absolute 
          ? ` fixed top-0 left-0 h-screen `
          : `sticky left-[0px] top-[0px] `
      }  z-[999]  justify-center ${
        backgroundTransparent ? "" : "bg-white"
      } line   ${className}`}
    >
      <>
        <div className=" flex flex-col justify-between  mb-[100px]">
          <Link className="flex justify-center mx-auto"  href="/">
            <div className="text-gray-900 text-3xl font-semibold vertical text-center  tracking-[-.06em]">
              MONY NETHALA
            </div>
          </Link>
          {children && children}
        </div>

        <Navigation />
      </>
    </div>
  );
};


export default NavBar;
