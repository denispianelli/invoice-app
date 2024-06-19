import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { VerifyEmailForm } from './_components/verify-email-form';
import { sql } from '@vercel/postgres';
import { User } from '@/lib/definitions';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    email?: string;
  };
}) {
  const session = await auth();

  const email = searchParams?.email;

  if (session || !email) {
    redirect('/');
  }

  const result = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
  const user = result.rows[0];

  if (!user || user.email_verified) {
    redirect('/');
  }

  return (
    <main className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center bg-muted/40">
      <VerifyEmailForm />
    </main>
  );
}
