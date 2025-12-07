import { createContext } from "react";
import type { IThemeTogglerContextInterface } from "./theme-toggler-context-interface";

export const ThemeTogglerContext = createContext<IThemeTogglerContextInterface>(
  {
    isThemeDark: false,
    handleThemeToggler: () => {},
  }
);
