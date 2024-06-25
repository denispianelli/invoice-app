export type User = {
  id: string;
  name: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string;
  email_verified: boolean | null;
  password: string | null;
  otp: string | null;
  otp_expires: Date | null;
  image: string | null;
};

export type Invoice = {
  id: string;
  created_at: Date;
  payment_due: Date;
  description: string;
  payment_terms: number;
  client_name: string;
  client_email: string;
  status: 'paid' | 'pending' | 'draft';
  total: number;
  sender_address_id: string;
  client_address_id: string;
  user_id: string;
};

export type InvoiceDetail = {
  id: string;
  created_at: Date;
  payment_due: Date;
  description: string;
  payment_terms: number;
  client_name: string;
  client_email: string;
  status: 'paid' | 'pending' | 'draft';
  total: number;
  sender_address_id: string;
  client_address_id: string;
  user_id: string;
  sender_street: string;
  sender_city: string;
  sender_postcode: string;
  sender_country: string;
  client_street: string;
  client_city: string;
  client_postcode: string;
  client_country: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
    invoice_id: string;
  }[];
  grand_total: number;
};
