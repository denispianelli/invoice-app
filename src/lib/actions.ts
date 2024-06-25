'use server';

import { sql } from '@vercel/postgres';

export async function deleteInvoice({ id }: { id: string }) {
  try {
    await sql`
			DELETE FROM invoices WHERE id = ${id} RETURNING *;
		`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete invoice data.');
  }
}

export async function markInvoiceAsPaid({ id }: { id: string }) {
  try {
    await sql`
			UPDATE invoices SET status = 'paid' WHERE id = ${id} RETURNING *;
		`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to mark invoice as paid.');
  }
}
