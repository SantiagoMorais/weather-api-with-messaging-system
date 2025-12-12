import { SheetDescription } from "@/components/ui/sheet";
import type { IUserSheetDataPendingInterface } from "@/core/interfaces/user-sheet-data-pending";
import { format } from "date-fns";
import { ListX, Loader2 } from "lucide-react";

export const UserSheetDataPending = ({
  data,
  error,
  isPending,
}: IUserSheetDataPendingInterface) => {
  const dataResult = () => {
    if (isPending) return <Loader2 className="mx-auto size-8 animate-spin" />;
    if (error)
      return (
        <span className="block space-x-2">
          <ListX className="text-destructive" /> Data not found!
        </span>
      );

    if (data)
      return (
        <>
          <span className="block">
            <strong>Usuário:</strong> {data?.name}
          </span>
          <span className="block">
            <strong>Cliente desde:</strong>{" "}
            {format(data.createdAt, "dd/MM/yyyy")}
          </span>
          <span className="block">
            <strong>Email:</strong> {data?.email}
          </span>
        </>
      );
  };

  return (
    <SheetDescription className="text-md space-y-2 pt-2">
      {dataResult()}
    </SheetDescription>
  );
};
