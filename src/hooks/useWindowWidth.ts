import { useState, useEffect } from "react";
import { WindowSize } from "../types";

export const useWindowWidth = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};
