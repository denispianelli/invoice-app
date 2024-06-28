import Link from 'next/link';
import ArrowLeft from '../[id]/_components/arrow-left';
import { InvoiceForm } from './_components/new-invoice-form';

export default function Page() {
  return (
    <>
      <main className="bg-white px-6 pt-[33px] dark:bg-[#141625]">
        <Link
          className="body-variant flex items-center gap-6 font-bold"
          href="/invoices"
        >
          <ArrowLeft />
          Go back
        </Link>
        <div className="my-6">
          <h1 className="heading-m mb-6">New Invoice</h1>
          <InvoiceForm />
        </div>
      </main>
      <div className="mb-[91px] h-[64px] w-screen bg-gradient-to-b from-black/0 to-black/10" />
    </>
  );
}
