'use server';

import { getUser } from '@/lib/dal';
import { sql } from '@vercel/postgres';
import { createItem } from '../../_actions/create-invoice';

export async function updateInvoice(invoice: any) {
  const user = await getUser();

  if (!user) {
    return {
      message: 'User not found',
    };
  }

  const {
    id,
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
    id: invoice.sender_address_id,
    type: 'sender',
    street: senderStreet,
    city: senderCity,
    postcode: senderPostcode,
    country: senderCountry,
  };

  const clientAddress = {
    id: invoice.client_address_id,
    type: 'client',
    street: clientStreet,
    city: clientCity,
    postcode: clientPostcode,
    country: clientCountry,
  };

  const items = invoice.items.map((item: any) => {
    const { id, name, quantity, price, total } = item;
    return {
      id,
      name,
      quantity,
      price,
      total,
    };
  });

  const total = items.reduce((acc: number, item: any) => {
    return acc + item.total;
  }, 0);

  try {
    await updateAddress(senderAddress);
    await updateAddress(clientAddress);

    for (const item of items) {
      if (item.id === '') {
        await createItem(item, invoice.id);
      } else {
        await updateItem(item);
      }
      console.log('updateInvoice ~ item:', item);
    }

    await sql`
		UPDATE invoices
		SET
			created_at = ${invoiceDate},
			payment_due = ${paymentDue.toDateString()},
			description = ${description},
			payment_terms = ${paymentTerms},
			client_name = ${clientName},
			client_email = ${clientEmail},
			status = ${status},
			total = ${total}
		WHERE id = ${id}
		`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update invoice data.');
  }
}

export async function updateAddress(address: any) {
  try {
    const result = await sql`
		UPDATE addresses
		SET type = ${address.type}, street = ${address.street}, city = ${address.city}, postcode = ${address.postcode}, country = ${address.country}
		WHERE id = ${address.id}
		RETURNING id
		`;

    return result.rows[0].id;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update address data.');
  }
}

export async function updateItem(item: any) {
  try {
    await sql`
		UPDATE items
		set name = ${item.name}, quantity = ${item.quantity}, price = ${item.price}, total = ${item.total}
		WHERE id = ${item.id}
		`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update item data.');
  }
}
