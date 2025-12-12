import { deleteUser } from "@/api/user/delete-user";
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
import { useEffect, useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { toast } from "sonner";

export const DeleteUserButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [countDown, setCountDown] = useState<number>(5);

  useEffect(() => {
    if (countDown === 0) return;

    setTimeout(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
  }, [countDown]);

  const onSubmit = async () =>
    await deleteUser()
      .then(() => {
        toast.warning("Usuário deletado. Vamos sentir sua falta!");
        localStorage.removeItem("gdash-token");
        navigate({ to: "/login", from: "/" });
      })
      .catch((error) => {
        console.error(error);
        let errorMessage =
          "Um erro inesperado ocorreu durante a exclusão dos dados. Por favor, tente novamente mais tarde.";
        if (isAxiosError(error)) {
          if (error.status === 400)
            errorMessage =
              "Erro: Bad Request - O servidor não recebeu todos os dados necessários para executar essa ação. Tente novamente mais tarde.";
          if (error.status === 404)
            errorMessage =
              "Erro: Not found - Usuário não encontrado. Recarregue a página e tente novamente";
        }

        toast.error(errorMessage);
      })
      .finally(() => setIsLoading(false));

  return (
    <AlertDialog>
      <Button asChild variant="outline" onClick={() => setCountDown(5)}>
        <AlertDialogTrigger>Excluir conta</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir conta</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza? Essa ação não pode ser desfeita e você perderá o
            seu cadastro. Só será possível acessar novamente o site criando um
            novo usuário.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" asChild disabled={isLoading}>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
          </Button>
          <Button onClick={onSubmit} disabled={isLoading || countDown !== 0}>
            {isLoading ? (
              <TbLoader2 className="size-5 animate-spin" />
            ) : (
              `Confirmar${countDown > 0 ? ` (${countDown})` : ""}`
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
