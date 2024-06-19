'use server';

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { sendMail } from '@/services/email-service';
import { sql } from '@vercel/postgres';
import { User } from '@/lib/definitions';
import { v4 as uuidv4 } from 'uuid';

type SignupForm = {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
};

export async function signup(signUpForm: SignupForm) {
  const { email, password, firstname, lastname } = signUpForm;

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = crypto.randomInt(100000, 999999);
  console.log('signup ~ otp:', otp);

  const hashedOtp = await bcrypt.hash(otp.toString(), 10);
  const otpExpires = new Date();
  otpExpires.setHours(otpExpires.getHours() + 24);
  const otpExpiresString = otpExpires.toISOString();

  try {
    await sendMail(otp.toString(), email);

    await sql<User>`INSERT INTO users (id, email, password, firstname, lastname, otp, otp_expires) VALUES (${uuidv4()}, ${email}, ${hashedPassword}, ${firstname}, ${lastname}, ${hashedOtp}, ${otpExpiresString})`;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
        return { message: 'Email already in use' };
      }
    }
    throw error;
  }

  redirect(`/sign_up/verify_email?email=${encodeURIComponent(email)}`);
}

export async function isEmailAvailable(email: string): Promise<boolean> {
  try {
    const result = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
    const user = result.rows[0];
    return !user;
  } catch (error) {
    throw error;
  }
}
