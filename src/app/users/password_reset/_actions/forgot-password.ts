'use server';

import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { sendPasswordResetEmail } from '@/services/email-service';
import { User } from '@/lib/definitions';

type ForgotPasswordForm = {
  email: string;
};

export async function forgotPassword(forgotPasswordForm: ForgotPasswordForm) {
  const { email } = forgotPasswordForm;

  const result =
    await sql<User>`SELECT email FROM users WHERE email = ${email}`;
  const user = result.rows[0];

  if (!user) {
    return {
      message:
        'If the email is associated with an account, a password reset link will be sent.',
    };
  }

  const token = uuidv4();
  const hashedToken = await bcrypt.hash(token, 10);
  const tokenExpiry = new Date();
  tokenExpiry.setHours(tokenExpiry.getHours() + 10);
  const tokenExpiryString = tokenExpiry.toISOString();

  await sql<User>`UPDATE users SET otp = ${hashedToken}, otp_expires = ${tokenExpiryString} WHERE email = ${email}`;

  await sendPasswordResetEmail(email, token);

  return {
    message:
      'If the email is associated with an account, a password reset link will be sent.',
  };
}
