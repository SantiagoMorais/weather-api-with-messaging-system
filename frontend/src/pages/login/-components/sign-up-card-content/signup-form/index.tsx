import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbLoader2 } from "react-icons/tb";

import { createUser } from "@/api/user/create-user";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  createUserSchema,
  type TCreateUser,
} from "@/core/api/requests/create-user-schema";
import { isAxiosError } from "axios";
import { useReward } from "react-rewards";
import { toast } from "sonner";
import { SignUpFormFields } from "./signup-form-fields";

export const SignUpForm = ({
  changeAuthPage,
}: {
  changeAuthPage: () => void;
}) => {
  const { reward } = useReward("rewardId", "confetti");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TCreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = async (data: TCreateUser) => {
    setIsLoading(true);
    await createUser(data)
      .then(() => {
        toast.success("Account created successfully! \nWelcome!");
        changeAuthPage();
        reward();
      })
      .catch((error) => {
        console.error(error);
        let errorMessage =
          "Um erro inesperado ocorreu durante a criação de usuário. Por favor, tente novamente mais tarde.";
        if (isAxiosError(error)) {
          if (error.status === 400)
            errorMessage =
              "Erro: Bad Request - Por favor, confira o preenchimento de todos os campos novamente.";
          if (error.status === 409)
            errorMessage =
              "Erro: Conflict - Já existe um usuário cadastrado com este e-mail.";
        }

        toast.error(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SignUpFormFields form={form} />
        <Button className="w-full" disabled={isLoading}>
          {isLoading ? (
            <TbLoader2 className="size-5 animate-spin" />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
    </Form>
  );
};
