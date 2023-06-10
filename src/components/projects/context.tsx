"use client";
import { MotionValue } from "framer-motion";
import * as React from "react";
type State = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  parentRect: React.MutableRefObject<DOMRect | null>;
};
type ProviderProps = {
  children: React.ReactNode;
  x: MotionValue<number>;
  y: MotionValue<number>;
  parentRect: React.MutableRefObject<DOMRect | null>;
};

const Context = React.createContext<State>({
  x: { current: 0 } as unknown as MotionValue<number>,
  y: { current: 0 } as unknown as MotionValue<number>,
  parentRect:{current:null} 
});

function MouseValueProvider({ children, x, y, parentRect }: ProviderProps) {
  return (
    <Context.Provider value={{ x, y, parentRect }}>{children}</Context.Provider>
  );
}

function useMouseValue() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useMouseValue must be used within a MouseValueProvider");
  }
  return context;
}

export { MouseValueProvider, useMouseValue };
