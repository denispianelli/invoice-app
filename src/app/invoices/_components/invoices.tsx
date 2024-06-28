'use client';

import { Invoice } from '@/lib/definitions';
import InvoicesFilter from './invoices-filter';
import formatTotalInvoiceText from '@/services/format-total-invoices-text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import InvoiceInfos from './invoice-card';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { InvoiceForm } from '../new/_components/new-invoice-form';
import styles from '@/components/ui/home.module.css';
import ArrowLeft from '../[id]/_components/arrow-left';

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
    <>
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
        <div className="flex items-center">
          <InvoicesFilter />
          <Sheet>
            <SheetTrigger asChild>
              <Button className="relative w-[90px] p-0" variant={'one'}>
                {' '}
                <div className="absolute left-[6px] flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                    <svg
                      width="11"
                      height="11"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                        fill="#7C5DFA"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                  New
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent
              className={`mt-[70px] max-h-[calc(100vh-72px)] w-screen overflow-y-auto bg-white p-0 pb-0 pt-9 dark:bg-[#141625] md:mt-[80px] md:max-h-[calc(100vh-80px)] md:w-[616px] md:overflow-y-hidden md:rounded-r-[20px] ${styles['scroll-container']}`}
              side={'left'}
            >
              <SheetHeader>
                <SheetClose asChild>
                  <Button
                    variant={'ghost'}
                    className="body-variant mx-6 mb-6 flex w-fit items-center gap-6 pl-0 font-bold md:hidden"
                  >
                    <ArrowLeft />
                    Go back
                  </Button>
                </SheetClose>
                <SheetTitle className="text-left">New Invoice</SheetTitle>
              </SheetHeader>
              <InvoiceForm />
            </SheetContent>
          </Sheet>
        </div>
      </div>{' '}
      {filteredInvoices.map((invoice) => (
        <Link key={invoice.id} href={`/invoices/${invoice.id}`}>
          <InvoiceInfos invoice={invoice} />
        </Link>
      ))}
      {/* <InvoiceList filters={filters} /> */}
    </>
  );
}
