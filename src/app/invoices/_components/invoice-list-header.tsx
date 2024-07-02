import { Invoice } from '@/lib/definitions';
import InvoiceCount from './invoice-count';
import InvoicesFilter from './invoices-filter';
import NewInvoice from './new-invoice';

export default function InvoiceListHeader({
  count,
  filters,
}: {
  count: number;
  filters?: string[];
}) {
  return (
    <div className="mb-8 flex justify-between md:mb-[55px] lg:mb-16">
      <div>
        <h1 className="heading-m md:heading-l">Invoices</h1>
        <InvoiceCount filters={filters} count={count} />
      </div>
      <div className="flex items-center">
        <InvoicesFilter />
        <NewInvoice />
      </div>
    </div>
  );
}
