import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import type { User } from '@/lib/definitions';
import PostgresAdapter from '@auth/pg-adapter';
import { Pool } from '@neondatabase/serverless';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email = ${email}`;

    return user.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user');
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
  return {
    ...authConfig,
    session: { strategy: 'jwt' },
    adapter: PostgresAdapter(pool),
    providers: [
      Credentials({
        async authorize(credentials) {
          const { email, password } = credentials;
          const user = await getUser(email as string);

          if (!user) return null;

          const isValidPassword =
            user.password &&
            (await bcrypt.compare(password as string, user.password));

          if (isValidPassword) return user;

          return null;
        },
      }),
    ],
    callbacks: {
      jwt({ token, user }) {
        if (user) {
          // User is available during sign-in
          token.id = user.id;
        }
        return token;
      },
      session({ session, token }) {
        session.user.id = token.id as string;
        return session;
      },
    },
  };
});
