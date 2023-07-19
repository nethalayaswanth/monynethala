import Bio from "@/components/bio";
import Landing from "@/components/landing";
import NavBar from "@/components/navbar";
import Navigation from "@/components/navigation";
import HashNavigation from "@/components/navigation/hashNavigation";
import Projects from "@/components/projects";
import Socials from "@/components/socials";
import Sticky from "@/components/sticky";
import TechStack from "@/components/techstack";

export default function Desktop() {
  return (
    <>
      <Sticky showProgress={false}>
        <HashNavigation>
          <NavBar absolute gridVisible={false}>
            <>
              <Navigation />
              <Socials />
            </>
          </NavBar>
          <Bio />
          <Landing />
          <Projects />
          <TechStack />
        </HashNavigation>
      </Sticky>
    </>
  );
}
