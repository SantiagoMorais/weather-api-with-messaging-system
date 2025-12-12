import { logoutUser } from "@/api/user/logout-user";
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
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { toast } from "sonner";

export const DisconnectButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async () =>
    await logoutUser()
      .then(() => {
        toast.success("Desconectado. Para retornar faça o login novamente!");
        localStorage.removeItem("gdash-token");
        navigate({ to: "/", from: "/login" });
      })
      .catch((error) => {
        console.error(error);
        let errorMessage =
          "Um erro inesperado ocorreu durante a desconexão. Por favor, tente novamente mais tarde.";
        if (isAxiosError(error)) {
          if (error.status === 400)
            errorMessage =
              "Erro: Bad Request - Seu token de acesso é inválido ou sua sessão já expirou. Por favor, recarregue a página.";
          if (error.status === 404)
            errorMessage =
              "Erro: Not found - Sua autenticação já não é mais válida. Recarregue a página.";
        }

        toast.error(errorMessage);
      })
      .finally(() => setIsLoading(false));
  return (
    <AlertDialog>
      <Button asChild>
        <AlertDialogTrigger>Desconectar</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Desconectar</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza? Caso confirme você precisará realizar o login
            novamente para ter acesso ao conteúdo do site.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" asChild>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
          </Button>
          <Button onClick={onSubmit}>
            {isLoading ? (
              <TbLoader2 className="size-5 animate-spin" />
            ) : (
              "Confirmar"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
