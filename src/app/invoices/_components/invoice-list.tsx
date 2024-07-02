import Link from 'next/link';
import InvoiceInfos from './invoice-card';
import { User } from '@/lib/definitions';
import { fetchFilteredInvoices } from '@/lib/data';
import InvoiceListHeader from './invoice-list-header';
import NoInvoices from './no-invoices';
import { getUser } from '@/lib/dal';
import { redirect } from 'next/navigation';

export default async function InvoiceList({
  status,
  currentPage,
  count,
}: {
  status?: string;
  currentPage: number;
  count: number;
}) {
  const user: User | null = await getUser();

  if (!user) {
    redirect('/login');
  }

  const filters = status?.split('.');

  const invoices = await fetchFilteredInvoices(user.id, currentPage, filters);

  return (
    <>
      <InvoiceListHeader filters={filters} count={count} />
      <div className="h-[910px] md:h-[640px]">
        {invoices.map((invoice) => (
          <Link key={invoice.id} href={`/invoices/${invoice.id}`}>
            <InvoiceInfos invoice={invoice} />
          </Link>
        ))}
        {!invoices.length && <NoInvoices />}
      </div>
    </>
  );
}
