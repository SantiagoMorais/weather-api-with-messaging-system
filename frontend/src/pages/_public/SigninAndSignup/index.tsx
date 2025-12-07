import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState } from "react";
import { LoginBackground } from "./-components/login-background";
import { SignInCardContent } from "./-components/sign-in-card-content";
import { SignUpCardContent } from "./-components/sign-up-card-content";

export const Route = createFileRoute("/_public/SigninAndSignup/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [pageSelected, setPageSelected] = useState<"signin" | "signup">(
    "signin"
  );

  const changeAuthPage = () =>
    setPageSelected((prev) => (prev === "signin" ? "signup" : "signin"));

  const [direction, setDirection] = useState<1 | -1>(1);

  const handleChangePage = () => {
    setDirection(pageSelected === "signin" ? 1 : -1);
    changeAuthPage();
  };

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <main className="flex h-dvh w-full items-center justify-center p-4">
      <span
        id="rewardId"
        className="fixed right-1/2 bottom-1/5 z-20 -translate-x-1/2"
      />
      <LoginBackground />
      <motion.div
        className="z-10 w-full max-w-96"
        initial={{ opacity: 0, x: -10, y: 20, rotate: -10 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Card className="w-full max-w-96 overflow-hidden duration-300">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={pageSelected}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.3 }}
            >
              {pageSelected === "signin" ? (
                <SignInCardContent changeAuthPage={handleChangePage} />
              ) : (
                <SignUpCardContent changeAuthPage={handleChangePage} />
              )}
            </motion.div>
          </AnimatePresence>
        </Card>
      </motion.div>
    </main>
  );
}
