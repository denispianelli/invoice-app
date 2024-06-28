import { Skeleton } from '@/components/ui/skeleton';
import InvoicesFilter from './invoices-filter';
import NewInvoice from './new-invoice';

export default function InvoiceListSkeleton() {
  return (
    <div className="grid">
      <div className="flex h-[51px] justify-between md:mb-[55px] lg:mb-16">
        <div>
          <h1 className="heading-m md:heading-l">Invoices</h1>
          <Skeleton className="h-[8px] w-[70px]" />
        </div>
        <div className="flex items-center">
          <InvoicesFilter />
          <NewInvoice />
        </div>
      </div>
      <div className="grid gap-4">
        <Skeleton className="h-[134px] min-w-full md:h-[88px]" />
        <Skeleton className="h-[134px] min-w-full md:h-[88px]" />
        <Skeleton className="h-[134px] min-w-full md:h-[88px]" />
        <Skeleton className="h-[134px] min-w-full md:h-[88px]" />
        <Skeleton className="h-[134px] min-w-full md:h-[88px]" />
        <Skeleton className="h-[134px] min-w-full md:h-[88px]" />
        <Skeleton className="h-[134px] min-w-full md:h-[88px]" />
      </div>
    </div>
  );
}
