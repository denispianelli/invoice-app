import { sql } from '@vercel/postgres';
import { Invoice, InvoiceDetail } from './definitions';

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

export async function fetchInvoice({ id }: { id: string }) {
  try {
    const data = await sql<InvoiceDetail>`
       SELECT 
        invoices.*, 
        sender.street AS sender_street, 
        sender.city AS sender_city, 
        sender.postcode AS sender_postcode, 
        sender.country AS sender_country,
        client.street AS client_street,
        client.city AS client_city,
        client.postcode AS client_postcode,
        client.country AS client_country,
        json_agg(
          json_build_object(
            'id', items.id,
            'name', items.name,
            'quantity', items.quantity,
            'price', items.price,
            'total', items.total,
            'invoice_id', items.invoice_id
          )
        ) AS items,
        COALESCE(SUM(items.total), 0) AS grand_total
      FROM invoices
      LEFT JOIN addresses AS sender ON invoices.sender_address_id = sender.id
      LEFT JOIN addresses AS client ON invoices.client_address_id = client.id
      LEFT JOIN items ON items.invoice_id = invoices.id
      WHERE invoices.id = ${id}
      GROUP BY invoices.id, sender.id, client.id;
    `;

    console.log('data:', data);
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice data.');
  }
}
