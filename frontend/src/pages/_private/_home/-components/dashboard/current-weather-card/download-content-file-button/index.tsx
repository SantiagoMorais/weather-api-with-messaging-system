import { downloadWeatherData } from "@/api/weather-log/download-weather-data";
import { TooltipMessageTrigger } from "@/components/tooltipMessageTrigger";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { MdDownload } from "react-icons/md";
import { toast } from "sonner";

export const DownloadContentFileButton = ({
  className,
  buttonClassName,
}: {
  className?: string;
  buttonClassName?: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>();

  const download = async (format: "csv" | "xlsx") => {
    setIsLoading(true);
    await downloadWeatherData({ format })
      .then((buffer) => {
        const blob = new Blob([buffer], {
          type:
            format === "xlsx"
              ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              : "text/csv;charset=utf-8;",
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `weather-data.${format}`;
        a.click();

        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao baixar arquivo. Tente novamente mais tarde.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          "absolute top-4 left-4 opacity-50 hover:opacity-100",
          className
        )}
      >
        <TooltipMessageTrigger tooltipContent="Download dos dados">
          <Button
            size="icon"
            className={cn(
              "border-foreground/60 border bg-transparent bg-none",
              buttonClassName
            )}
          >
            <MdDownload className="text-foreground size-6" />
          </Button>
        </TooltipMessageTrigger>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="pb-4">
          <AlertDialogTitle>Baixar dados de clima</AlertDialogTitle>
          <AlertDialogDescription>
            Escolha abaixo qual formato terá o arquivo baixado para continuar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={() => download("csv")}
          >
            {isLoading ? (
              <Loader2 className="mx-4 size-5 animate-spin" />
            ) : (
              "CSV"
            )}
          </Button>
          <Button disabled={isLoading} onClick={() => download("xlsx")}>
            {isLoading ? (
              <Loader2 className="mx-4 size-5 animate-spin" />
            ) : (
              "XLSX"
            )}
          </Button>

          <AlertDialogCancel
            disabled={isLoading}
            className="border-foreground hover:bg-destructive/70"
          >
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
