import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import {
  authenticateUserSchema,
  type TAuthenticateUser,
} from "@/core/api/requests/authenticate-user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbLoader2 } from "react-icons/tb";
import { SignInFormFields } from "./sign-in-form-fields";
import { authenticateUser } from "@/api/user/authenticate-user";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<TAuthenticateUser>({
    resolver: zodResolver(authenticateUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: TAuthenticateUser) => {
    setIsLoading(true);
    await authenticateUser(data)
      .then(({ access_token }) => {
        localStorage.setItem("gdash-token", access_token);
        toast.success("Bem-vindo!");
        navigate({ to: "/", from: "/login" });
      })
      .catch((error) => {
        console.error(error);
        let errorMessage =
          "Um erro inesperado ocorreu durante a autenticação. Por favor, tente novamente mais tarde.";
        if (isAxiosError(error)) {
          if (error.status === 400)
            errorMessage =
              "Erro: Bad Request - Por favor, confira o preenchimento de todos os campos novamente.";
          if (error.status === 401) {
            form.setError("root", { message: "Email ou senha inválidos" });
            return;
          }
          if (error.status === 409)
            errorMessage = "Erro: Unauthorized - Email ou senha inválidos.";
        }

        toast.error(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SignInFormFields form={form} />
        <Button className="w-full" disabled={isLoading}>
          {isLoading ? <TbLoader2 className="size-5 animate-spin" /> : "Login"}
        </Button>
        {form.formState.errors.root && (
          <FormMessage className="text-center">
            {" "}
            {form.formState.errors.root.message}{" "}
          </FormMessage>
        )}
      </form>
    </Form>
  );
};
