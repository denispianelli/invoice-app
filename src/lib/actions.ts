'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function deleteInvoice({ id }: { id: string }) {
  try {
    await sql`
			DELETE FROM invoices WHERE id = ${id} RETURNING *;
		`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete invoice data.');
  }

  revalidatePath('/invoices');
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

  revalidatePath('/invoices');
}
