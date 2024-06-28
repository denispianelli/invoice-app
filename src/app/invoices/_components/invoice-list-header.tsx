import { Invoice } from '@/lib/definitions';
import InvoiceCount from './invoice-count';
import InvoicesFilter from './invoices-filter';
import NewInvoice from './new-invoice';

export default function InvoiceListHeader({
  filteredInvoices,
  filters,
}: {
  filteredInvoices: Invoice[];
  filters?: string[];
}) {
  return (
    <div className="mb-8 flex justify-between md:mb-[55px] lg:mb-16">
      <div>
        <h1 className="heading-m md:heading-l">Invoices</h1>
        <InvoiceCount filters={filters} filteredInvoices={filteredInvoices} />
      </div>
      <div className="flex items-center">
        <InvoicesFilter />
        <NewInvoice />
      </div>
    </div>
  );
}
