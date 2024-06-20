const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    email_verified: true,
    password: 'Pa$$w0rd!',
  },
];


const addresses = [
	{
    id: '43ee452d-fc66-4dfb-a963-eed6b3b0c211',
    type: 'sender',
    street: '19 Union Terrace',
    city: 'London',
    postcode: 'E1 3EZ',
    country: 'United Kingdom',
  },
  {
    id: '0f4e32bb-0347-4825-8f07-93fef176c64b',
    type: 'client',
    street: '106 Kendell Street',
    city: 'Sharrington',
    postcode: 'NR24 5WQ',
    country: 'United Kingdom',
  },
  {
    id: 'ee9d77f2-aec0-410e-a0c8-cf35055829e0',
    type: 'client',
    street: '84 Church Way',
    city: 'Bradford',
    postcode: 'BD1 9PB',
    country: 'United Kingdom',
  },
  {
    id: '5796523a-6411-47e0-9815-8f46db57dcf2',
    type: 'client',
    street: '79 Dover Road',
    city: 'Westhall',
    postcode: 'IP19 3PF',
    country: 'United Kingdom',
  },
  {
    id: 'e4d2bbd4-d9f3-49cd-8eb7-77c92d1b5311',
    type: 'client',
    street: '63 Warwick Road',
    city: 'Carlisle',
    postcode: 'CA20 2TG',
    country: 'United Kingdom',
  },
  {
    id: '815e360b-1d3b-4ce7-8c98-fed136e00cbc',
    type: 'client',
    street: '46 Abbey Row',
    city: 'Cambridge',
    postcode: 'CB5 6EG',
    country: 'United Kingdom',
  },
  {
    id: 'ae0e7546-9e99-45c9-8c7f-027560707497',
    type: 'client',
    street: '3964  Queens Lane',
    city: 'Gotham',
    postcode: '60457',
    country: 'United States of America',
  },
];

const invoices = [
  {
    id: 'RT3080',
    createdAt: '2021-08-18',
    paymentDue: '2021-08-30',
    description: 'Re-branding',
    paymentTerms: 1,
    clientName: 'Jensen Huang',
    clientEmail: 'jensenh@mail.com',
    status: 'paid',
		total: 1800.90,
    sender_address_id: addresses[0].id,
    client_address_id: addresses[1].id,
  },
  {
    id: 'XM9141',
    createdAt: '2021-08-21',
    paymentDue: '2021-09-20',
    description: 'Graphic Design',
    paymentTerms: 30,
    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@mail.com',
    status: 'pending',
		total: 556.00,
    sender_address_id: addresses[0].id,
    client_address_id: addresses[2].id,
  },
  {
    id: 'RG0314',
    createdAt: '2021-09-24',
    paymentDue: '2021-10-01',
    description: 'Website Redesign',
    paymentTerms: 7,
    clientName: 'John Morrison',
    clientEmail: 'jm@myco.com',
    status: 'paid',
		total: 14002.33,
    sender_address_id: addresses[0].id,
    client_address_id: addresses[3].id,
  },
  {
    id: 'RT2080',
    createdAt: '2021-10-11',
    paymentDue: '2021-10-12',
    description: 'Logo Concept',
    paymentTerms: 1,
    clientName: 'Alysa Werner',
    clientEmail: 'alysa@email.co.uk',
    status: 'pending',
		total: 102.04,
    sender_address_id: addresses[0].id,
    client_address_id: addresses[4].id,
  },
  {
    id: 'AA1449',
    createdAt: '2021-10-7',
    paymentDue: '2021-10-14',
    description: 'Re-branding',
    paymentTerms: 7,
    clientName: 'Mellisa Clarke',
    clientEmail: 'mellisa.clarke@example.com',
    status: 'pending',
		total: 4032.33,
    sender_address_id: addresses[0].id,
    client_address_id: addresses[5].id,
  },
  {
    id: 'TY9141',
    createdAt: '2021-10-01',
    paymentDue: '2021-10-31',
    description: 'Landing Page Design',
    paymentTerms: 30,
    clientName: 'Thomas Wayne',
    clientEmail: 'thomas@dc.com',
    status: 'pending',
		total: 6155.91,
    sender_address_id: addresses[0].id,
    client_address_id: addresses[6].id,
  },
	{
		id: 'FV2353',
    createdAt: '2021-11-05',
    paymentDue: '2021-11-12',
    description: 'Logo Re-design',
    paymentTerms: 7,
    clientName: 'Anita Wainwright',
    clientEmail: '',
    status: 'draft',
		total: 3102.04,
    sender_address_id: addresses[0].id,
	}
];

const items = [
	{
    id: '233d7bae-71a0-49fd-9dfb-aa874ab6429b',
    name: 'Brand Guidelines',
    quantity: 1,
    price: 1800.90,
    total: 1800.90,
		invoice_id: invoices[0].id,
  },
  {
    id: '2049d9fc-5310-448c-aba4-7ef7cb14ed1c',
    name: 'Banner Design',
    quantity: 1,
    price: 156.0,
    total: 156.0,
		invoice_id: invoices[1].id,
  },
  {
    id: '69b7d511-03e0-4304-abfa-032df3dca07c',
    name: 'Email Design',
    quantity: 2,
    price: 200.0,
    total: 400.0,
		invoice_id: invoices[2].id,
  },
  {
    id: '8267964b-0c18-4513-84aa-f4444435bbff',
    name: 'Website Redesign',
    quantity: 1,
    price: 14002.33,
    total: 14002.33,
		invoice_id: invoices[2].id,
  },
  {
    id: '47749729-fc3c-4d69-994f-7897263d4e9a',
    name: 'Logo Sketches',
    quantity: 1,
    price: 102.04,
    total: 102.04,
		invoice_id: invoices[3].id,
  },
  {
    id: '7606361a-a6b8-450e-95f9-eef132a2c65d',
    name: 'New Logo',
    quantity: 1,
    price: 1532.33,
    total: 1532.33,
		invoice_id: invoices[4].id,
  },
  {
    id: '4a9fa63d-6e7e-43b2-adb9-cd62783b292b',
    name: 'Brand Guidelines',
    quantity: 1,
    price: 2500.0,
    total: 2500.0,
		invoice_id: invoices[4].id,
  },
  {
    id: '62766ee9-f606-49fc-a513-61c0844a73e9',
    name: 'Web Design',
    quantity: 1,
    price: 6155.91,
    total: 6155.91,
		invoice_id: invoices[5].id,
  },
  {
    id: '0f50592d-601c-4061-a722-3550a6d3b5da',
    name: 'Logo Re-design',
    quantity: 1,
    price: 3102.04,
    total: 3102.04,
		invoice_id: invoices[6].id,
  },
];

module.exports = {
	users,
	addresses,
	invoices,
	items,
};