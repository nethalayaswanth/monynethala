"use client";
import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useOverlayDispatch } from "@/contexts/overlayContext";
import useRefCb from "@/hooks/useRefCb";
import { getcolor, isDarkColor } from "@/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { docData } from "../landing";
import cssStyles from "./stack.module.css";

type CarStyle = { zIndex: number; translate: number; scale: number };

interface Props {
  children?: ReactNode;
  highlightcolor?: string;
  style: CarStyle;
  index: number;
  img: string;
  activeIndex: number;
  cardsLength: number;
  darkTextColor?: string;
  lightTextColor?: string;
  accent?: string;

  onHover: (index: number, accent: string) => void;
}
export type Ref = HTMLDivElement;
const Card = forwardRef<Ref, Props>(
  (
    {
      index,
      activeIndex,
      style,
      img,
      onHover,
      children,
      cardsLength,
      darkTextColor = "rgb(255,255,255)",
      lightTextColor = "rgb(31,41,55)",
    },
    ref
  ) => {
    const active = activeIndex === index;
    const offset = Math.abs(activeIndex - index);

    const justification =
      index === activeIndex ? "center" : index < activeIndex ? "left" : "right";

    const { zIndex, translate, scale } = style
      ? style
      : { zIndex: 0, translate: 0, scale: 1 };

    const color = useMemo(() => getcolor(), []);
    const textColor = isDarkColor(color) ? darkTextColor : lightTextColor;

    const handleMouseEnter: React.MouseEventHandler = (e) => {
      onHover(index, color);
    };
    const maxBorderWidth = 0.5;
    const borderWidth =
      maxBorderWidth - (maxBorderWidth / cardsLength) * offset;

    return (
      <div
        className={`${active ? `${cssStyles.active}` : ""} ${cssStyles.card}`}
        key={index}
        ref={ref}
        style={{
          zIndex,
          transform: `translateX(${translate}px)  scale(${scale})`,
        }}
      >
        <div
          className={cssStyles.overlay}
          data-align={justification}
          onMouseEnter={handleMouseEnter}
          style={{
            // transform: `scale(${scale})`,
            "--accent": color,
            "--borderWidth": `${borderWidth}px`,
            ...(active && { color }),
          }}
        >
          <div className={cssStyles.wrapper}>
            <div className={`${cssStyles.outer} ${cssStyles.absolute}  `}>
              <div className={`${cssStyles.inner} ${cssStyles.absolute} `}>
                <div className={`${cssStyles.crop} ${cssStyles.absolute} `}>
                  <div
                    className={cssStyles.bg}
                    style={{
                      backgroundImage: `url(${img})`,
                      backgroundColor: color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className={cssStyles.contentWrapper}>
            <div className={cssStyles.content}>{active && children}</div>
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

const Stack = ({
  data,
  darkTextColor = "rgb(255,255,255)",
  lightTextColor = "rgb(31,41,55)",
}: {
  data: docData[];
  darkTextColor?: string;
  lightTextColor?: string;
}) => {
  const activeIndex = useRef(0);
  const [active, setActive] = useState(0);
  const [styles, setstyles] = useState<CarStyle[] | []>([]);
  const [color, setColor] = useState("#fff");

  const [container, setConainer] = useRefCb<HTMLDivElement>();
  const [wrapper, setWrapper] = useRefCb<HTMLDivElement>();
  const [main, setMain] = useRefCb<HTMLDivElement>();

  // const setNodes: RefCallback<HTMLElement> = useCallback((node) => {
  //   if (!node) return;
  //   nodes.current.add(node);
  // }, []);
  const cardsLength = data.length;
  const handleHover = useCallback(
    (index: number, color: string) => {
      if (!container.current || !wrapper.current || !main.current) return;

      if (cardsLength === 0 || index === activeIndex.current) return;
      activeIndex.current = index;
      setActive(index);
      setColor(color);
      const { width:rootWidth  } = container.current.getBoundingClientRect();
       const { width: wrapperWidth } = wrapper.current.getBoundingClientRect();
      const cardWidth = wrapperWidth / cardsLength;
   /* Inspired from google arts */
      let totalWidth = 0,
        styles = [],
        e = 0;
      for (let i = 0; i < cardsLength; i++) {
        var offset = i - activeIndex.current,
          direction = Math.sign(offset),
          zIndex = 30 - Math.abs(offset),
          scale = 1 - Math.log(Math.abs(offset) + 1) / 5,
          beforeElScale = 1 - Math.log(Math.abs(offset - direction) + 1) / 5,
          gap =
            -(cardWidth * (1 - scale)) / 2 +
            -(cardWidth * (1 - beforeElScale)) / 2 +
            113 * beforeElScale;
     

        styles.push({
          JX: Math.abs(offset) / 10,
          gap: gap,
          index: offset,
          direction,
          scale,
          Ov: 0,
          translate: 0,
          zIndex,
        });
        totalWidth += (cardWidth + 113) * scale;
      }
      totalWidth += 113;
    

      var reduce = (totalWidth - rootWidth) / (totalWidth - (cardWidth + 226));

  
      for (let style of styles) {
  
        style.Ov = (cardWidth + 113) * style.scale * reduce;
     
      }
      let current: (typeof styles)[0];
      for (let i of styles) {
        current = i;
        direction = Math.sign(current.index);
        gap = current.gap - current.Ov;
    

        let inbetweenEls = styles.filter((v) => {
          return (
            0 !== current.index &&
            v.direction === current.direction &&
            Math.abs(v.index) < Math.abs(current.index)
          );
        });

        for (let el of inbetweenEls) {
          0 !== current.index &&
            el.direction === current.direction &&
            Math.abs(el.index) < Math.abs(current.index) &&
            (gap += el.gap - el.Ov);
        }

        gap *= direction;
      
        current.translate = gap;
      }

      let leftSideWidth = Math.abs(styles[0].index) * cardWidth;
     
      e = 0;

      for (let style of styles) {
        if (0 > style.direction) {
          e += (cardWidth + 113) * style.scale - style.Ov;
        }
      }

      var a = e - leftSideWidth;
      for (let style of styles) {
        style.translate += a;
      }

      setstyles(
        styles.map(({ zIndex, translate, scale }) => ({
          zIndex,
          translate,
          scale,
        }))
      );
    },
    [container, cardsLength, main, wrapper]
  );

  useLayoutEffect(() => {
    if (cardsLength === 0) return;

    handleHover(Math.floor(cardsLength / 2), "#fff");
  }, [handleHover, cardsLength]);

  const dispatch = useOverlayDispatch();
  return (
    <div
      ref={setMain}
      className={cssStyles.main}
      // style={{ backgroundColor: color, color: textColor }}
    >
      <div className={cssStyles.section}>
        <div className={cssStyles.flex}>
          <div
            onMouseLeave={() => {
              setColor("#fff");
            }}
            ref={setConainer}
            className={cssStyles.container}
          >
            <div className={cssStyles.cardsWrapper} ref={setWrapper}>
              {data &&
                data.map(({ url }, index) => {
                  return (
                    <Card
                      index={index}
                      activeIndex={active}
                      style={styles[index]}
                      cardsLength={cardsLength}
                      key={index}
                      img={url}
                      onHover={handleHover}
                    >
                      <motion.div
                        initial={{ opacity: 0, translateY: 50 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        className="flex w-full flex-col  items-center"
                      >
                        <div className="text-[1.25rem] text-center font-semibold mt-[32px] mb-[24px] tracking-[-.06em] transition-colors">
                          {data[active].title}
                        </div>
                        <Link
                          href="/images"
                          className="leading-[1.01] tracking-[-.04em] text-[0.875rem] transition-colors text-black hover:text-blue-800"
                        >
                          See more
                        </Link>
                      </motion.div>
                    </Card>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
{/* 
      <button
        onClick={() => {
          dispatch({ type: "open", payload: { path: "/images" } });
        }}
        className=" mt-[16px] leading-[1.01] tracking-[-.04em] text-[0.875rem] transition-colors"
      >
        See more
      </button> */}
    </div>
  );
};

export default Stack;
