import { getUser } from '@/lib/dal';
import { redirect } from 'next/navigation';
import InvoiceList from './_components/invoice-list';
import { Suspense } from 'react';
import InvoiceListSkeleton from './_components/invoice-list-skeleton';

export default async function Page({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const status = searchParams?.status;
  const user = await getUser();

  if (!user) redirect('/login');

  return (
    <main className="mx-6 my-8 md:mx-12 md:my-[61px] lg:mx-auto lg:my-[77px] lg:w-[730px]">
      <Suspense fallback={<InvoiceListSkeleton />}>
        <InvoiceList user={user} status={status} />
      </Suspense>
    </main>
  );
}
