import React, { useContext, useEffect, useState } from "react";
import { ThemeTogglerContext } from "./theme-toggler-context";

export const ThemeTogglerProvider = ({ children }: React.PropsWithChildren) => {
  const [isThemeDark, setIsThemeDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("gdash-theme");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("gdash-theme", isThemeDark ? "true" : "false");
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
  if (!context)
    throw new Error(
      "The useThemeToggler must be wrapped by a ThemeTogglerProvider"
    );
  return context;
};
