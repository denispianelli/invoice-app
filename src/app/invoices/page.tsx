import { fetchInvoices } from '@/lib/data';
import Invoices from './_components/invoices';
import { getUser } from '@/lib/dal';
import { redirect } from 'next/navigation';
import IllustrationEmpty from './_components/illustration-empty';

export default async function Page({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const status = searchParams?.status || '';
  const user = await getUser();

  if (!user) redirect('/login');

  const invoices = await fetchInvoices({ id: user.id });
  return (
    <main className="mx-6 my-8 md:mx-12 md:my-[61px] lg:mx-auto lg:my-[77px] lg:w-[730px]">
      <Invoices invoices={invoices} status={status} />
      {!invoices.length && (
        <div className="flex flex-col items-center">
          <IllustrationEmpty />
          <h2 className="heading-m mb-[23px]">There is nothing here</h2>
          <p className="body w-[200px] text-center font-medium text-sixth dark:text-fifth">
            Create a new invoice by clicking the{' '}
            <span className="font-bold">
              New <span className="hidden md:inline">Invoice</span>
            </span>{' '}
            button and get started
          </p>
        </div>
      )}
    </main>
  );
}
