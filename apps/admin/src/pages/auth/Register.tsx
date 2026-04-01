import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { AuthLayout } from './components/auth-layout';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const registerSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.email('Email invalid'),
  phoneNumber: z.string().min(10, 'Phone number is too short'),
  password: z.string().min(6, 'Password should have at least 6 characters'),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function Register() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
  });

  const onSubmit = (data: RegisterSchema): void => {
    console.log(data);
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full px-8">
        <Link to="/login">
          <ArrowLeft className="text-foreground hover:text-gray-600 h-6 w-6 my-4" />
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
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="mt-4">
              <Button variant="default" type="submit" className="mt-4 w-full">
                Create account
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
