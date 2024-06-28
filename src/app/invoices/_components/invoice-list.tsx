import Link from 'next/link';
import InvoiceInfos from './invoice-card';
import { User } from '@/lib/definitions';
import { fetchFilteredInvoices } from '@/lib/data';
import InvoiceListHeader from './invoice-list-header';
import NoInvoices from './no-invoices';

export default async function InvoiceList({
  user,
  status,
}: {
  user: User;
  status?: string;
}) {
  const filters = status?.split('.');

  const invoices = await fetchFilteredInvoices(user.id, filters);

  return (
    <>
      <InvoiceListHeader filters={filters} filteredInvoices={invoices} />
      {invoices.map((invoice) => (
        <Link key={invoice.id} href={`/invoices/${invoice.id}`}>
          <InvoiceInfos invoice={invoice} />
        </Link>
      ))}
      {!invoices.length && <NoInvoices />}
    </>
  );
}
