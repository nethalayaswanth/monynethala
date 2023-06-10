"use client";

import { images } from "@/data/images";
import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import cssStyles from "./bars.module.css";

interface Props {
  children?: ReactNode;

  index: number;
  img: String;
  onHover: (index: number) => void;
}
export type Ref = HTMLDivElement;

const Bar = forwardRef<Ref, Props>(({ index, img, onHover }, ref) => {
  const handleMouseEnter: React.MouseEventHandler = (e) => {
    onHover(index);
  };

  const handleMouseLeave: React.MouseEventHandler = (e) => {};

  return (
    <div
      ref={ref}
      className={`${cssStyles.card}`}
      key={index}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={cssStyles.wrapper}>
        <div className={`${cssStyles.left} ${cssStyles.absolute}  `}>
          <div className={`${cssStyles.right} ${cssStyles.absolute} `}>
            <div className={`${cssStyles.center} ${cssStyles.absolute} `}>
              <div className={`${cssStyles.crop} ${cssStyles.absolute} `}>
                <div
                  className={cssStyles.bg}
                  style={{
                    backgroundImage: `url(${img})`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Bar.displayName = "Bar";

const Bars = () => {
  const activeIndex = useRef(0);

  const nodes = useRef(new Set<HTMLDivElement>([]));
  const setNodes = useCallback((node: HTMLDivElement) => {
    if (!node) return;
    nodes.current.add(node);
  }, []);

  const handleHover = useCallback((index: number) => {
    const cards = nodes.current;

    
    if (cards.size === 0 || index === activeIndex.current) return;
    activeIndex.current = index;
    let i = 0;

   
    for (let card of cards) {
      if (i === activeIndex.current) {
        card.classList.add(cssStyles.active);
      } else {
        card.classList.remove(cssStyles.active);
      }

      i++;
    }
  }, []);

  useLayoutEffect(() => {
    if (images.length === 0) return;
    handleHover(Math.floor(5));
  }, [handleHover]);

  return (
    <div className={cssStyles.main}>
      <div className={cssStyles.section}>
        <div className={cssStyles.flex}>
          <div className={cssStyles.container}>
            <div className={cssStyles.wrapper}>
              {images.slice(0, 10).map((img, index) => {
                return (
                  <Bar
                    ref={setNodes}
                    index={index}
                    key={index}
                    img={img}
                    onHover={handleHover}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bars;
