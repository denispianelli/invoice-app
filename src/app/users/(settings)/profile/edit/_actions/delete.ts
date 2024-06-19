'use server';

import { signOut } from '@/auth';
import { sql } from '@vercel/postgres';
import { utapi } from '@/app/server/uploadthing';

export async function deleteAccount(id: string) {
  try {
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    const user = result.rows[0];

    await sql`DELETE FROM users WHERE id = ${id}`;

    if (user.image?.startsWith('https://utfs.io')) {
      const fileKey = user.image.split('https://utfs.io/f/')[1];
      await utapi.deleteFiles(fileKey);
    }

    return { message: 'Your account has been successfully deleted.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete User.' };
  }
}

export async function logout() {
  await signOut();
}
