"use client";

import { ProjectsDataType, ContentType } from "@/data/projects";
import Image from "next/image";
import SlideShow from "../Slideshow";
import Badge from "../badge";
import { CarouselItem } from "../carousel";
import { Floating } from "../floating";
import Video from "../video";

type props = {
  color?: string;
} & ProjectsDataType;


const ContentItem = (data: ContentType &{color?:string}) => {
  const { video, image,aspectRatio,align,portrait,color} = data;
  
  return (
    <>
      {video ? (
        <div
          // style={{ backgroundColor: color }}
          className="w-full h-full relative"
        >
          <Floating className="w-full">
            <Video src={video}></Video>
          </Floating>
        </div>
      ) : null}

      {image && (
        <div
          // style={{ backgroundColor: color }}
          className={`$ relative flex justify-center items-center h-full  `}
        >
          <div
            style={{aspectRatio}}
            data-portrait={portrait}
            className="content-img relative"
          >
            <Image
              src={image}
              className={`w-full  h-auto bg-cover bg-center will-change-transform `}
              alt={""}
              fill={true}
            ></Image>
          </div>
        </div>
      )}
    </>
  );
};
const Detail = ({
  name,
  tags,
  description,
  github,
  demo,
  content,
  color,
}: props) => {
  return (
    <div className="detail flex flex-col relative p-3 pt-[100px]  h-full w-full">
      <div className="flex flex-col ">
        <div className="flex flex-row items-start justify-start flex-wrap pt-1 pb-3">
          {tags &&
            tags.map((tag) => {
              return (
                <Badge key={tag} highlightcolor={color} layoutId={name}>
                  <p className="chip-text">{tag}</p>
                </Badge>
              );
            })}
        </div>
        <div className=" p-2 z-[1]  body-3">{description}</div>
      </div>
      <div
        className={`z-[2] flex-1 flex  justify-center items-center  relative content   `}
      >
        {content ? (
          content.length >= 1 ? (
            <SlideShow color={color}>
              {content.map((data, index) => {

                return (
                  <CarouselItem key={index} className="w-full flex-shrink-0 ">
                    <ContentItem {...data} color={color} />
                  </CarouselItem>
                );
              })}
            </SlideShow>
          ) : (
            <ContentItem {...content} color={color} />
          )
        ) : null}
      </div>
    </div>
  );
};

export default Detail;
