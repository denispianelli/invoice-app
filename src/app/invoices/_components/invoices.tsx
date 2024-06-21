'use client';

import { Invoice } from '@/lib/definitions';
import InvoicesFilter from './invoices-filter';
import formatTotalInvoiceText from '@/services/format-total-invoices-text';

export default function Invoices({
  invoices,
  status,
}: {
  invoices: Invoice[];
  status: string;
}) {
  const filters = status.split('.');
  const filteredInvoices = invoices.filter((invoice) =>
    filters.includes(invoice.status),
  );

  const numberOfInvoices = formatTotalInvoiceText(filteredInvoices, filters);
  console.log('numberOfInvoices:', numberOfInvoices);
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="heading-m">Invoices</h1>
          <p className="body text-sixth">
            <span className="hidden md:inline">
              {filteredInvoices.length > 1 ? 'There are ' : 'There is '}
            </span>
            {numberOfInvoices}
          </p>
        </div>
        <div>
          <InvoicesFilter />
        </div>
      </div>{' '}
      {filteredInvoices.map((invoice) => (
        <div
          key={invoice.id}
          className="my-4 rounded-md bg-white p-6 shadow-md"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sixth">#{invoice.id}</p>
              <h2 className="text-lg font-bold">{invoice.client_name}</h2>
            </div>
            <div>
              <h3 className="text-lg font-bold">${invoice.total}</h3>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h4 className="text-lg font-bold">{invoice.description}</h4>
            </div>
            <div>
              <p className="text-sixth">{invoice.status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
