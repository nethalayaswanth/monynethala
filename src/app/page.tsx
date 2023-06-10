import Bio from "@/components/bio";
import HashNavigation from "@/components/navigation/hashNavigation";
import Images from "@/components/images";
import Landing from "@/components/landing";
import NavBar from "@/components/navbar";
import Cover from "@/components/page";
import Projects from "@/components/projects";
import Sticky from "@/components/sticky";
import TechStack from "@/components/techstack";

export default function Home() {
  return (
    <>
      {/* <main id="app" className="app w-full flex flex-grow flex-shrink flex-col">
        <Images />
      </main>
      <Cover name="home" /> */}
      <Sticky showProgress={false}>
        <HashNavigation>
          <NavBar absolute gridVisible={false} />
          <Bio />
          {/* @ts-expect-error Async Server Component */}
          {/* <Landing /> */}
          <Projects />
          <TechStack />
        </HashNavigation>
      </Sticky>
    </>
  );
}
