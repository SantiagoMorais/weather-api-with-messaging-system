"use client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeTogglerContext } from "./theme-toggler-context";

export const ThemeTogglerProvider = ({ children }: React.PropsWithChildren) => {
  const [isThemeDark, setIsThemeDark] = useState<boolean>(false);

  useEffect(() => {
    const handleSetTheme = () => {
      const storedTheme = localStorage.getItem("alivare-theme");
      return storedTheme !== null
        ? setIsThemeDark(JSON.parse(storedTheme))
        : setIsThemeDark(false);
    };

    handleSetTheme();
  }, []);

  useEffect(() => {
    localStorage.setItem("alivare-theme", isThemeDark ? "true" : "false");
    document.body.classList.toggle("dark", isThemeDark);
  }, [isThemeDark]);

  const handleThemeToggler = () => {
    setIsThemeDark((prevValue) => !prevValue);
  };

  return (
    <ThemeTogglerContext.Provider value={{ isThemeDark, handleThemeToggler }}>
      {children}
    </ThemeTogglerContext.Provider>
  );
};

export const useThemeToggler = () => {
  const context = useContext(ThemeTogglerContext);
  // eslint-disable-next-line
  if (!context)
    throw new Error(
      "The useThemeToggler must be wrapped by a ThemeTogglerProvider"
    );
  return context;
};
