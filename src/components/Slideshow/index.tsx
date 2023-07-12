'use client'
import { getcolor } from "@/utils";
import { Carousel, CarouselItem } from "../carousel";
import { useRef, ReactNode } from "react";
import { CarouselHandle } from "../carousel/carousel";
import Arrow from "../button/arrow";

const SlideShow=({color,children}:{color?:string,children?:ReactNode})=>{

    const carouselRef=useRef<CarouselHandle>(null)

 
    return (
      <div className="slideshow flex flex-col h-full w-full justify-between ">
        <div className="flex-1 ">
          <Carousel ref={carouselRef}>
            {children ? (
              children
            ) : (
              <>
                {Array(8)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <CarouselItem key={index}>
                        <div
                          className="h-[200px] w-[200px] mr-[10px] "
                          style={{ backgroundColor: getcolor() }}
                        ></div>
                      </CarouselItem>
                    );
                  })}
              </>
            )}
          </Carousel>
        </div>
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
      </div>
    );
}


export default SlideShow