import { Invoice } from '@/lib/definitions';
import formatTotalInvoiceText from '@/services/format-total-invoices-text';

export default function InvoiceCount({
  filteredInvoices,
  filters,
}: {
  filteredInvoices: Invoice[];
  filters?: string[];
}) {
  const numberOfInvoices = formatTotalInvoiceText(filteredInvoices, filters);
  return (
    <p className="body text-[12px] font-medium text-sixth md:text-[13px]">
      <span className="hidden md:inline">
        {filteredInvoices.length === 0
          ? 'There is no '
          : filteredInvoices.length > 1
            ? 'There are '
            : 'There is '}
      </span>
      <span className="md:hidden">
        {filteredInvoices.length === 0 && 'No '}
      </span>
      {numberOfInvoices}
    </p>
  );
}
