import { Url } from "next/dist/shared/lib/router/router";


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
  github: Url;
  npm?: Url;
  demo?: Url;
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
        video: "/projects/monyflix/monyflix.mp4",
        // video:
        //   "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/videos%2FVID-20230208-WA0000.mp4?alt=media&token=0d694d75-2149-4576-8373-5682501d41f0&_gl=1*1nl57gt*_ga*MTM0NjQ4NjE5Ni4xNjgzNDU1Nzg1*_ga_CW55HF8NVT*MTY4NTY4OTQ3Ni4xMC4xLjE2ODU2ODk3NjEuMC4wLjA",
      },
      {
        // image:
        //   "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/monyflix%2Fimages%2Fhovermodal.gif?alt=media&token=beebc082-b8ca-4558-92f2-123e183b72a2",
        align: "center",
        portrait: false,
        aspectRatio: 416 / 279,
        image: "/projects/monyflix/hovermodal.gif",
      },
      {
        // image:
        //   "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/monyflix%2Fimages%2Fsearch.png?alt=media&token=50cea80b-470f-4411-a260-b5e641a0f05a",
        aspectRatio: 16 / 9,
        align: "center",
        portrait: false,
        image: "/projects/monyflix/hovercard.gif",
      },
      {
        // image:
        //   "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/monyflix%2Fimages%2Fmodal.png?alt=media&token=f2e1705c-609a-42e9-bbf5-55ceb624c1ce",
        aspectRatio: 9 / 16,
        align: "right",
        portrait: true,
        image: "/projects/monyflix/modal.png",
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
    content: [
      {
        // image:
        // "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/whatsapp%2Fimages%2Fstartup.gif?alt=media&token=9d2f78b7-c7fe-41da-af61-3438bd74328e",
        align: "center",
        portrait: false,
        aspectRatio: 16 / 9,
        image: "/projects/whatsapp/startup.gif",
      },
      {
        // image:
        //   "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/whatsapp%2Fimages%2Fmedia2.gif?alt=media&token=6f6abce9-d62d-41e3-89e1-f180063145c6",
        aspectRatio: 16 / 9,
        align: "center",
        portrait: false,
        image: "/projects/whatsapp/media.gif",
      },
      {
        // image:
        //   "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/whatsapp%2Fimages%2Fmodal2.gif?alt=media&token=661f6044-60d7-4a94-be40-580fc641af44",
        aspectRatio: 16 / 9,
        align: "center",
        portrait: false,
        image: "/projects/whatsapp/modal.gif",
      },
      {
        // image:
        //   "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/whatsapp%2Fimages%2Fdetails1.gif?alt=media&token=1eabfbfd-f675-417e-814d-93dd18a1b921",
        aspectRatio: 16 / 9,
        align: "center",
        portrait: false,
        image: "/projects/whatsapp/details.gif",
      },
      {
        // image:
        //   "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/whatsapp%2Fimages%2Fgroup2.gif?alt=media&token=e6b59d51-5bf2-41c1-886a-e0e763a1daf9",
        aspectRatio: 16 / 9,
        align: "center",
        portrait: false,
        image: "/projects/whatsapp/group.gif",
      },
      {
        // image:
        //   "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/whatsapp%2Fimages%2Fdelete.gif?alt=media&token=bfc6718f-9329-46de-b68b-f3527704a863",
        aspectRatio: 16 / 9,
        align: "center",
        portrait: false,
        image: "/projects/whatsapp/delete.gif",
      },
      {
        // image:
        //   "https://firebasestorage.googleapis.com/v0/b/mony-c9195.appspot.com/o/whatsapp%2Fimages%2Fpin.gif?alt=media&token=f529747e-e019-469c-8316-873a143bd9a6",
        aspectRatio: 9 / 16,
        align: "center",
        portrait: true,
        image: "/projects/whatsapp/pin.gif",
      },
    ],
  },
  {
    name: "UseScrollTrigger",
    tags: ["Hook"],
    description:
      "A React hook which gives scroll progress value of component in a viewport and trigger animations. uses Instersection observer api ",
    github: "https://github.com/nethalayaswanth/usescrolltrigger",
    npm: "https://www.npmjs.com/package/usescrolltrigger",
  },
  {
    name: "AnimatePresence",
    tags: ["Motion", "WAPI"],
    description:
      "Animate component  created with exported Motion Api,  while mounting and unmounting.Uses Web Animation Api",
    github: "https://github.com/nethalayaswanth/animatepresence",
    npm: "https://www.npmjs.com/package/@monynethala/animatepresence",
  },
  {
    name: "Rems",
    tags: ["Ext-State"],
    description: `React external mutable react store. Can rerender and used in callbacks by destructing only dependent value.No unnecessary rerenders. Uses Proxy
`,
    github: "https://github.com/nethalayaswanth/rems",
    npm: "https://www.npmjs.com/package/rems",
  },
];
