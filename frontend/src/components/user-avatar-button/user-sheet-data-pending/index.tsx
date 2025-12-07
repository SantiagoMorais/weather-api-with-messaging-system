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
        <p className="space-x-2">
          <ListX className="text-destructive" /> Data not found!
        </p>
      );

    return (
      <>
        <p>
          <strong>Usuário:</strong> {data?.name}
        </p>
        <p>
          <strong>Cliente desde:</strong>{" "}
          {format(new Date(data!.createdAt), "dd/mm/yyyy")}
        </p>
        <p>
          <strong>Email:</strong> {data?.email}
        </p>
      </>
    );
  };

  return (
    <SheetDescription className="text-md space-y-2 pt-2">
      {dataResult()}
    </SheetDescription>
  );
};
