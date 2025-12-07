import logo from "@/assets/imgs/logo.png";
import { Link } from "@tanstack/react-router";
import { TooltipMessageTrigger } from "../tooltipMessageTrigger";

export const HeaderLogo = () => (
  <TooltipMessageTrigger tooltipContent="Home">
    <Link
      to="/"
      className="group block size-12 overflow-hidden duration-300 hover:scale-110 hover:opacity-80"
    >
      <img src={logo} className="size-full object-cover" />
    </Link>
  </TooltipMessageTrigger>
);
