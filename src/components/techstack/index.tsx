import { getContrastColor, getcolor } from "@/utils";
import Badge from "../badge";
import Card from "../card";
import ScramblingText from "../text";
import GridWrapper from "../wrapper/gridWrapper";

type Chips = {
  name: string;
};
type Stack = {
  title: string;
  name: String;
  accent: string;
  span: number[];
  spanCol: number[];
  spanRow: number[];
  dummy: boolean;
  data: Chips[];
};

const stacks: Partial<Stack>[] = [
  {
    title: "Languages",
    accent: "#f037a5",
    name: "languages",
    span: [1, 1],
    spanCol: [3, 4],
    spanRow: [1, 2],
    data: [
      { name: "Typescript" },
      { name: "Javascript" },
      { name: "python" },
      { name: "Mysql" },
    ],
  },

  {
    title: "Frameworks/lib",
    accent: "#4b9173",
    name: "frameworks",
    span: [2, 2],
    spanCol: [4, 6],
    spanRow: [1, 3],
    data: [
      { name: "React" },
      { name: "React-native" },
      { name: "Next" },
      { name: "Amazon amplify" },
      { name: "Chakra-ui" },
      { name: "material-ui" },
      { name: "tailwind-css" },
      { name: "Jest" },
      { name: "Cypress" },
      { name: "React-testing-library" },
    ],
  },
  {
    title: "State/Cache",
    accent: "#a4c9d8",
    name: "state",
    span: [1, 1],
    spanCol: [3, 4],
    spanRow: [2, 3],
    data: [{ name: "redux" }, { name: "react-query" }, { name: "valtio" }],
  },
  {
    title: "Animations",
    accent: "#cdf564",
    name: "animations",
    span: [2, 1],
    spanCol: [3, 5],
    spanRow: [3, 4],
    data: [
      { name: "framer-motion" },
      { name: "react-spring" },
      { name: "react-reanimated" },
      { name: "gsap" },
    ],
  },
  {
    title: "Databases",
    accent: "#ffbc4b",
    name: "databases",
    span: [1, 1],
    spanCol: [5, 6],
    spanRow: [3, 4],
    data: [
      { name: "Redis" },
      { name: "Postgresql" },
      { name: "Mongodb" },
      { name: "Firebase" },
    ],
  },
  {
    title: "server",
    name: "server",
    accent: "#ffd0d5",
    span: [1, 1],
    spanCol: [3, 4],
    spanRow: [4, 6],
    data: [
      { name: "Node" },
      { name: "Express" },
      { name: "Graphql" },
      { name: "Django" },
    ],
  },
  {
    title: "Developer tools",
    name: "developertools",
    accent: "#ff4935",
    span: [2, 2],
    spanCol: [4, 6],
    spanRow: [4, 6],
    data: [
      { name: "Git" },
      { name: "Docker" },
      { name: "Postman" },
      { name: "Expo" },
      { name: "Figma" },
    ],
  },
  // {
  //   title: "Testing",
  //   accent: "#f037a5",
  //   span: [1, 2],
  //   data: [
  //     { name: "Jest" },
  //     { name: "Cypress" },
  //     { name: "React-testing-library" },
  //   ],
  // },
];

const fillers = { mobile: 0, tablet: 8, desktop: 16 };

const TechStack = () => {
  return (
    <GridWrapper fillers={fillers} id="techstack">
      {stacks.map(({ title, data, name, dummy }, index) => {
        const accent = getcolor();
        return (
          <div
            key={title ?? index}
            className={` grid-card ${name} flex justify-stretch  `}
          >
            <Card
              className="flex-1"
              highlightcolor={accent}
              layoutId="floating"
            >
              {dummy ? null : (
                <div
                  key="title"
                  className="flex flex-row  p-3 md:p-4 h-full w-full line   ease-linear duration-100 "
                >
                  <div className="h3 text-vertical text-center ">{title}</div>
                  <div className="flex flex-row items-start justify-start flex-wrap p-2  ml-2">
                    {data &&
                      data.map(({ name }) => {
                        return (
                          <Badge
                            key={name}
                            layoutId={title}
                            highlightcolor={getContrastColor(accent)}
                          >
                            <div className=" badge-content chip-text">
                              <ScramblingText text={name} />
                            </div>
                          </Badge>
                        );
                      })}
                  </div>
                </div>
              )}
            </Card>
          </div>
        );
      })}
    </GridWrapper>
  );
};

export default TechStack;
