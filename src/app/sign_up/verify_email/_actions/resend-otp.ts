'use server';

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendMail } from '@/services/email-service';
import { sql } from '@vercel/postgres';
import { User } from '@/lib/definitions';

export async function resendOtp(email: string) {
  try {
    const result = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
    const user = result.rows[0];

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    if (user.email_verified) {
      return {
        message: 'Email already verified',
      };
    }

    const otp = crypto.randomInt(100000, 999999);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    const otpExpires = new Date();
    otpExpires.setHours(otpExpires.getHours() + 24);
    const otpExpiresString = otpExpires.toISOString();

    await sql<User>`UPDATE users SET otp = ${hashedOtp}, otp_expires = ${otpExpiresString} WHERE email = ${email}`;

    await sendMail(otp.toString(), email);

    return {
      message: 'A new code has been sent to your email.',
    };
  } catch (error) {
    throw error;
  }
}
