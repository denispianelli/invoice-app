'use server';

import { notFound } from 'next/navigation';
import { utapi } from '@/app/server/uploadthing';
import { sql } from '@vercel/postgres';
import { User } from '@/lib/definitions';

export async function updateUserAvatar(id: string, imageUrl: string) {
  try {
    const result = await sql<User>`SELECT * FROM users WHERE id = ${id}`;
    const user = result.rows[0];

    if (!user) {
      return notFound();
    }

    const prevImage = user.image;

    if (prevImage?.startsWith('https://utfs.io')) {
      const fileKey = prevImage.split('https://utfs.io/f/')[1];
      await utapi.deleteFiles(fileKey);
    }

    await sql<User>`UPDATE users SET image = ${imageUrl} WHERE id = ${id}`;
  } catch (error) {
    console.error('Error updating user:', error);
  }

  return { uploadedBy: id };
}

export async function removeUserAvatar(id: string) {
  try {
    const result = await sql<User>`SELECT image FROM users WHERE id = ${id}`;
    const user = result.rows[0];

    if (!user) {
      return notFound();
    }

    const imageUrl = user.image;

    if (!imageUrl) {
      return;
    }

    const fileKey = imageUrl.split('https://utfs.io/f/')[1];

    await utapi.deleteFiles(fileKey);

    await sql<User>`UPDATE users SET image = NULL WHERE id = ${id}`;
  } catch (error) {
    console.error('Error removing user avatar:', error);
  }
}
