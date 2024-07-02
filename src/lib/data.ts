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

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  id: string,
  currentPage: number,
  statuses?: string[],
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    let query = `
		SELECT * 
		FROM invoices 
		WHERE user_id = $1
		`;
    let params: string[] = [id];

    if (statuses && statuses.length > 0) {
      query += ` AND status IN (${statuses.map((status, index) => `$${index + 2}`).join(', ')})
			ORDER BY created_at ASC
		  LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
			`;
      params = [...params, ...statuses];
    } else {
      query += `
			ORDER BY created_at ASC
			LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
			`;
    }

    const data = await sql.query<Invoice>(query, params);

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices data.');
  }
}

export async function fetchInvoicesPages(id: string, filters?: string[]) {
  try {
    let query = `
		SELECT COUNT(*)
		FROM invoices
		WHERE user_id = $1
		`;
    let params = [id];

    if (filters && filters.length > 0) {
      query += ` AND status IN (${filters.map((status, index) => `$${index + 2}`).join(', ')})
			`;
      params = [...params, ...filters];
    }

    const result = await sql.query<{ count: string }>(query, params);
    const invoices = result.rows[0];
    const totalPages = Math.ceil(Number(invoices.count) / ITEMS_PER_PAGE);

    return { invoices, totalPages };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices data.');
  }
}
