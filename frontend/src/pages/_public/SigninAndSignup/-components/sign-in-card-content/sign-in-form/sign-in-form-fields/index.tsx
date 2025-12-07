import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { TAuthenticateUser } from "@/core/api/requests/authenticate-user-schema";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const SignInFormFields = ({
  form,
}: {
  form: UseFormReturn<TAuthenticateUser>;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <section className="space-y-2">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Email" />
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
                  placeholder="Senha"
                  type={showPassword ? "text" : "password"}
                  className="flex-1 border-none focus-visible:ring-0"
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
    </section>
  );
};
