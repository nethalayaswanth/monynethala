import React, {
  PropsWithChildren,
  CSSProperties,
  forwardRef,
  ForwardedRef,
  useRef,
  HTMLAttributes,
} from "react";

export type ItemRef = ForwardedRef<HTMLDivElement>;

export type ItemProps = {
  setNodes?: (node: HTMLDivElement) => void;
} &  HTMLAttributes<HTMLDivElement>;

const CarouselItem = forwardRef(
  (props: PropsWithChildren<ItemProps>, ref: ItemRef) => {
    const { className, children, setNodes, ...rest } = props;

    const container = useRef<HTMLDivElement | null>(null);

    const setContainer: React.RefCallback<HTMLDivElement> = (
      node: HTMLDivElement | null
    ) => {
      if (!node) return;
      if (ref) {
        var set = typeof ref === "function" ? ref(node) : (ref.current = node);
      }

      setNodes?.(node);

      container.current = node;
    };

    return (
      <div
        className={`carousel-item ${className ? className : ""}`}
        ref={setContainer}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

CarouselItem.displayName = "CarouselItem";

export default CarouselItem;
