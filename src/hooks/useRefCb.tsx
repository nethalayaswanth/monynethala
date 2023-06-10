import React, { useCallback, RefObject,RefCallback, useRef } from "react";

const useRefCb = <T,>(): [RefObject<T>, RefCallback<T>] => {
  const ref = useRef<T | null>(null);
  const setRef: React.RefCallback<T> = useCallback((node) => {
    ref.current = node;
  }, []);

  return [ref, setRef];
};


export default useRefCb;