import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { User } from '@/lib/definitions';

export default async function verifyToken(token: string, email: string) {
  try {
    const result = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
    const user = result.rows[0];

    if (!user) notFound();

    if (!user.otp || !user.otp_expires) return false;

    const isTokenMatch = await bcrypt.compare(token, user.otp);

    if (!isTokenMatch) return false;

    const isTokenExpired = new Date() > user.otp_expires;

    if (isTokenExpired) return false;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
