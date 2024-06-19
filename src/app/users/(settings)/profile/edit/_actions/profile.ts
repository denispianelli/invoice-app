'use server';

import { notFound } from 'next/navigation';
import { isEmailAvailable } from '@/app/sign_up/_actions/sign-up';
import { sql } from '@vercel/postgres';
import { User } from '@/lib/definitions';

type ProfileForm = {
  firstname?: string;
  lastname?: string;
  email: string;
};

export async function updateProfile(profileForm: ProfileForm, id: string) {
  const { firstname, lastname, email } = profileForm;

  const isEmailFree = await isEmailAvailable(email);

  const result = await sql<User>`SELECT * FROM users WHERE id = ${id}`;
  const user = result.rows[0];

  if (!user) return notFound();

  if (email !== user.email && !isEmailFree) {
    return { message: 'Email already in use' };
  }

  await sql<User>`UPDATE users SET firstname = ${firstname}, lastname = ${lastname}, email = ${email} WHERE id = ${id}`;
}
