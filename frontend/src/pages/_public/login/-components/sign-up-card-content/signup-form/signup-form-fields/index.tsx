import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { TCreateUser } from "@/core/schemas/create-user-schema";
import { Input } from "@/components/ui/input";

export const SignUpFormFields = ({
  form,
}: {
  form: UseFormReturn<TCreateUser>;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  return (
    <section className="space-y-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Nome"
                className="input-bordered input w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Email" className="input w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <div className="border-muted-foreground/60 focus-visible:ring-primary focus-within:ring-primary/50 focus-within:border-primary flex rounded-md border duration-200 focus-within:ring-3 focus-within:ring-offset-0">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  className="flex-1 border-none px-2 py-1 focus-visible:ring-0"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="repeatPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Repita a Senha</FormLabel>
            <FormControl>
              <div className="border-muted-foreground/60 focus-visible:ring-primary focus-within:ring-primary/50 focus-within:border-primary flex rounded-md border duration-200 focus-within:ring-3 focus-within:ring-offset-0">
                <Input
                  {...field}
                  type={showRepeatPassword ? "text" : "password"}
                  placeholder="Repita a Senha"
                  className="flex-1 border-none px-2 py-1 focus-visible:ring-0"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowRepeatPassword((prev) => !prev)}
                >
                  {showRepeatPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};
