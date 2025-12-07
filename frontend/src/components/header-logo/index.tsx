import logo from "@/assets/imgs/logo.png";
import { Link } from "@tanstack/react-router";

export const HeaderLogo = () => (
  <Link
    to="/"
    className="group block size-12 overflow-hidden duration-300 hover:scale-110 hover:opacity-80"
    title="Home"
  >
    <img src={logo} className="size-full object-cover" />
  </Link>
);
