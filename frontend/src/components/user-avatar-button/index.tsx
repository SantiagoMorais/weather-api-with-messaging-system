import { getUserProfileData } from "@/api/user/get-user-profile-data";
import { calculateStaleTimeUntilNextHour } from "@/utils/functions/calculate-stale-time-until-next-hour";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { UserSheetDataPending } from "./user-sheet-data-pending";
import { HeaderNavbar } from "@/pages/_private/_home/-components/header-navbar";
import { TooltipMessageTrigger } from "../tooltipMessageTrigger";

export const UserAvatarButton = () => {
  const timeUntilNextHour = calculateStaleTimeUntilNextHour();

  const { isPending, error, data } = useQuery({
    queryKey: ["/users/me"],
    queryFn: async () => await getUserProfileData(),
    staleTime: timeUntilNextHour,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const firstName = data?.name.split(" ")[0];

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer" asChild>
        <div className="group flex items-center gap-2">
          <p className="text-primary hidden duration-300 group-hover:underline group-hover:opacity-70 md:inline">
            Bem vindo, <strong>{firstName ?? "Visitante"}</strong>!
          </p>
          <TooltipMessageTrigger tooltipContent={data?.name ?? "Perfil"}>
            <Avatar className="size-10 duration-300 group-hover:opacity-70">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </TooltipMessageTrigger>
        </div>
      </SheetTrigger>
      <SheetContent className="py-4">
        <SheetHeader>
          <SheetTitle className="border-b pb-1 text-xl">Perfil</SheetTitle>
          <UserSheetDataPending
            data={data}
            error={error}
            isPending={isPending}
          />
        </SheetHeader>
        <SheetFooter className="space-y-2">
          <HeaderNavbar
            onProfile
            className="flex w-full flex-col items-center gap-2 border-t pt-4"
          />
          <Button>Desconectar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
