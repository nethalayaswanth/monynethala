interface ProjectsDataType {
  name: string;
  tags: string[];
  description: string;
  github: string;
  demo?: string;
  video?: string;
  image?: string;
}

export const projectsData: ProjectsDataType[] = [
  {
    name: "Monyflix",
    tags: ["Apollo-GraphQl", "TMDBApi", "React-Spring"],
    description:
      "MONYFLIX is a movie overview app display the TMDB data in APPLE tv+ interface with NETFLIX interactions ",
    github: "https://github.com/nethalayaswanth/movies",
    demo: "monyflix.vercel.app",
    video:
      "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/videos%2FVID-20230208-WA0000.mp4?alt=media&token=0d694d75-2149-4576-8373-5682501d41f0&_gl=1*1nl57gt*_ga*MTM0NjQ4NjE5Ni4xNjgzNDU1Nzg1*_ga_CW55HF8NVT*MTY4NTY4OTQ3Ni4xMC4xLjE2ODU2ODk3NjEuMC4wLjA",
  },
  {
    name: "Messenger",
    tags: ["Redis", "Express"],
    description:
      "Responsive Messenger app which is a replicate of whatsappweb ",
    github: "https://github.com/nethalayaswanth/movies",
    demo: "monyflix.vercel.app",
  },
  {
    name: "useScrollTrigger",
    tags: [],
    description:
      "A React hook which gives scroll progress value of component in a viewport and trigger animations. uses Instersection observer api ",
    github: "https://github.com/nethalayaswanth/movies",
  },
  {
    name: "AnimatePresence",
    tags: [],
    description:
      "Animate component  created with exported Motion Api,  while mounting and unmounting.Uses Web Animation Api",
    github: "https://github.com/nethalayaswanth/movies",
  },
  {
    name: "Rems",
    tags: [],
    description: `React external mutable react store. Can rerender and used in callbacks by destructing only dependent value.No unnecessary rerenders. Uses Proxy
`,
    github: "https://github.com/nethalayaswanth/movies",
  },
];
