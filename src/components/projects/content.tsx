'use client'


import Image from "next/image";
import Badge from "../badge";
import Open from "../button/open";
import { RotationWrapper } from "./rotationWrapper";
import { Floating } from "../floating";
import Video from "../video";

type props = {
  name: string;
  tags: string[];
  description: string;
  github?: string;
  demo?: string;
  color?: string;
  image?: string;
  video?: string;
};
const Content = ({
  name,
  tags,
  description,
  github,
  demo,
  image,
  color,
  video,
}: props) => {


  return (
    
      <div className="flex flex-row relative p-3 pt-[100px]  h-full w-full">
        <div className="flex flex-col  flex-1">
          <div className="flex flex-row items-start justify-start flex-wrap pt-1 pb-3">
            {tags &&
              tags.map((tag) => {
                return (
                  <Badge key={tag} highlightcolor={color} layoutId={name}>
                    {tag}
                  </Badge>
                );
              })}
          </div>
          <div className=" p-2 z-[2] body-3 mt-[auto]  ">{description}</div>
        </div>
        <Floating>
          {image && (
            <div
              style={{ backgroundColor: color }}
              className="w-[300px] h-[400px]"
            >
              <Image
                src={image}
                className={`w-full h-auto bg-cover bg-center will-change-transform`}
                alt={""}
                fill={true}
              ></Image>
            </div>
          )}
          {video && (
            <div
              // style={{ backgroundColor: color }}
              className="w-[400px] h-[186px] flex items-center  "
            >
              <Video src={video}></Video>
            </div>
          )}
        </Floating>
        {/* <RotationWrapper>
        {image && (
          <div
            style={{ backgroundColor: color }}
            className="w-[300px] h-[400px]"
          >
            <Image
              src={image}
              className={`w-full h-auto bg-cover bg-center will-change-transform`}
              alt={""}
              fill={true}
            ></Image>
          </div>
        )}
        {video && (
          <div
            // style={{ backgroundColor: color }}
            className="w-[180px] h-[240px] flex items-center  "
          >
            <video src={video}></video>
          </div>
        )}
      </RotationWrapper> */}
      </div>
   
  );
};



export default Content