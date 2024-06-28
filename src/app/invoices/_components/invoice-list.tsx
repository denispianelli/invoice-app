import Link from 'next/link';
import InvoiceInfos from './invoice-card';
import { User } from '@/lib/definitions';
import { fetchFilteredInvoices, fetchInvoices } from '@/lib/data';
import IllustrationEmpty from './illustration-empty';
import InvoiceListHeader from './invoice-list-header';

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
      {!invoices.length && <IllustrationEmpty />}
    </>
  );
}
