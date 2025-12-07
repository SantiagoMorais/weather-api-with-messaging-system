import type { JSX } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

/**
 * TooltipMessageTrigger is a wrapper component that displays a tooltip when hovering over its children.
 *
 * @param {React.ReactNode} props.children - The content that will trigger the tooltip on hover.
 * @param {string} props.tooltipContent - The text to display inside the tooltip.
 *
 * @returns {JSX.Element} A Tooltip component with the specified content.
 *
 * @example
 * ```tsx
 * <TooltipMessageTrigger tooltipContent="This is a helpful message">
 *   <button>Hover me</button>
 * </TooltipMessageTrigger>
 * ```
 */
export const TooltipMessageTrigger = ({
  tooltipContent,
  children,
  align,
}: React.PropsWithChildren & {
  tooltipContent: string;
  align?: "center" | "end" | "start";
}): JSX.Element => {
  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent align={align}>
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
};
