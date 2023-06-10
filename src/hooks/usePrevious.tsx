import { useIsomorphicLayoutEffect } from "framer-motion";
import { useRef } from "react";
export const usePreviousPersistant =<T,>(value:T):T => {
 
  const ref = useRef({
    value: value,
    prev: null as T,
  });

  const current = ref.current.value;

 
  if (value !== current) {
    ref.current = {
      value: value,
      prev: current,
    };
  }

  return ref.current.prev;
};


const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T>();

  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevious;
