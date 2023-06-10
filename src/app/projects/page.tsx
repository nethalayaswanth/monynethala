import Cover from "@/components/page";
import Portal from "@/components/portal";
import Projects from "@/components/projects";
import Sticky from "@/components/sticky";

export default function Home() {
  return (
    <>
      <Projects />

      <Portal pathname="/projects">
        <Sticky />
      </Portal>
      {/* <Cover name="projects" /> */}
    </>
  );
}
