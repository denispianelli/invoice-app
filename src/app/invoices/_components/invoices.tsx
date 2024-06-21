'use client';

import { Invoice } from '@/lib/definitions';
import InvoicesFilter from './invoices-filter';
import formatTotalInvoiceText from '@/services/format-total-invoices-text';
import { Button } from '@/components/ui/button';
import InvoiceCard from './invoice-card';

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
  return (
    <div>
      <div className="mb-8 flex justify-between md:mb-[55px] lg:mb-16">
        <div>
          <h1 className="heading-m md:heading-l">Invoices</h1>
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
        </div>
        <div>
          <InvoicesFilter />
          <Button variant="one" size={'one'} className="pr-[15px]">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="grid size-8 place-content-center rounded-full bg-white">
                <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                    fill="#7C5DFA"
                    fillRule="nonzero"
                  />
                </svg>
              </div>
              <div>
                New<span className="hidden md:inline">&nbsp;Invoice</span>
              </div>
            </div>
          </Button>
        </div>
      </div>{' '}
      {filteredInvoices.map((invoice) => (
        <InvoiceCard key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
}
