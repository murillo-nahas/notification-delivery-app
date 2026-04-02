import { Link } from "react-router";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthLayout } from "./components/auth-layout";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { useLogin } from "@/hooks/use-login";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.email("Email is required"),
  password: z.string().min(6, "Password should have at least 6 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
  const { mutate, isPending } = useLogin();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema): void => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Registered successfully, please login to continue");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full px-8">
        <h1 className="text-xl font-bold text-foreground">Welcome to Admin</h1>
        <p className="mt-1 mb-4 text-sm text-muted-foreground">Login to your account to continue</p>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4">
              <Button disabled={isPending} variant="default" type="submit" className="mt-4 w-full">
                {isPending ? "Logging..." : "Login"}
              </Button>
            </div>
          </form>
        </Form>

        <p className="mt-6 text-sm text-muted-foreground">
          Does not have an account?{" "}
          <Link to="/register" className="text-primary">
            Click here to register.
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
