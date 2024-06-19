'use server';

import { headers } from 'next/headers';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';
import { User } from '@/lib/definitions';

const FormSchema = z.object({
  email: z.string().email(),
  pin: z.string().min(6, {
    message: 'Your code must be 6 characters.',
  }),
});

export type verifyOTPState =
  | {
      errors?: {
        email?: string[];
        pin?: string[];
      };
      errorMessage?: string;
      successMessage?: string;
    }
  | undefined;

export async function verifyOTP(prevState: verifyOTPState, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    email: formData.get('email'),
    pin: formData.get('pin'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const headersList = headers();
    const userIP = headersList.get('x-forwarded-for') as string;

    const { limit } = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(5, '600 s'),
    });

    const { success } = await limit(userIP);

    if (!success) {
      return {
        errorMessage:
          'Too many requests. Please wait a bit before trying again.',
      };
    }

    const { email, pin } = validatedFields.data;

    const result = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
    const user = result.rows[0];

    if (!user) {
      return {
        errors: {
          pin: ['Invalid code'],
        },
      };
    }

    if (user.email_verified) {
      return {
        errorMessage: 'User already verified',
      };
    }

    if (!user.otp || !user.otp_expires) {
      return {
        errors: {
          pin: ['Invalid code'],
        },
      };
    }

    const isPinValid = await bcrypt.compare(pin, user.otp);

    if (!isPinValid) {
      return {
        errors: {
          pin: ['Invalid code'],
        },
      };
    }

    const isOtpExpired = new Date() > user.otp_expires;

    if (isOtpExpired) {
      return {
        errors: {
          pin: ['Code expired'],
        },
      };
    }

    await sql<User>`UPDATE users SET otp = NULL, otp_expires = NULL, email_verified = true WHERE email = ${email}`;
  } catch (error) {
    throw error;
  }

  return {
    successMessage:
      'Your email has been verified. Now redirecting to login page...',
  };
}
