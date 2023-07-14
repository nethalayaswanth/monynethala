'use client'
import { Children, ReactNode, useRef } from "react";
import Arrow from "../button/arrow";
import { Carousel } from "../carousel";
import { CarouselHandle } from "../carousel/carousel";

const SlideShow = ({
  color,
  children,
}: {
  color?: string;
  children?: ReactNode;
}) => {
  const carouselRef = useRef<CarouselHandle>(null);

  const showNavigation = Children.toArray(children).length > 1;

  return (
    <div className="slideshow flex flex-col h-full w-full justify-between ">
      <div className="flex-1 ">
        <Carousel ref={carouselRef}>{children}</Carousel>
      </div>

      {showNavigation ? (
        <div className="flex flex-row justify-end py-3">
          <Arrow
            highlightcolor={color}
            onClick={() => {
              carouselRef.current?.panLeft();
            }}
            className="mr-3"
          />
          <Arrow
            highlightcolor={color}
            direction="right"
            onClick={() => {
              carouselRef.current?.panRight();
            }}
          />
        </div>
      ) : null}
    </div>
  );
};


export default SlideShow