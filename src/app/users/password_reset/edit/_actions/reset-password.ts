'use server';

import { User } from '@/lib/definitions';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { notFound } from 'next/navigation';

type ResetPasswordForm = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

export async function resetPassword(resetPasswordForm: ResetPasswordForm) {
  const { email, newPassword, confirmPassword } = resetPasswordForm;

  try {
    const result = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
    const user = result.rows[0];

    if (!user) {
      notFound();
    }

    if (newPassword !== confirmPassword) {
      return {
        errors: {
          confirmPassword: ['Passwords do not match.'],
        },
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await sql<User>`UPDATE users SET password = ${hashedPassword}, email_verified = true, otp = null, otp_expires = null WHERE email = ${email}`;

    return {
      message: 'Your password has been successfully updated.',
    };
  } catch (error) {
    return {
      message: 'Database Error: Failed to update password.',
    };
  }
}
