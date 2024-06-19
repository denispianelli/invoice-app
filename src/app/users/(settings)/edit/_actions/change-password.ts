'use server';
import { sql } from '@vercel/postgres';

import { notFound } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { User } from '@/lib/definitions';

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export async function changePassword(
  changePasswordForm: ChangePasswordForm,
  id: string,
) {
  const { currentPassword, newPassword, confirmPassword } = changePasswordForm;

  try {
    const result = await sql<User>`SELECT * FROM users WHERE id = ${id}`;
    const user = result.rows[0];
    if (!user) return notFound();
    const isValidPassword =
      user.password && (await bcrypt.compare(currentPassword, user.password));
    if (!isValidPassword) {
      return {
        errors: {
          currentPassword: 'Your current password is incorrect.',
        },
      };
    }
    if (newPassword !== confirmPassword) {
      return {
        errors: {
          confirmPassword: ['Passwords do not match.'],
        },
      };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await sql<User>`UPDATE users SET password = ${hashedPassword} WHERE id = ${id}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to update password.',
    };
  }
  return {
    message: 'Password updated successfully.',
  };
}
