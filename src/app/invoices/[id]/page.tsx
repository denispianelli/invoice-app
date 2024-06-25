import { fetchInvoice } from '@/lib/data';
import { notFound } from 'next/navigation';
import InvoiceDetails from './_components/invoice-details';
import ArrowLeft from './_components/arrow-left';
import Link from 'next/link';
import { InvoiceDetail } from '@/lib/definitions';
import InvoiceDetailButtons from '@/components/ui/invoice-detail-buttons';

export default async function Page({ params }: { params?: { id?: string } }) {
  const { id } = params ?? {};
  console.log('Page ~ id:', id);

  if (!id) return notFound();

  const invoice: InvoiceDetail = await fetchInvoice({ id });
  console.log('Page ~ invoice:', invoice);

  if (!invoice) return notFound();

  return (
    <>
      <main className="mx-6 mb-[150px] mt-[33px] lg:mx-auto lg:mb-0 lg:mt-[65px] lg:w-[730px]">
        <Link
          className="body-variant flex items-center gap-6 font-bold"
          href="/invoices"
        >
          <ArrowLeft />
          Go back
        </Link>
        <InvoiceDetails invoice={invoice} />
      </main>
      <footer className="fixed bottom-0 flex w-full items-center justify-center gap-2 bg-white px-6 py-5 dark:bg-third md:hidden">
        <InvoiceDetailButtons id={invoice.id} />
      </footer>
    </>
  );
}
