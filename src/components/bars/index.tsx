"use client";

import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import cssStyles from "./bars.module.css";
import { ShowCaseData } from "@/data/showcase";

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

const Bars = ({ data }: { data: ShowCaseData }) => {
  const activeIndex = useRef(0);

  const nodes = useRef(new Set<HTMLDivElement>([]));
  const setNodes = useCallback((node: HTMLDivElement) => {
    if (!node) return;
    nodes.current.add(node);
  }, []);

  const handleHover = useCallback((index?: number) => {
    const cards = nodes.current;

    if ((cards.size === 0 || index === activeIndex.current && index!==undefined)) return;
    if (index === undefined) {
      activeIndex.current = 0;
    }else{
      activeIndex.current =index
    }
    
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
    if (data.length === 0) return;
    handleHover();
  }, [handleHover, data]);

  return (
    // <div className={cssStyles.main}>
    //   <div className={cssStyles.section}>
    //     <div className={cssStyles.flex}>
          <div className={cssStyles.container}>
            <div className={cssStyles.wrapper}>
              {data.map(({url}, index) => {
                return (
                  <Bar
                    ref={setNodes}
                    index={index}
                    key={index}
                    img={url}
                    onHover={handleHover}
                  />
                );
              })}
            </div>
          </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Bars;
