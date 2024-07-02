import { getUser } from '@/lib/dal';
import { redirect, useRouter } from 'next/navigation';
import InvoiceList from './_components/invoice-list';
import { Suspense } from 'react';
import InvoiceListSkeleton from './_components/invoice-list-skeleton';
import Pagination from '@/components/ui/pagination';
import { fetchInvoicesPages } from '@/lib/data';

export default async function Page({
  searchParams,
}: {
  searchParams?: { status?: string; page?: string };
}) {
  const status = searchParams?.status;
  const filters = status?.split('.');
  const currentPage = Number(searchParams?.page) || 1;
  const user = await getUser();

  if (!user) redirect('/login');

  filters?.forEach((filter) => {
    if (!['draft', 'pending', 'paid'].includes(filter)) {
      redirect('/invoices');
    }
  });

  const result = await fetchInvoicesPages(user.id, filters);
  const totalPages = result.totalPages;
  const count = Number(result.invoices.count);

  if (totalPages !== 0) {
    if (currentPage > totalPages) {
      redirect(`/invoices?status=${status}&page=${totalPages}`);
    }
  }

  return (
    <main className="mx-6 my-8 md:mx-12 md:my-[61px] lg:mx-auto lg:my-[77px] lg:w-[730px]">
      <Suspense fallback={<InvoiceListSkeleton />}>
        <InvoiceList status={status} currentPage={currentPage} count={count} />
      </Suspense>
      <div className="flex items-center justify-center">
        {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </div>
    </main>
  );
}
