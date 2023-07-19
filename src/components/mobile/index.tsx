import { showcase } from "@/data/showcase";
import Link from "next/link";
import Bars from "../bars";
import Accordion from "../projects/accordionComponent";
import Socials from "../socials";
import ScramblingText from "../text";
import MotionWrapper from "./motionWrapper";

export default function MobileComponent() {
  return (
    <MotionWrapper
      header={
        <>
          <Link className="blend " href="/">
            <ScramblingText text={"MONY NETHALA"} />
          </Link>
          <Socials horizontal />
        </>
      }
      gallery={<Bars data={showcase} />}
      projects={<Accordion vertical />}
    />
    // <div className="w-full  absolute h-full overflow-scroll bg-black">
    //   <div
    //     className={`mobile-header text-white  top-0  text-xl font-semibold flex items-center justify-between h-[60px] fixed w-full fade  tracking-[-.06em]  p-[12px]`}
    //   >

    //   </div>

    //   <div className="h-[calc(100%-40px)] w-full sticky top-[40px] mt-[40px]   py-[10px] ">
    //     <div className="w-full absolute top-0 z-[1] h-[30px] fade"></div>

    //     <div className="w-full absolute bottom-0 z-[1] h-[30px] fade top"></div>
    //   </div>
    //   <div className="min-h-[100vh] bg-[rgba(0,0,0,0.8)] backdrop-blur-[20px] sticky top-[60px] z-[2] pt-[40px] flex flex-col text-white">

    //   </div>
    // </div>
  );
}
