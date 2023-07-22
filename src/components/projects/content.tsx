"use client";

import { ContentType, ProjectsDataType } from "@/data/projects";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { AiFillGithub } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { ImNpm } from "react-icons/im";
import SlideShow from "../Slideshow";
import Badge from "../badge";
import Button from "../button";
import { CarouselItem } from "../carousel";
import { Floating } from "../floating";
import Video from "../video";
import Card from "../card";
type props = {
  color?: string;
} & ProjectsDataType;

const ContentItem = (data: ContentType & { color?: string }) => {
  const { video, image, aspectRatio, align, portrait, color } = data;

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
            style={{ aspectRatio, backgroundColor: color }}
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
  npm,
  content,
  color,
}: props) => {
  const buttons = [
    [demo, BiLinkExternal,20],
    [github, AiFillGithub,20],
    [npm, ImNpm,16],
  ] as [Url, IconType,number][];
  return (
    <div className="detail flex flex-col relative p-3 flex-1 min-h-0 w-full">
      <div className="flex  ">
        <div className="flex flex-col mr-[80px] ">
          <div className="flex flex-row  items-start justify-start flex-wrap gap-y-[0.375rem]  pb-3">
            {tags &&
              tags.map((tag) => {
                return (
                  <Badge
                    key={tag}
                    highlightcolor={color}
                    my={0}
                    layoutId={name}
                  >
                    <div className="badge-content my-0">
                      <p className=" chip-text ">{tag}</p>
                    </div>
                  </Badge>
                );
              })}
          </div>
          <div className=" p-2 z-[1]  body-3">{description}</div>
        </div>
        <div className="flex flex-col mt-[-0.3125rem] ">
          {buttons.map(([link, Icon,size], index) => {
            return link ? (
              <Link key={index} href={link}>
                <Button className="pb-[0.3125rem]"  layoutId="extLinks" highlightcolor={color}>
                  <Icon size={size} />
                </Button>
              </Link>
            ) : null;
          })}
        </div>
      </div>
      <div
        className={`z-[2] flex-1 flex  justify-center items-center  relative content  min-h-0 `}
      >
        {content ? (
          content.length >= 1 ? (
            <SlideShow color={color}>
              {content.map((data, index) => {
                return (
                  <CarouselItem key={index} className="w-full  flex-shrink-0 ">
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
