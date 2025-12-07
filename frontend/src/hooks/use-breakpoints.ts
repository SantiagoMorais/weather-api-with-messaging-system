import { useEffect, useState } from "react";

export type TBreakpoints = "desktop" | "tablet" | "mobile";

export const useBreakpoints = (): TBreakpoints => {
  const [breakpoint, setBreakpoint] = useState<TBreakpoints>("desktop");

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;

      if (width <= 768) return setBreakpoint("mobile");
      if (width <= 1024) return setBreakpoint("tablet");
      return setBreakpoint("desktop");
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return breakpoint;
};
