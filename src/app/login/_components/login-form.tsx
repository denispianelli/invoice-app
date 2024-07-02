'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CircleAlert, Loader2 } from 'lucide-react';
import { authenticate } from '@/app/login/_actions/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm, useFormState } from 'react-hook-form';

import { useToast } from '@/components/ui/use-toast';
import OAuthProviders from '@/components/oauth-providers';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const LoginFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Please enter a valid email.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
  })
  .required();

export default function LoginForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    const result = await authenticate(values);

    if (result) {
      toast({
        description: (
          <div className="flex w-full items-center gap-2">
            <CircleAlert />
            <p>Invalid credentials</p>
          </div>
        ),
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Welcome back!',
      });
    }
  }

  return (
    <Card className="mx-auto w-[320px]">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <FormInput
                        type="email"
                        autoComplete="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>
                          Password <span className="text-red-500">*</span>
                        </FormLabel>
                        <Link
                          href="/users/password_reset"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <FormInput
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <LoginButton />
            </form>
          </Form>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/sign_up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function LoginButton() {
  const { isSubmitting } = useFormState();

  return (
    <Button type="submit" className="mt-2 w-full" aria-disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 size-6 animate-spin" />
          Login
        </>
      ) : (
        'Login'
      )}
    </Button>
  );
}

export { LoginFormSchema };
