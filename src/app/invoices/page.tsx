import { fetchInvoices } from '@/lib/data';
import Invoices from './_components/invoices';
import { getUser } from '@/lib/dal';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const status = searchParams?.status || '';
  console.log('status:', status);
  const user = await getUser();

  if (!user) redirect('/login');

  const invoices = await fetchInvoices({ id: user.id });
  return (
    <main className="mx-6 my-8 md:mx-12 md:my-[61px] lg:mx-auto lg:my-[77px] lg:w-[730px]">
      <Invoices invoices={invoices} status={status} />
    </main>
  );
}
