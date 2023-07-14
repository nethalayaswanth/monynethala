
export type ContentType = {
  video?: string;
  image?: string;
  aspectRatio?: number;
  align?: string;
  portrait?: boolean;
};
export type ProjectsDataType = {
  name: string;
  tags: string[];
  description: string;
  github: string;
  demo?: string;
  content?: ContentType[];
};

export const projectsData: ProjectsDataType[] = [
  {
    name: "Monyflix",
    tags: ["Apollo-GraphQl", "TMDBApi", "React-Spring"],
    description:
      "MONYFLIX is a movie overview app display the TMDB data in APPLE tv+ interface with NETFLIX interactions ",
    github: "https://github.com/nethalayaswanth/monyflix",
    demo: "https://monyflix.vercel.app",
    content: [
      {
        video:
          "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/videos%2FVID-20230208-WA0000.mp4?alt=media&token=0d694d75-2149-4576-8373-5682501d41f0&_gl=1*1nl57gt*_ga*MTM0NjQ4NjE5Ni4xNjgzNDU1Nzg1*_ga_CW55HF8NVT*MTY4NTY4OTQ3Ni4xMC4xLjE2ODU2ODk3NjEuMC4wLjA",
      },
      {
        image:
          "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/monyflix%2Fimages%2Fhovermodal.gif?alt=media&token=beebc082-b8ca-4558-92f2-123e183b72a2",
        align: "center",
        portrait: false,
        aspectRatio: 416 / 279,
      },
      {
        image:
          "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/monyflix%2Fimages%2Fsearch.png?alt=media&token=50cea80b-470f-4411-a260-b5e641a0f05a",
        aspectRatio: 16 / 9,
        align: "center",
        portrait: false,
      },
      {
        image:
          "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/monyflix%2Fimages%2Fmodal.png?alt=media&token=f2e1705c-609a-42e9-bbf5-55ceb624c1ce",
        aspectRatio: 9 / 16,
        align: "right",
        portrait: true,
      },
    ],
  },
  {
    name: "Messenger",
    tags: ["Redis", "Express"],
    description:
      "Responsive Messenger app which is a replicate of whatsappweb ",
    github: "https://github.com/nethalayaswanth/whatsapp",
    demo: "https://whatsappmessenger.vercel.app/",
  },
  {
    name: "useScrollTrigger",
    tags: [],
    description:
      "A React hook which gives scroll progress value of component in a viewport and trigger animations. uses Instersection observer api ",
    github: "https://github.com/nethalayaswanth/usescrolltrigger",
  },
  {
    name: "AnimatePresence",
    tags: [],
    description:
      "Animate component  created with exported Motion Api,  while mounting and unmounting.Uses Web Animation Api",
    github: "https://github.com/nethalayaswanth/animatepresence",
  },
  {
    name: "Rems",
    tags: [],
    description: `React external mutable react store. Can rerender and used in callbacks by destructing only dependent value.No unnecessary rerenders. Uses Proxy
`,
    github: "https://github.com/nethalayaswanth/rems",
  },
];
