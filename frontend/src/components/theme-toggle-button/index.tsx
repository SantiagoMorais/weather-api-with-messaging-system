import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipMessageTrigger } from "@/components/tooltipMessageTrigger";
import { useThemeToggler } from "@/contexts/theme-toggler-context";
import { cn } from "@/lib/utils";

export const ThemeTogglerButton = ({ className }: { className?: string }) => {
  const { handleThemeToggler, isThemeDark } = useThemeToggler();

  return (
    <TooltipMessageTrigger
      tooltipContent={isThemeDark ? "Tema claro" : "Tema escuro"}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleThemeToggler}
        className={cn("", className)}
      >
        <motion.div
          key={isThemeDark ? "dark" : "light"}
          initial={{ rotate: -90, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {isThemeDark ? <Moon /> : <Sun />}
        </motion.div>
      </Button>
    </TooltipMessageTrigger>
  );
};
