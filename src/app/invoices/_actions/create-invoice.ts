'use server';

import { sql } from '@vercel/postgres';
import generateInvoiceId from '@/services/generate-invoice-id';
import { getUser } from '@/lib/dal';
import { revalidatePath } from 'next/cache';

export async function createInvoice(invoice: any) {
  const user = await getUser();

  if (!user) {
    return {
      message: 'User not found',
    };
  }

  const invoiceId = generateInvoiceId();

  const {
    'sender-street': senderStreet,
    'sender-city': senderCity,
    'sender-postcode': senderPostcode,
    'sender-country': senderCountry,
    'client-name': clientName,
    'client-email': clientEmail,
    'client-street': clientStreet,
    'client-city': clientCity,
    'client-postcode': clientPostcode,
    'client-country': clientCountry,
    'invoice-date': invoiceDate,
    'payment-terms': paymentTerms,
    'project-description': description,
    status,
  } = invoice;

  let paymentDue = new Date(invoiceDate);
  paymentDue = new Date(
    paymentDue.setDate(paymentDue.getDate() + parseInt(paymentTerms)),
  );

  const senderAddress = {
    type: 'sender',
    street: senderStreet,
    city: senderCity,
    postcode: senderPostcode,
    country: senderCountry,
  };

  const clientAddress = {
    type: 'client',
    street: clientStreet,
    city: clientCity,
    postcode: clientPostcode,
    country: clientCountry,
  };

  const items = invoice.items.map((item: any) => {
    const { name, quantity, price, total } = item;
    return {
      name,
      quantity,
      price,
      total,
    };
  });

  const total = items.reduce((acc: number, item: any) => {
    return acc + item.total;
  }, 0);

  const senderAddressId = await createAddress(senderAddress);
  const clientAddressId = await createAddress(clientAddress);

  try {
    await sql`
			INSERT INTO invoices (id, created_at, payment_due, description, payment_terms, client_name, client_email, status, total, sender_address_id, client_address_id, user_id)
			VALUES (${invoiceId}, ${invoiceDate}, ${paymentDue.toDateString()}, ${description}, ${paymentTerms}, ${clientName}, ${clientEmail}, ${status}, ${total}, ${senderAddressId}, ${clientAddressId}, ${user.id})
			`;
  } catch (error) {
    console.error('createInvoice ~ error:', error);
    return {
      message: 'Database Error: Failed to Create Invoice',
    };
  }

  for (const item of items) {
    await createItem(item, invoiceId);
  }

  revalidatePath('/invoices');
}

export async function createAddress(address: any) {
  try {
    const result = await sql`
			INSERT INTO addresses (type, street, city, postcode, country)
			VALUES (${address.type}, ${address.street}, ${address.city}, ${address.postcode}, ${address.country}) RETURNING id
		`;

    return result.rows[0].id;
  } catch (error) {
    console.error('createAddress ~ error:', error);
    return {
      message: 'Database Error: Failed to Create Address',
    };
  }
}

export async function createItem(item: any, invoiceId: string) {
  try {
    await sql`
		INSERT INTO items (name, quantity, price, total, invoice_id)
		VALUES (${item.name}, ${item.quantity}, ${item.price}, ${item.total}, ${invoiceId})
	`;
  } catch (error) {
    console.error('createItem ~ error:', error);
    return {
      message: 'Database Error: Failed to Create Item',
    };
  }
}
