import { useContext } from "react";
import { ThemeTogglerContext } from "./theme-toggler-context";

export const useThemeToggler = () => {
  const context = useContext(ThemeTogglerContext);
  // eslint-disable-next-line
  if (!context)
    throw new Error(
      "The useThemeToggler must be wrapped by a ThemeTogglerProvider"
    );
  return context;
};
