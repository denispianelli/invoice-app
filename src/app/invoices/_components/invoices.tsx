'use client';

import { Invoice } from '@/lib/definitions';
import InvoicesFilter from './invoices-filter';

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

  function formatTotalInvoiceText(
    filteredInvoices: Invoice[],
    filters: string[],
  ) {
    if (filteredInvoices.length === 0) {
      return 'No invoices';
    }

    if (filters.length === 0) {
      return `${filteredInvoices.length} invoice${filteredInvoices.length > 1 ? 's' : ''}`;
    }

    // If all possible filters are applied, just show the total number of invoices
    const allPossibleFilters = ['draft', 'pending', 'paid'];
    const areAllFiltersApplied = allPossibleFilters.every((filter) =>
      filters.includes(filter),
    );

    if (areAllFiltersApplied) {
      return `${filteredInvoices.length} invoice${filteredInvoices.length > 1 ? 's' : ''}`;
    }

    let filterText = '';
    const filterCounts = filters.map((filter) => {
      const count = filteredInvoices.filter(
        (invoice) => invoice.status === filter,
      ).length;
      return { filter, count };
    });

    filterCounts.forEach(({ filter, count }, index) => {
      if (count > 0) {
        if (filterText) filterText += ' and ';
        filterText += `${count} ${filter} invoice${count > 1 ? 's' : ''}`;
      }
    });

    return (
      filterText ||
      `${filteredInvoices.length} invoice${filteredInvoices.length > 1 ? 's' : ''}`
    );
  }

  const numberOfInvoices = formatTotalInvoiceText(filteredInvoices, filters);
  console.log('numberOfInvoices:', numberOfInvoices);
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="heading-m">Invoices</h1>
          <p className="body text-sixth">{numberOfInvoices}</p>
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
