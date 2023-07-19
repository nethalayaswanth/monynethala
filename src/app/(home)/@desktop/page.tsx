import Bio from "@/components/bio";
import HashNavigation from "@/components/navigation/hashNavigation";
import Landing from "@/components/landing";
import NavBar from "@/components/navbar";
import Projects from "@/components/projects";
import Sticky from "@/components/sticky";
import TechStack from "@/components/techstack";
import Navigation from "@/components/navigation";
import Socials from "@/components/socials";

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
