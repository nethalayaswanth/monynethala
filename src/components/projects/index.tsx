"use client";

import useResizeObserver from "use-resize-observer";
import Accordion from "./accordionComponent";
import Menu from "./menuComponent";


const Projects = () => {
 
const  {width}=useResizeObserver({ref:document.documentElement})

return !width ? <Accordion /> : width > 520 ? <Accordion /> : <Menu />;  
  
};



export default Projects;
