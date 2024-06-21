import { Invoice } from '@/lib/definitions';

export default function formatTotalInvoiceText(
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
