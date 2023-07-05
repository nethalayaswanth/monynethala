'use client'


import { getcolor } from "@/utils";
import Image from "next/image";
import Badge from "../badge";
import { Carousel, CarouselItem } from "../carousel";
import { Floating } from "../floating";
import Video from "../video";
import SlideShow from "../Slideshow";
import ScramblingText from "../text";

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
  console.log(color);
  return (
    <div className="flex flex-col relative p-3 pt-[100px]  h-full w-full">
      <div className="flex flex-col ">
        <div className="flex flex-row items-start justify-start flex-wrap pt-1 pb-3">
          {tags &&
            tags.map((tag) => {
              return (
                <Badge key={tag} highlightcolor={color} layoutId={name}>
                  {/* <ScramblingText text={tag} /> */}
                  {tag}
                </Badge>
              );
            })}
        </div>
        <div className=" p-2 z-[1] body-3  ">{description}</div>
      </div>
      <div
        className={`z-[2] flex-1 flex  justify-center items-center  relative   `}
      >
        {video || image ? (
          <Floating className="w-full">
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
                style={{ aspectRatio: 16 / 9, width: `calc(100% - 8px)` }}
                className=" flex items-center  "
              >
                <Video src={video}></Video>
              </div>
            )}
          </Floating>
        ) : (
          <SlideShow color={color} />
        )}
      </div>
    </div>
  );
};



export default Content