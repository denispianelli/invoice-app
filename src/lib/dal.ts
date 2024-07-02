import 'server-only';

import { auth } from '@/auth';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { User } from './definitions';

export const getUser = cache(async () => {
  try {
    const session = await auth();
    if (!session) return null;
    const result =
      await sql<User>`SELECT id, email, name, firstname, lastname, image FROM users WHERE email = ${session?.user?.email}`;
    const user = result.rows[0];

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const verifySession = cache(async () => {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return { isAuth: true, userId: session?.user?.id };
});
