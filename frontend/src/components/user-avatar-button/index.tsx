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
          <p className="text-primary duration-300 group-hover:underline group-hover:opacity-70">
            Bem vindo, <strong>{firstName}</strong>!
          </p>
          <Avatar className="size-10 duration-300 group-hover:opacity-70">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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
        <SheetFooter>
          <Button>Desconectar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
