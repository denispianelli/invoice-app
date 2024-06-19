'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { User } from '@/lib/definitions';

type LoginForm = {
  email: string;
  password: string;
};

export async function authenticate(loginForm: LoginForm) {
  const { email } = loginForm;

  try {
    const result = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
    const user = result.rows[0];

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    if (user.email_verified === false) {
      redirect(`/sign_up/verify_email?email=${encodeURIComponent(email)}`);
    }

    await signIn('credentials', loginForm);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid credentials' };
        default:
          return { message: 'Something went wrong' };
      }
    }
    throw error;
  }
}

export async function GoogleSignIn() {
  await signIn('google');
}

export async function GitHubSignIn() {
  await signIn('github');
}
