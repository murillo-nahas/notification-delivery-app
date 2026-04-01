import { Link, useNavigate } from "react-router";

import { ArrowLeft } from "lucide-react";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegister } from "@/hooks/use-register";

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
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string("Name is required"),
  email: z.email("Email is required"),
  phoneNumber: z.string().min(10, "Phone number should have at least 10 characters"),
  password: z.string().min(6, "Password should have at least 6 characters"),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function Register() {
  const { mutate, isPending } = useRegister();
  const navigate = useNavigate();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterSchema): void => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Registered successfully, please login to continue");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
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
        <Link to="/login">
          <ArrowLeft className="text-foreground hover:text-muted-foreground h-6 w-6 my-4" />
        </Link>

        <h1 className="text-xl font-bold text-foreground">Welcome to Admin</h1>
        <p className="mt-1 mb-4 text-sm text-muted-foreground">
          Create your account and start sending notifications
        </p>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
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
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
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
                {isPending ? "Creating account..." : "Create account"}
              </Button>
            </div>
          </form>
        </Form>

        <p className="mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Click here to login.
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
