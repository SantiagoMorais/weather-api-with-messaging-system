import { FaCheck, FaExclamation } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import type { ToasterProps } from "sonner";

export const toasterIconsList: ToasterProps = {
  icons: {
    success: <FaCheck className="text-green-500" />,
    error: <FaXmark className="tex-red-500" />,
    info: <FaExclamation className="text-primary" />,
  },
};
