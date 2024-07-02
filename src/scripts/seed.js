const { db } = require('@vercel/postgres');
const {
  users,
  addresses,
  items,
  invoices,
} = require('../lib/placeholder-data.js');
const bcrypt = require('bcryptjs');

async function seedUsers(client) {
  try {
    await client.sql`
		DELETE FROM users WHERE id = ${users[0].id};
		`;

    console.log(`Deleted user with id ${users[0].id}`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
				INSERT INTO users (id, name, email, email_verified, password)
				VALUES (${user.id}, ${user.name}, ${user.email}, ${user.email_verified}, ${hashedPassword});
				`;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedAddresses(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`DROP TYPE IF EXISTS address_type CASCADE;`;
    const createType = await client.sql`
		CREATE TYPE address_type AS ENUM ('sender', 'client');
		`;

    console.log('Created address_type enum');

    const createTable = await client.sql`
		CREATE TABLE IF NOT EXISTS addresses (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			type address_type NOT NULL,
			street VARCHAR(50) NOT NULL,
			city VARCHAR(50) NOT NULL,
			postcode VARCHAR(50) NOT NULL,
			country VARCHAR(50) NOT NULL
		);
		`;

    console.log('Created addresses table');

    const insertedAddresses = await Promise.all(
      addresses.map(
        (address) => client.sql`
				INSERT INTO addresses (id, type, street, city, postcode, country)
				VALUES (${address.id}, ${address.type}, ${address.street}, ${address.city}, ${address.postcode}, ${address.country});
				`,
      ),
    );

    console.log(`Seeded ${insertedAddresses.length} addresses`);

    return {
      createType,
      createTable,
      addresses: insertedAddresses,
    };
  } catch (error) {
    console.error('Error seeding addresses:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`DROP TYPE IF EXISTS invoice_status CASCADE;`;

    const createType = await client.sql`
		CREATE TYPE invoice_status AS ENUM ('draft', 'pending', 'paid');
		`;

    console.log('Created invoice_status enum');

    const createTable = await client.sql`
		CREATE TABLE IF NOT EXISTS invoices (
			id VARCHAR(6) NOT NULL PRIMARY KEY,
			created_at DATE,
			payment_due DATE,
			description TEXT,
			payment_terms INT,
			client_name VARCHAR(255),
			client_email VARCHAR(255),
			status invoice_status NOT NULL DEFAULT 'draft',
			total NUMERIC(10, 2),
			sender_address_id UUID REFERENCES addresses(id),
			client_address_id UUID REFERENCES addresses(id),
			user_id text REFERENCES users(id)
		);
		`;

    console.log('Created invoices table');

    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
				INSERT INTO invoices (id, created_at, payment_due, description, payment_terms, client_name, client_email, status, total, sender_address_id, client_address_id, user_id)
				VALUES (${invoice.id}, ${invoice.createdAt}, ${invoice.paymentDue}, ${invoice.description}, ${invoice.paymentTerms}, ${invoice.clientName}, ${invoice.clientEmail}, ${invoice.status}, ${invoice.total}, ${invoice.sender_address_id}, ${invoice.client_address_id}, ${invoice.user_id});`,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createType,
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedItems(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
		CREATE TABLE IF NOT EXISTS items (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			name VARCHAR(255),
			quantity INT,
			price NUMERIC(10, 2) ,
			total NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
			invoice_id VARCHAR(6) REFERENCES invoices(id) ON DELETE CASCADE
		);
		`;

    console.log('Created items table');

    const insertedItems = await Promise.all(
      items.map(
        (item) => client.sql`
				INSERT INTO items (name, quantity, price, total, invoice_id)
				VALUES (${item.name}, ${item.quantity}, ${item.price}, ${item.total}, ${item.invoice_id});
				`,
      ),
    );

    console.log(`Seeded ${insertedItems.length} items`);

    return {
      createTable,
      items: insertedItems,
    };
  } catch (error) {
    console.error('Error seeding items:', error);
    throw error;
  }
}

async function dropTables(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS items CASCADE;`;
    await client.sql`DROP TABLE IF EXISTS invoices CASCADE;`;
    await client.sql`DROP TABLE IF EXISTS addresses CASCADE;`;
    console.log('Dropped tables');
  } catch (error) {
    console.error('Error dropping tables:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await dropTables(client);
  await seedUsers(client);
  await seedAddresses(client);
  await seedInvoices(client);
  await seedItems(client);

  await client.end();
}

main().catch((error) => {
  console.error('Error seeding database:', error);
});
