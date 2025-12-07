import loginBackground from "@/assets/imgs/login-background.webp";
import { motion } from "framer-motion";

export const LoginBackground = () => (
  <>
    <div className="from-background fixed top-0 left-0 z-10 h-full w-full bg-linear-to-bl to-transparent opacity-80" />
    <motion.img
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 0.5, scale: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      src={loginBackground}
      className="fixed z-0 size-full object-cover opacity-50"
    />
  </>
);
