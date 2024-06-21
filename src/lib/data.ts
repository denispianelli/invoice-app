import { sql } from '@vercel/postgres';
import { Invoice } from './definitions';

export async function fetchInvoices({ id }: { id: string }) {
  try {
    const data = await sql<Invoice>`
		SELECT * FROM invoices where user_id = ${id};
		`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices data.');
  }
}
