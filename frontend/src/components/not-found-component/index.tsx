import loginBackground from "@/assets/imgs/login-background.webp";
import { HeaderLogo } from "@/components/header-logo";
import { ThemeTogglerButton } from "@/components/theme-toggle-button";
import { UserAvatarButton } from "@/components/user-avatar-button";
import { Link } from "@tanstack/react-router";
import { TbMoodSad } from "react-icons/tb";
import { Button } from "../ui/button";

export const NotFoundComponent = () => {
  return (
    <>
      <img
        src={loginBackground}
        className="fixed size-full object-cover opacity-40"
      />
      <main className="relative z-10 flex min-h-dvh w-full max-w-(--breakpoint-2xl) flex-col overflow-x-hidden overflow-y-auto pb-8 md:pb-16">
        <header className="flex w-full items-center gap-4 px-3 py-4 backdrop-blur-sm md:p-6 md:px-10">
          <HeaderLogo />
          <ThemeTogglerButton className="ml-auto" />
          <UserAvatarButton />
        </header>
        <section className="flex size-full flex-1 p-4">
          <div className="bg-background/60 flex flex-1 flex-col items-center justify-center gap-4 rounded-lg p-4 backdrop-blur-sm">
            <TbMoodSad className="text-primary size-60" />
            <h2 className="text-primary flex flex-col text-center text-5xl font-black">
              ERRO 404
              <span className="text-center text-2xl font-medium">
                Ops. Página não encontrada!
              </span>
            </h2>
            <p className="text-center text-lg">
              Para retornar à página principal
              <Button
                asChild
                variant="link"
                className="px-1.5 text-lg capitalize"
              >
                <Link to="/">clique aqui</Link>
              </Button>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
};
